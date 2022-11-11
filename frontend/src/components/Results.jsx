import React from 'react'
import './Results.css'


export default function Results({ results }) {

    let winner = results[0]
    let loser = results[1]
    let some = []

    if (winner.wins > loser.wins) {
        some.push(winner)
    } else {
        some.push(loser)
    }
    return (
        <div className='flexBox'>
            <section className='resultsCom'>
                <h1>Results</h1>
                <article className='matchResult'>
                    {results && results.map((result) => (
                        <div key={result._id} className='resultImgs'>
                            <img src={result.imgName} width={'200px'} alt="" />
                            <h3>{result.name} have {result.wins} wins and  {result.defeats} defeats</h3>
                            <h3>{results && winner.wins === loser.wins ? 'DRAW' : null}</h3>
                        </div>
                    ))}</article>
            </section>
            <article>
            </article>
        </div>
    )
}
