import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Board from './components/Board'
import Gameboard from './components/Gameboard'

function App() {
  return (
    <div className="App">
      <Router className='links'>
        <nav>
          <ul>
            <li><Link className='custom-link' to='/'>Home</Link></li>
            <li><Link className='custom-link' to='/board'>Tic-Tac-Toe</Link></li>
            <li><Link className='custom-link' to='/gameboard'>Rock Paper Scissors</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/board' element={<Board />}/>
          <Route path='/gameboard' element={<Gameboard />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
