export default function Score({ scores }) {
    return(
      <div className='score-container'>
        Wins: {scores.wins} | Losses: {scores.losses} | Draws: {scores.draws}
      </div>
    ) 
  }