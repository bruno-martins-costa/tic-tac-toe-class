import React from 'react';
import './Square.scss';
import Cross from '../Cross';
import Circle from '../Circle';

export default function Square({ index, value, onClick, winningPosition, endgame }) {

  const returnClassNames = () => {
    return `${!!value && value.toLowerCase()} ${winningPosition.includes(index) ? 'winner' : ''} ${endgame ? 'endgame' : ''}`;
  }

  return (
    <button
      className={`square ${returnClassNames()}`}
      onClick={() => onClick()}
    >
      {value === 'X' && <Cross />}
      {value === 'O' && <Circle />}
    </button>
  );
}
