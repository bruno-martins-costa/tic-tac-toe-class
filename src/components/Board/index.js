import React from 'react';
import './Board.scss';
import { Square } from '../';

export default function Board({ squares, onClick, winningPosition, endgame }) {
  
  const renderSquareComponent = (index) => {
    return (
      <Square
        index={index}
        value={squares[index]}
        onClick={() => onClick(index)}
        winningPosition={winningPosition}
        endgame={endgame}
      />
    );
  }

  return (
    <div className="board-container">
      <div className="board">
        <div className="board-row">
          {renderSquareComponent(0)}
          {renderSquareComponent(1)}
          {renderSquareComponent(2)}
        </div>
        <div className="board-row">
          {renderSquareComponent(3)}
          {renderSquareComponent(4)}
          {renderSquareComponent(5)}
        </div>
        <div className="board-row">
          {renderSquareComponent(6)}
          {renderSquareComponent(7)}
          {renderSquareComponent(8)}
        </div>
      </div>
    </div>
  );
}
