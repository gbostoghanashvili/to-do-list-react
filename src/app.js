import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Tasks from './Pages/list/tasks';
import Login from './Pages/login';
import SignUp from './Pages/signup';
import { CssBaseline } from '@material-ui/core';


class App extends Component {

	render() {

		return (
			<Router>
				<CssBaseline/>
				<Switch>
					<Route path='/tasks/:id' component={Tasks}/>
					<Route path='/' exact component={Login}/>
					<Route path='/signup' exact component={SignUp}/>
				</Switch>
			</Router>
		);
	}
}

export default App;