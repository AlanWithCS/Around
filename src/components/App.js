import React, { Component } from 'react';
import logo from '../assets/images/logo.svg';
import { Main } from "./Main";
import { TopBar } from "./TopBar";
import { TOKEN_KEY} from "../constants";

class App extends Component {
    state = {
        isLoggedIn: !!localStorage.getItem(TOKEN_KEY),
    };

    handleLogin = (data) => {
        localStorage.setItem(TOKEN_KEY, data);
        this.setState({isLoggedIn: true});
    };

    handleLogout = () => {
        localStorage.removeItem(TOKEN_KEY);
        this.setState({isLoggedIn: false});
    };
  render() {
    return (
      <div className="App">
        <TopBar
            isLoggedIn={this.state.isLoggedIn}
            handleLogout={this.handleLogout}
        />
        <Main
            isLoggedIn={this.state.isLoggedIn}
            handleLogin={this.handleLogin}
        />
      </div>
    );
  }
}

export default App;
