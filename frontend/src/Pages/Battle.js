import React, { useReducer } from 'react'
import { useEffect, useState } from 'react'
import Results from '../components/Results'
import './Battle.css'
import { motion } from 'framer-motion';
import { createMatch, fetchRandomHamsters, updateWinnerAndLoser } from '../api/api';
import Loader from '../components/Loader';



export default function Battle() {
    const [hamsters, getHamsters] = useState()
    const [refresh, getRefresh] = useReducer(x => x + 1 ,0)
    const [results, getResults] = useState()
    const [isLoading, setIsLoading] = useState(false);


    let winners = []
    let losers = []
    
/* Get Random hamsters */
    useEffect(() => {
      let getFetch = async () => {
        setIsLoading(true)
        let res = await fetchRandomHamsters();
        res && getHamsters(res)
        res && setIsLoading(false)
      }
      getFetch()
},[refresh])

    const handleClick = async ({_id}) => {

      // Search for winner and loser
        hamsters.forEach(function(p){
            if(p._id === _id){
                winners.push(p)
            }else {
                losers.push(p);
            }})
          // Send winner and loser
      const matchResult = await updateWinnerAndLoser(_id, losers)
      
      // Create Match
       let match = [winners, losers]
      const matchCreated = await createMatch(match)

      getRefresh()
      getResults(matchResult)
      
    }
    
    const ref = () => {
      getResults()
    }
    return (
      <>
        {isLoading && <Loader />}
        <motion.div initial="hidden" animate="visible" variants={{
  hidden: {
    scale: .8,
    opacity: 0
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      delay: .4
    }
  },
}}>

      {results && <Results results={results}  />}
      <article className='battleHeader'>
        {!results && <h1>Hamster battle</h1>}
      <div className='battle'>
        {!results && hamsters && hamsters.map((hamster) => (
            <div className='battleImgs'  key={hamster._id}  >
              <img  src={hamster.imgName} width={'300px'} height={'200px'} alt="" onClick={() => handleClick(hamster)}/>
            <div className='hide'>
              <h3>Name: {hamster.name} </h3>
              <h3>Age: {hamster.age}</h3>
              <h3>Favorite food: {hamster.favFood}</h3>
              <h3>Loves: {hamster.loves}</h3>
            </div>
            </div>
        ))}
    </div>
      </article> 
      </motion.div>
      <div className='btn'>
      {results && results
      ?<button onClick={() => ref()}>Play again</button>
      :<button onClick={() => getRefresh()}>Refresh</button> 
       }
       </div>
    </>
  )
}
