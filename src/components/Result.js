export default function Result({ gameResult, myChoice, houseChoice }) {
    return(
        <div className='rps-result-container'>
          <div className='rps-result-msg'>{gameResult}</div>
          
          <div className='rps-choice-container'>
            <p className='rps-choice-moves'>Player: {myChoice}</p>
            <p className='rps-choice-moves'>Computer: {houseChoice}</p>
          </div>
        </div>
      )
}