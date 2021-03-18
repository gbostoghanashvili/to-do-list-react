import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Tasks from '../tasks/tasks';
import Auth from '../auth/auth';
import SignUp from '../signup/signUp';
import { CssBaseline } from '@material-ui/core';


class App extends Component {

	render() {

		return (
			<Router>
				<CssBaseline/>
				<Switch>
					<Route path='/tasks/:id' component={Tasks}/>
					<Route path='/auth' exact component={Auth}/>
					<Route path='/signup' exact component={SignUp}/>
				</Switch>
			</Router>
		);
	}
}

export default App;