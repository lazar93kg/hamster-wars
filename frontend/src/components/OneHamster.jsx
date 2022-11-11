import React from 'react'
import './OneHamster.css'
import { motion } from 'framer-motion';
import { BsFillArrowRightCircleFill } from "react-icons/bs"


export default function OneHamster({ oneHamster, handleClickRefresh }) {

  return (
    <div className='oneHamster'>
      <motion.div initial="pageInitial" animate="pageAnimate" variants={{
        pageInitial: { opacity: 0 }, pageAnimate: { opacity: 1 },
      }}>

        <div className='oneHamsterProprety'>
          <img src={oneHamster.imgName} alt="hamster" width={'500px'} />
          <section className='oneHamText'>
            <h2>Name: {oneHamster.name}</h2>
            <h4>Age: {oneHamster.age}</h4>
            <h4>Favorite food: {oneHamster.favFood}</h4>
            <h4>Loves: {oneHamster.loves}</h4>
            <h4>Wins: {oneHamster.wins}</h4>
            <h4>Defeats: {oneHamster.defeats}</h4>
            <h4>Games: {oneHamster.games}</h4>
          </section>
          <span onClick={() => handleClickRefresh()} >
            <BsFillArrowRightCircleFill
              style={{ color: 'white', cursor: 'pointer' }}
            /> </span>
        </div>
      </motion.div>

    </div>
  )
}
