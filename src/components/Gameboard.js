import { useState, useEffect } from 'react';
import Choice from "./Choice"
import Result from "./Result"
import Score from "./Score"


export default function Gameboard() {
    const [gameResult, setGameResult] = useState('Make a move')
    const [myChoice, SetMyChoice] = useState('')
    const [houseChoice, setHouseChoice] = useState('')
    const [scores, setScores] = useState({
        wins: 0,
        losses: 0,
        draws: 0
      })


    //Load scores from localsorage on initial render
    useEffect(() => {
        const savedScores = JSON.parse(localStorage.getItem('rpsScores'))
        if (savedScores) {
          setScores(savedScores)
        }
      }, [])
    
      // save scores when they change
      useEffect(() => {
        localStorage.setItem('rpsScores', JSON.stringify(scores))
      }, [scores])

    return(
        <div className='game-container'>
            <h3 className='title'>Rock Paper Scissors</h3>
            
            <Score scores={scores} />
            <Choice setGameResult={setGameResult} setMyChoice={SetMyChoice} setHouseChoice={setHouseChoice} setScores={setScores} />
            <Result gameResult={gameResult} myChoice={myChoice} houseChoice={houseChoice} />
        </div>
    ) 
  }