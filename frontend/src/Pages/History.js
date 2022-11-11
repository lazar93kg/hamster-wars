import React, { useEffect, useReducer, useState } from 'react'
import './History.css'
import Loader from '../components/Loader'
import { fetchMatches, deleteMatch, fetchHamster } from '../api/api'

export default function History() {
  /* Images  */
  const winnerImage = 'https://firebasestorage.googleapis.com/v0/b/hamster-wars-94a53.appspot.com/o/hamsters%2Fwinner2.png?alt=media&token=b956e7cb-72ac-4df6-9c6b-3b8fd88ccbe4'
  const loserImage = 'https://firebasestorage.googleapis.com/v0/b/hamster-wars-94a53.appspot.com/o/hamsters%2Floser2.png?alt=media&token=dbf461e3-aa45-40d8-a5f2-37819aa04247'

  const [refresh, getRefresh] = useReducer(x => x + 1, 0)
  const [allMatches, getAllMatches] = useState()
  const [allHamsters, getAllHamsters] = useState()
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    /* Fetch all matches */
    let getMatches = async () => {
      setIsLoading(true)
      let res = await fetchMatches();
      getAllMatches(res)
      res && setIsLoading(false)
    }
    /* Fetch all hamsters */
    let getHamsters = async () => {
      setIsLoading(true)
      let res = await fetchHamster();
      getAllHamsters(res)
    }
    getMatches();
    getHamsters()
  }, [refresh])

  /* Delete Match */
  const handleDelete = async ({ _id }) => {
    let res = await deleteMatch(_id);
    res && setIsLoading(false)
    res && getRefresh()
  }

  let allWinID = []
  let allLoseID = []
  let WinAndLose = []

  // Find a winner and loser in all Matches
  if (allMatches) {
    allMatches.forEach(element => {
      allWinID.push({
        _id: element.winnerId
      })
      allLoseID.push({
        _id: element.loserId
      })})
  }

  // Find a winners and losers hamsters and make new arr
  let win
  let lose
  if (allHamsters) {
    win = allWinID.map(e => allHamsters.find(s => s._id === e._id))
    WinAndLose.push(win)

    lose = allLoseID.map(e => allHamsters.find(s => s._id === e._id))
    WinAndLose.push(lose)
  }

  return (
    <section className='flexBox'>
      {isLoading && <Loader />}
      <section className='history'>
        <img src={winnerImage} width={'200px'} height={'100px'} alt="" />

        {allHamsters && WinAndLose && WinAndLose[0].map((winner, index) => (
          <article key={index} className='winnerDiv' >
            <h1>{winner && winner.name}</h1>
            <img src={winner.imgName} width={'200px'} height={'150px'} alt="" />
          </article>))
          .reverse()}

      </section>

      <article className='matches'>
        {allMatches && allMatches.map((res, index) => (
          <section className='deleteMatch' key={index} >
            <h3 onClick={() => handleDelete(res)} className="deleteMatchBtn">X</h3>
            <h4>Match: {index + 1}</h4>
          </section>)).reverse()}
      </article>

      <article className='history'>
        <img src={loserImage} width={'200px'} height={'100px'} alt="" />
        {allHamsters && WinAndLose && WinAndLose[1].map((looser, index) => (
          <section key={index} className='winnerDiv'>
            <h1>{looser.name}</h1>
            <img src={looser.imgName} width={'200px'} height={'150px'} alt="" />
          </section>
        )).reverse()}
      </article>
    </section>
  )
}
