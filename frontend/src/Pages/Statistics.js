import React, { useEffect, useState } from 'react'
import { fetchWinners, fetchLosers, } from '../api/api'

export default function Statistics() {
  const [allWinners, getAllWinners] = useState()
  const [allLosers, getAllLosers] = useState()

  /* Get top 5 Winers */
  useEffect(() => {
    let getFetch = async () => {
      let res = await fetchWinners();
      getAllWinners(res)
    }
    /* Get top 5 Losers */
    let getFetchTwo = async () => {
      let res = await fetchLosers();
      getAllLosers(res)
    }
    getFetchTwo()
    getFetch();
  }, [])

  return (
    <div className='flexBox'>
      <section style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gridGap: '50px'
      }}>
        <div>
          <h1>Top 5 Winners</h1>
          {allWinners && allWinners.slice(0, 5).map((winner, index) => (
            <article key={winner._id} className='p' >
              <img src={winner.imgName} width={'300px'} height={'200px'} alt="Winner Hamster" />
              <h4 style={{ color:'white'}} >Name: {winner.name}</h4>
              <h4 style={{ color:'white'}}>Wins: {winner.wins}</h4>
              <br />
            </article>
          ))}
        </div>
        <div>
          <h1>Top 5 Losers</h1>
          {allLosers && allLosers.slice(0, 5).map((loser, index) => (
            <article key={loser._id} className='p' >
              <img src={loser.imgName} alt="" width={'300px'} height={'200px'} />
              <h4 style={{ color:'white'}}>Name: {loser.name}</h4>
              <h4 style={{ color:'white'}}>Defeats: {loser.defeats}</h4>
              <br />
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
