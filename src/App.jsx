
import './App.css'
import { useState } from "react";
import confetti from 'canvas-confetti';
import {Square} from "./components/Square"
import { TURNS } from './constants';
import { checkWinner, checkEndGame } from './logic/board';
import { WinnerModal } from './components/WinnerModal';


function App() {
  const [board, setBoard] = useState(()=> {
    const boardFromStorage = window.localStorage.getItem('board')
    if(boardFromStorage) return JSON.parse(boardFromStorage)
    return Array(9).fill(null)
  })
  const [turn, setTurn] = useState(()=>{
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.x
  })

  const [winner, setWinner] = useState(null)

  

  const resetGame=()=>{
    setBoard(Array(9).fill(null))
    setTurn(TURNS.x)
    setWinner(null)
    window.localStorage.removeItem('turn')
    window.localStorage.removeItem('board')

  }


  const updateBoard = (index)=> {
    if(board[index] || winner) return
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    const newTurn = turn === TURNS.x? TURNS.o:TURNS.x
    setTurn(newTurn)
    window.localStorage.setItem('board', JSON.stringify(newBoard))
    window.localStorage.setItem('turn', newTurn)
    const newWinner = checkWinner(newBoard)
    if(newWinner){
      confetti()
      setWinner(newWinner)
    }else if(checkEndGame(newBoard)){
      setWinner(false)
    }
  }
  return (
    <main className='board'>
      <h1>Tic tac toc</h1>
      <button onClick={resetGame}>Reiniciar juego</button>
      <section className='game'>
        {
          board.map((value, index)=>{
            return(
              <Square key={index} index={index} updateBoard= {updateBoard}>
                {value}
              </Square>
            );
          })
        }

      </section>
      <section className='turn'>
          <Square isSelected={turn === TURNS.x}>
            {TURNS.x}
          </Square>
          <Square isSelected={turn === TURNS.o}>
            {TURNS.o}
          </Square>
      </section>
      <WinnerModal resetGame={resetGame} winner={winner}/>
    </main>
  );
}

export default App
