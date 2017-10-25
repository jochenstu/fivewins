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

    this.state = {
      fields: Array(144).fill(null),
      nextPlayer: 1,
    }
  }

  handleClick(i) {
    const fields = this.state.fields;
    var nextPlayer = this.state.nextPlayer;

    if (nextPlayer === 1) {
      fields[i] = 'c-field c-field--p1';
      nextPlayer = 2;
    } else {
      fields[i] = 'c-field c-field--p2';
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
