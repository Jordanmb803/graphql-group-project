import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Characters from './Characters';
import AddCharacter from './AddCharacter';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Characters />
        <AddCharacter />
      </div>
    );
  }
}

export default App;
