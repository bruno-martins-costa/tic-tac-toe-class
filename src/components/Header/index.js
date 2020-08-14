import React from 'react';
import './Header.scss';

export default function Header({ title, hasWinner, endgame, handleNewGame }) {

  return (
    <div className="header">

      <h1>{title}</h1>

      {(hasWinner || endgame) && 
        <button
          className="new-game-btn"
          onClick={() => handleNewGame()}
        >
          New game!
        </button>
      }
      
    </div>
  );
}
