import React, { useEffect, useReducer, useState } from 'react'
import {Link } from 'react-router-dom'
import OneHamster from '../components/OneHamster'
import './Gallery.css'
import { motion } from 'framer-motion';
import { deleteHamster, fetchHamster, fetchOneHamster } from '../api/api';
import Loader from '../components/Loader';

export default function Gallery() {
  const [allHamsters, getAllHamsters] = useState()
  const [oneHamster, getoneHamster] = useState()
  const [data, getRefresh] = useReducer(x => x + 1 ,0)
  const [isLoading, setIsLoading] = useState(false);
  const [clickYes, getClickYes] = useState(false)
  const [alert, getAlert] = useState(false)




  useEffect(() => {

    /* Fetch all hamsters */
    let getHamsters = async () => {
      setIsLoading(true)
      let res = await fetchHamster();
      res && getAllHamsters(res)
      res && setIsLoading(false)
 }
 getHamsters()
},[data])

    /* Fetch one hamster */
  const handleClick = async ({_id}) => {
    let res = await fetchOneHamster(_id);
      getoneHamster(res)
  }
    /* Delete one hamster with alert message*/
  const handleDelete = async ({_id}) => {
    !clickYes && getAlert(true)
    if(clickYes === true){
    let res = await deleteHamster(_id);
    res && setIsLoading(false)
    res && getRefresh()
    } else {
      getClickYes(true)
    }
  }


/* Get back to gallery */
 const handleClickRefresh = () => {
  getoneHamster(null)
 }

  return (
    <div className='flexBox'>
  <div className='gallery'>
    {isLoading && <Loader />}
    <h1>Gallery</h1>
  {/* Animation */}
     <motion.div initial="hidden" animate="visible" variants={{
  hidden: { scale: .8,opacity: 0},visible: {scale: 1,opacity: 1,transition: {delay: .4}},}}>

{/* All Hamsters or one hamster */}
 {alert && <div className='alert'>
      <h1>WARNING!</h1>
      <h2>If you delete hamster you are going to delete all matces that hamster participate in</h2>
        <h4>Click again in odrer to delete hamster</h4>
        <button onClick={() => getAlert(false)} className='close'>X</button>
    </div>}
      {!oneHamster && 
    <article className='allHamsters'>
      {allHamsters && allHamsters.map((hamsters, index) => (
        <div className='deleteGallery' key={index} >
          <span onClick={() => handleDelete(hamsters)} className="closeGallery">&times;</span>
          <h4>{hamsters.name}</h4>
          <img className='imageGallery' src={hamsters.imgName} alt="hamsters" onClick={() => handleClick(hamsters)} />
        </div>
      ))}
    </article>}
    </motion.div>
{/* One Hamster */}
  {oneHamster && <OneHamster oneHamster={oneHamster} handleClickRefresh={handleClickRefresh} />}
    </div>
  <Link to={'/createhamster'} ><button className='createHamster'>Create Hamster</button></Link> 
    </div>
  )
}