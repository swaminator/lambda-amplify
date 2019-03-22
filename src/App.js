import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Amplify, { API } from 'aws-amplify';
import awsmobile from './aws-exports';

Amplify.configure(awsmobile);

class GuessNumber extends React.Component {
  state = { guess: null };

  async makeGuess() {
    const guess = parseInt(this.refs.guess.value, 10);
    const body = { guess }
    const { result } = await API.post('Guesses', '/number', { body });
    this.setState({
      guess: result
    });
  }

  render() {
    let prompt = ""

    switch (this.state.guess) {
      case "high":
        prompt = "Incorrect. Guess a lower number.";
        break;
      case "low":
        prompt = "Incorrect. Guess a higher number.";
        break;
      case "correct":
        prompt = `Correct! The number is ${this.refs.guess.value}!`;
        break;
      default:
        prompt = "Guess a number between 1 and 1000.";
    }

    return (
      <div style={styles}>
        <h1>Guess The Number</h1>
        <p>{ prompt }</p>

        <input ref="guess" type="text" />
        <button type="submit" onClick={this.makeGuess.bind(this)}>Guess</button>
      </div>
    )

  }
}

let styles = {
  margin: "0 auto",
  width: "30%"
};

export default GuessNumber;