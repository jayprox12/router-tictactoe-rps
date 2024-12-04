import rock from '../img/rock-emoji.png'
import paper from '../img/paper-emoji.png'
import scissors from '../img/scissors-emoji.png'

export default function Choice({ setGameResult, setMyChoice, setHouseChoice, setScores }) {

    const choices = ['rock', 'paper', 'scissors']
    const choiceImg = {
      rock: rock,
      paper: paper,
      scissors: scissors
    }

    function gameResult(finalResult) {
      setGameResult(finalResult)
    }

    function playGame(e) {
      const playerChoice = e.currentTarget.id
      const cpuChoice = choices[Math.floor(Math.random() * choices.length)]
      
      let result = ''

      if (playerChoice === cpuChoice) {
        result = 'Its a tie.';
        updateScore('draw')        
      } else if (
          (playerChoice === 'rock' && cpuChoice === 'scissors') ||
          (playerChoice === 'paper' && cpuChoice === 'rock') ||
          (playerChoice === 'scissors' && cpuChoice === 'paper')
      ) {
        result = 'You WIN!'
        updateScore('win')
      } else {
        result = 'You lose...'
        updateScore('lose')
      }

      gameResult(result)
      setMyChoice(playerChoice)
      setHouseChoice(cpuChoice)

    }

    function updateScore(result) {
      if (result === 'win') {
        setScores((prev) => ({
          ...prev,
          wins: prev.wins + 1
        }))
      } else if (result === 'lose') {
        setScores((prev) => ({
          ...prev,
          losses: prev.losses + 1
        }))
      } else if (result === 'draw') {
        setScores((prev) => ({
          ...prev,
          draws: prev.draws + 1
        }))
      }
    }
  
    return (
      <div>
      {
        Object.keys(choiceImg).map((choice) => (
          <button id={choice} key={choice} onClick={playGame} className='rps-move-button'>
            <img src={choiceImg[choice]} className="rps-move-icon" alt={choice} />
          </button>
        ))
      }
      </div>
      
    )
  }