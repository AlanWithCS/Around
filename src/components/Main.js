import React from 'react';
import { Register} from "./Register";
import { Redirect, Route, Switch } from 'react-router-dom';
import { Login } from './Login';
import { Home } from "./Home";
import { Link } from 'react-router-dom';

export class Main extends React.Component {
    getLogin = () => {
        return this.props.isLoggedIn?
            <Redirect to={'/home'}/> : <Redirect to={'/login'}/>
    };

    renderLogin = () => {
        return this.props.isLoggedIn ?
            <Redirect to={'/home'}/> : <Login handleLogin={this.props.handleLogin} />
    };

    getHome = () => {
        return this.props.isLoggedIn ?
            <Home /> : <Login handleLogin={this.props.handleLogin} />
    };

    render() {
        return (
            <div className="main">
                <Switch>
                    <Route exact path='/' render={this.getLogin} />
                    <Route path='/login' render={this.renderLogin} />
                    <Route path='/register'  component={Register}/>
                    <Route path={'/home'} component={this.getHome}/>
                    <Route render={this.getLogin}/>
                </Switch>
            </div>
        )
    }
}