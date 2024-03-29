import React, { useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';
import { Button, ButtonGroup, TextField } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import { presentAlert } from '../../redux/actions';
import Alert from '../../components/alertMessage';
import { useStyles } from './styles';

const Login = () => {

	const classes = useStyles();
	const dispatch = useDispatch();

	const emailRef = React.createRef();
	const passwordRef = React.createRef();
	const history = useHistory();

	useEffect(() => {
		checkToken();
	}, []);


	const checkToken = () => {
		const token = localStorage.getItem('token');
		const id = localStorage.getItem('id');

		if (id) {
			axios.post('http://localhost:4000/user/check', {id}, {headers: {'Authorization': `Bearer ${token}`}})
			.then(res => {
				if (res.data) {
					history.push(`/tasks/${id}`);
				}
			}).catch();
		}
	};


	const logUserIn = () => {
		const email = emailRef.current.value;
		const password = passwordRef.current.value;

		axios.post('http://localhost:4000/user/', {email, password}).then(response => {
			const {id, token} = response.data;
			history.push(`/tasks/${id}`);
			localStorage.setItem('token', token);
			localStorage.setItem('id', id);
		}).catch(err => {
			dispatch(presentAlert(err.response.data));
		});
	};

	return (
		<div className={classes.container}>
			<Alert/>
			<TextField
				className={classes.textField}
				inputRef={emailRef}
				id="outlined-basic"
				label="Email"
				variant="outlined"
				size='small'
				required/>
			<TextField
				className={classes.textField}
				inputRef={passwordRef}
				id="standard-password-input"
				label="Password"
				type="password"
				variant="outlined"
				size='small'
				required/>
			<ButtonGroup orientation='horizontal'>
				<Button
					className={classes.button}
					variant="contained"
					onClick={() => logUserIn()}
				>Login</Button>
				<Button
					variant="contained"
					onClick={() => history.push('/signup')}
				>SignUp</Button>
			</ButtonGroup>
		</div>
	);
};

export default Login;
