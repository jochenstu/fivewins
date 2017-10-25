import React, { Component } from 'react';
//import logo from './logo.svg';
import './Game.css';



//
// Show winner
//
class ShowWinner extends Component {
  render() {
    if (this.props.winner > 0) {
      return (
        <center>Winner: {this.props.winner}</center>
      );
    }

    return null;
  }
}



//
// Field
//
class Field extends Component {
  render() {
    return (
      <div className={'c-field ' + this.props.owner} onClick={() => this.props.onClick()}>
      </div>
    );
  }
}



//
// Board
//
class Board extends Component {

  renderField(i) {
    return (
      <Field
        key={i}
        owner={this.props.fields[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    let fields = [];

    for (let i = 0; i < 144; i++) {
      fields.push(this.renderField(i));
    }

    return (
      <div className="c-board">
        {fields}
      </div>
    );
  }
}



//
// Game
//
class Game extends Component {

  constructor(props) {
    super(props);

    this.state = {
      fields: Array(props.fieldSize).fill(''),
      nextPlayer: 1,
      winner: 0
    }
  }

  handleClick(i) {
    const fields = this.state.fields;
    let winner = this.state.winner;

    var nextPlayer = this.state.nextPlayer;
    if (winner === 0) {
      const player = nextPlayer;

      if (this.isMoveValid(i)) {
        if (nextPlayer < this.props.players) {
          fields[i] = 'c-field--p'+nextPlayer;
          nextPlayer++;
        } else {
          fields[i] = 'c-field--p'+this.props.players;
          nextPlayer = 1;
        }

        this.setState({fields: fields});

        let won = this.checkWin(player);
        if(won) {
          for (let i=0; i < 5; i++) {
            fields[won[i]] = fields[won[i]]+' c-field--winner';
          }
          winner = player;
        } 

        this.setState({
          fields: fields,
          nextPlayer: nextPlayer,
          winner: winner
        });
      }
    }
  }

  isMoveValid(field) {
    const fields = this.state.fields;
    const factor = Math.sqrt(this.props.fieldSize);

    if ((fields[field+1] !== '' || fields[field-1] !== '' || fields[field+factor] !== '' || fields[field-factor] !== '') && fields[field] === '') {

      if (field%factor === 0 && fields[field+1] === '' && fields[field+factor] === '' && fields[field-factor] === '') {
        return false;
      }

      if (field%factor === factor-1 && fields[field-1] === '' && fields[field+factor] === '' && fields[field-factor] === '' ) {
        return false;
      }

      return true;
    }

    let newGame = 1;
    for (let i = 0; i < this.props.fieldSize; i++) {
      if (fields[i] !== '') {
        newGame = 0;
        break;
      }
    }

    if (newGame === 1) {
      return true;
    }

    return false;
  }

  checkWin(player) {
    const fields = this.state.fields;
    const requiredState = 'c-field--p'+player;
    const factor = Math.sqrt(this.props.fieldSize);
    const maxCheckField = this.props.fieldSize - (factor*4);

    for (let i = 0; i < this.props.fieldSize; i++) {
      if (fields[i] === requiredState) {
        let possibleWins = [
          [i,i+1,i+3,i+4],
          [i,i+factor,i+factor*2,i+factor*3,i+factor*4],
          [i,i+factor+1,i+(factor+1)*2,i+(factor+1)*3,i+(factor+1)*4],
          [i,i+factor-1,i+(factor-1)*2,(factor-1)*3,(factor-1)*4]
        ];
        for (let j = 0; j < 4; j++) {
          let check = maxCheckField;
          if (j === 0) {
            check = this.props.fieldSize-4
          }
          if(i < check && fields[possibleWins[j][1]] === requiredState && fields[possibleWins[j][2]] === requiredState && fields[possibleWins[j][3]] === requiredState && fields[possibleWins[j][4]] === requiredState) {
            return possibleWins[j];
          }
        }
      }
    }

    return false;
  }

  render() {
    return (
      <div>
        <Board
          fields={this.state.fields}
          onClick={i => this.handleClick(i)}
        />
        <ShowWinner
          winner={this.state.winner}
        />
      </div>
    );
  }
}

export default Game;
