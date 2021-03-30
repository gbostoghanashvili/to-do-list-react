import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import SignUp from './pages/signup';
import { CssBaseline } from '@material-ui/core';


class App extends Component {

	render() {
		return (
			<Router>
				<CssBaseline/>
				<Switch>
					<Route path='/tasks/:id' component={Home}/>
					<Route path='/' exact component={Login}/>
					<Route path='/signup' exact component={SignUp}/>
				</Switch>
			</Router>
		);
	}
}

export default App;
