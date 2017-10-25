import React, { Component } from 'react';
//import logo from './logo.svg';
import './Game.css';



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
    }
  }

  handleClick(i) {
    const fields = this.state.fields;
    var nextPlayer = this.state.nextPlayer;
    const player = nextPlayer;

    if (this.isMoveValid(i)) {
      if (nextPlayer < this.props.players) {
        fields[i] = 'c-field--p'+nextPlayer;
        nextPlayer++;
      } else {
        fields[i] = 'c-field--p'+this.props.players;
        nextPlayer = 1;
      }

      if(this.checkWin(player)) {
        alert('Player '+player+' wins!');
      }

      this.setState({
        fields: fields,
        nextPlayer: nextPlayer,
      });
    }
  }

  isMoveValid(field) {
    const fields = this.state.fields;
    const factor = Math.sqrt(this.props.fieldSize);

    if (
      (
        fields[field+1] !== '' || 
        fields[field-1] !== '' ||
        fields[field+factor] !== '' ||
        fields[field-factor] !== ''
      ) && 
      fields[field] === ''
    ) {

      if (
        field%factor === 0 &&
        fields[field+1] === '' &&
        fields[field+factor] === '' &&
        fields[field-factor] === ''
      ) {
        return false;
      }

      if (
        field%factor === factor-1 &&
        fields[field-1] === '' &&
        fields[field+factor] === '' &&
        fields[field-factor] === ''
      ) {
        return false;
      }

      return true;
    }

    let newGame = 1;
    for (let i = 0; i < this.props.fieldSize; i++) {
      if (fields[i] !== '') {
        newGame = 0;
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
        if (
          (i < this.props.fieldSize-4 && i%factor < factor-4 && fields[i+1] === requiredState && fields[i+2] === requiredState && fields[i+3] === requiredState && fields[i+4] === requiredState) ||
          (i < maxCheckField && fields[i+factor] === requiredState && fields[i+(factor*2)] === requiredState && fields[i+(factor*3)] === requiredState && fields[i+(factor*4)] === requiredState) ||
          (i < maxCheckField && i%factor < factor-4 && fields[i+factor+1] === requiredState && fields[i+((factor+1)*2)] === requiredState && fields[i+((factor+1)*3)] === requiredState && fields[i+((factor+1)*4)] === requiredState) ||
          (i < maxCheckField && i%factor > 3 && fields[i+(factor-1)] === requiredState && fields[i+((factor-1)*2)] === requiredState && fields[i+((factor-1)*3)] === requiredState && fields[i+((factor-1)*4)] === requiredState)
        ) {
          return true;
        }
      }
    }

    return false;
  }

  render() {
    return (
      <Board
        fields={this.state.fields}
        onClick={i => this.handleClick(i)}
      />
    );
  }
}

export default Game;
