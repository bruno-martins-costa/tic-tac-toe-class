import React from 'react';
import './History.scss';

export default function History({ children, status, hasWinner }) {

  return (
    <div className="history">
      <h2>{status}</h2>
      {!hasWinner &&
        <>
          <h3>Game steps:</h3>
          <ol>
            {children}
          </ol>
        </>
      }
    </div>
  );
}
