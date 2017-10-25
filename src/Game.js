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

    this.fieldSize = props.fieldSize;
    this.players   = props.players;

    this.state = {
      fields: [],
      nextPlayer: 1,
    }
  }

  handleClick(i) {
    const fields = this.state.fields;
    var nextPlayer = this.state.nextPlayer;
    let player = nextPlayer;

    if (this.checkValid(i)) {
      if (nextPlayer < this.players) {
        fields[i] = 'c-field c-field--p'+nextPlayer;
        nextPlayer++;
      } else {
        fields[i] = 'c-field c-field--p'+this.players;
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

  checkValid(field) {
    const fields = this.state.fields;
    console.log(field);
    if (
      (
        typeof(fields[field+1]) !== 'undefined' || 
        typeof(fields[field-1]) !== 'undefined' ||
        typeof(fields[field+12]) !== 'undefined' ||
        typeof(fields[field-12]) !== 'undefined'
      ) && 
      typeof(fields[field]) === 'undefined'
    ) {

      if (
        field%12 === 0 &&
        typeof(fields[field+1]) === 'undefined' &&
        typeof(fields[field+12]) === 'undefined' &&
        typeof(fields[field-12]) === 'undefined'
      ) {
        return false;
      }

      if (
        field%12 === 11 &&
        typeof(fields[field-1]) === 'undefined' &&
        typeof(fields[field+12]) === 'undefined' &&
        typeof(fields[field-12]) === 'undefined'
      ) {
        return false;
      }

      return true;
    }

    let newGame = 1;
    for (var i = 0; i < this.fieldSize; i++) {
      if (typeof(fields[i]) !== 'undefined') {
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
    let requiredState = 'c-field c-field--p'+player; 
    for (var i = 0; i < this.fieldSize; i++) {
      if (fields[i] === requiredState) {
        if (
          (i%12 < 8 && fields[i+1] === requiredState && fields[i+2] === requiredState && fields[i+3] === requiredState && fields[i+4] === requiredState) ||
          (i < 96 && fields[i+12] == requiredState && fields[i+24] === requiredState && fields[i+36] === requiredState && fields[i+48] === requiredState) ||
          (i < 92 && i%12 < 8 && fields[i+13] === requiredState && fields[i+26] === requiredState && fields[i+39] === requiredState && fields[i+52] === requiredState) ||
          (i < 96 && i%12 > 3 && fields[i+11] === requiredState && fields[i+22] === requiredState && fields[i+33] === requiredState && fields[i+44] === requiredState)
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