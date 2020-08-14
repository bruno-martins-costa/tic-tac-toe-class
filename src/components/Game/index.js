import React, { Component } from 'react';
import './Game.scss';
import { Board, Header, History, Moves } from '../';

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [Array(9).fill(null)],
      stepNumber: 0,
      xIsNext: true,
      hasWinner: false,
      winner: '',
      winningPosition: [],
      endgame: false
    };
  }

  componentDidUpdate() {
    if (!this.state.hasWinner) {
      this.checkForWinner(this.returnLastTurnSquares());
    }
  }

  returnLastTurnSquares() {
    return this.state.history[this.state.history.length - 1];
  }

  markBoard(index) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const lastTurnSquares = [...history[history.length - 1]];

    if (!!lastTurnSquares[index] || !!this.state.hasWinner) return;
    
    lastTurnSquares[index] = this.state.xIsNext ? 'X' : 'O';
    const combined = [...history, lastTurnSquares];

    this.setState({
      history: combined,
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    }, () => {
      this.handleEndgame();
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    });
  }

  checkForWinner(squares) {
    const winningPositions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < winningPositions.length; i++) {
      const [a, b, c] = winningPositions[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        this.setState({ 
          winningPosition: winningPositions[i],
          hasWinner: true,
          winner: squares[a]
        }, () => {
          this.handleEndgame();
        });
      };
    }
    return null;
  }

  handleNewGame() {
    this.setState({
      history: [Array(9).fill(null)],
      stepNumber: 0,
      xIsNext: true,
      hasWinner: false,
      winner: '',
      winningPosition: [],
      endgame: false
    });
  }

  handleEndgame() {
    const endgame = this.state.endgame;
    const boardIsFull = this.returnLastTurnSquares().every(square => !!square);
    const gameTied = !endgame && boardIsFull;
    const hasWinner = this.state.hasWinner;

    this.setState({ endgame: gameTied || hasWinner });
  }

  render() {
    const { history, hasWinner, winner, winningPosition, endgame, xIsNext } = this.state;
    const current = history[this.state.stepNumber];
    const status = handleStatus();

    function handleStatus() {
      if (!!winner) return `Player ${winner} wins!`;
      if (endgame) return "Endgame!";
      return `Next player: ${xIsNext ? 'X' : 'O'}`;
    }

    return (
      <div id="game">

        <Header 
          title="React Class Components Tic Tac Toe"
          hasWinner={hasWinner}
          endgame={endgame}
          handleNewGame={() => this.handleNewGame()}
        />

        <div className="container">

          <Board 
            squares={current}
            onClick={(index) => this.markBoard(index)}
            winningPosition={winningPosition}
            endgame={endgame && !hasWinner}
          />

          <History 
            status={status}
            hasWinner={hasWinner}
          >
            {history.map((move, moveIndex) => (
              <Moves
                key={moveIndex}
                index={moveIndex}
                onClick={(moveIndex) => this.jumpTo(moveIndex)}
              />
            ))}
          </History>
          
        </div>

      </div>
    );
  }
}
