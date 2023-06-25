
import './App.css'
import { useState } from "react";
const TURNS = {
  x: 'x',
  o: 'o'
}


const Square = ({children, updateBoard, index, isSelected})=>{
  const className = `square${isSelected? ' is-selected': ''}`

  return(
    <div className={className}>
      {children}
    </div>
  );
}

function App() {
  const [board, setBoard] = useState(['x', 'o', 'x', 'o','x', 'o','x', 'o','x'])
  const [turn, setTurn] = useState(TURNS.x)

  return (
    <main className='board'>
      <h1>Tic tac toc</h1>
      <section className='game'>
        {
          board.map((_, index)=>{
            return(
              <Square key={index} index={index}>
                {board[index]}
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
    </main>
  );
}

export default App
