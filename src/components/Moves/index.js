import React from 'react';
import './Moves.scss';

export default function Moves({ index, onClick }) {

  const description = index ? `Go to move #${index}` : 'Go to game start';

  return (
    <li>
      <button onClick={() => onClick(index)}>{description}</button>
    </li>
  );
}
