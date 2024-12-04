import { useState, useEffect } from "react";
import Square from "./Square";

export default function Board() {
  const initialBoard = Array(9).fill(null);

  const [squares, setSquares] = useState(initialBoard);
  const [isX, setIsX] = useState(true); // True for player turn, false for computer turn
  const [gameOver, setGameOver] = useState(false);

  function handleClick(i) {
    if (gameOver || squares[i]) return;

    const nextSquares = [...squares];
    nextSquares[i] = "X"; // Human is always "X"
    setSquares(nextSquares);
    setIsX(false); // Switch to computer's turn
  }

  function computerPick() {
    if (gameOver) return;

    const emptySquares = squares
      .map((value, index) => (value === null ? index : null))
      .filter((index) => index !== null);
  
    // Check for winning move
    for (let index of emptySquares) {
      const testBoard = [...squares];
      testBoard[index] = "O"; // Assume computer places "O"
      if (calculateWinner(testBoard) === "O") {
        setSquares(testBoard);
        setIsX(true); // Switch to player's turn
        return;
      }
    }
  
    // Check for blocking move
    for (let index of emptySquares) {
      const testBoard = [...squares];
      testBoard[index] = "X"; // Assume player places "X"
      if (calculateWinner(testBoard) === "X") {
        const newBoard = [...squares];
        newBoard[index] = "O"; // Block the player's winning move
        setSquares(newBoard);
        setIsX(true); // Switch to player's turn
        return;
      }
    }
  
    // Otherwise, pick a random move
    if (emptySquares.length > 0) {
      const randomIndex = emptySquares[Math.floor(Math.random() * emptySquares.length)];
      const newBoard = [...squares];
      newBoard[randomIndex] = "O";
      setSquares(newBoard);
      setIsX(true); // Switch to player's turn
    }
  }

  function calculateWinner(squares) {
    const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let [a, b, c] of winningCombos) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  useEffect(() => {
    const winner = calculateWinner(squares);
    if (winner) {
      setGameOver(true);
      return;
    }

    if (!squares.includes(null)) {
      // Game is a draw
      setGameOver(true);
      return;
    }

    // If it's the computer's turn, make a move
    if (!isX && !gameOver) {
      const timeoutId = setTimeout(() => {
        computerPick();
      }, 500); // Delay for better user experience
      return () => clearTimeout(timeoutId); // Cleanup timeout
    }
  }, [squares, isX, gameOver]);

  function handleReset() {
    setSquares(initialBoard);
    setIsX(true);
    setGameOver(false);
  }

  let result, resultClass;

  const winner = calculateWinner(squares);
  let status = "Next player: " + (isX ? "X" : "O");
  if (winner) {
    status = `Winner: ${winner}`;
    if (winner === 'X') {
        result = 'YOU WIN!'
        resultClass = 'win'
    } else {
        result = 'You lost...'
        resultClass = 'lose'
    }
  } else if (!squares.includes(null)) {
    status = "It's a draw";
  }

  return (
    <div className="app-board">
      <div className="board">
        {squares.map((value, i) => (
          <Square key={i} value={value} onClick={() => (isX ? handleClick(i) : null)} />
        ))}
        <div className="message">{status}</div>
        <div className={`result ${resultClass}`}>{result}</div>
        <button className="reset-button" onClick={handleReset}>
          Reset Game
        </button>
      </div>
    </div>
  );
}
