import React, { Component } from 'react';
import logo from './logo.svg';
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
      fields: Array(this.fieldSize).fill(null),
      nextPlayer: 1,
    }
  }

  handleClick(i) {
    const fields = this.state.fields;
    var nextPlayer = this.state.nextPlayer;

    if (nextPlayer < this.players) {
      fields[i] = 'c-field c-field--p'+nextPlayer;
      nextPlayer++;
    } else {
      fields[i] = 'c-field c-field--p'+this.players;
      nextPlayer = 1;
    }

    this.setState({
      fields: fields,
      nextPlayer: nextPlayer,
    });
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