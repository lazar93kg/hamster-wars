import React from 'react'
import { Link } from 'react-router-dom'
import './Home.css'
import Typewritter from 'typewriter-effect'
import { motion } from 'framer-motion';

export default function Home() {
  const masterHamster = 'https://firebasestorage.googleapis.com/v0/b/hamster-wars-94a53.appspot.com/o/images%2FMasterTheHamster.png?alt=media&token=03644a6d-8899-4708-9424-6c3c856c3942'

  return (
    <section className='homePage'>
      <div className='loadingPhoto'>
        <div className='type'>
          <Typewritter
            onInit={(typewriter) => {
              typewriter
                .typeString("Welcome to Hamster Wars")
                .pauseFor(1000)
                .deleteAll(10)
                .typeString("My name is master the Hamster")
                .pauseFor(1000)
                .deleteAll()
                .typeString("I am here to explain to you the war rules")
                .pauseFor(1000)
                .deleteAll()
                .typeString("Have no fear!")
                .pauseFor(1000)
                .deleteAll()
                .typeString("This is a war on cutest hamsters in the world!")
                .start()
            }} /></div>
        <div>
          <motion.div className="card" whileHover={{ position: 'relative', zIndex: 1, background: 'white', scale: [1, 1.4, 1.2], rotate: [0, 10, -10, 0], transition: { duration: .2 } }}>
            <Link to='/battle'>  <img src={masterHamster} alt="hamsterLogo" className='master' /> </Link>
          </motion.div>
        </div>
      </div>
      <motion.div initial="hidden" animate="visible" variants={{
        hidden: { scale: .8, opacity: 0 }, visible: { scale: 1, opacity: 1, transition: { delay: .4 } },
      }}>
        <div>
          <h3>
            Rule 1 :<br /> Click on the cutest to decide the winner!!!<br />
            Rule 2 : <br />If you can't decide? Just click the refresh button for the next battleground.<br /><br />
            START: <br />You need to pass through me, Click on me to start a war on cuteness
          </h3>
          <h3>Not ready jet? <br />Click <Link to='/gallery'>here</Link> to check warrior's gallery</h3>
        </div>
      </motion.div>
    </section>
  )
}
