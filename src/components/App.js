import React, { Component } from 'react';
import logo from '../assets/images/logo.svg';
import { Main } from "./Main";
import { TopBar } from "./TopBar";

class App extends Component {
  render() {
    return (
      <div className="App">
        <TopBar />
        <Main/>
      </div>

    );
  }
}

export default App;
