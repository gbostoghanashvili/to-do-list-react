import React, { useEffect } from 'react';
import axios from 'axios';
import { Button, TextField } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import { presentAlert } from '../../redux/actions';
import Alert from '../../components/alertMessage';
import { useStyles } from './styles';

const SignUp = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const history = useHistory();

	const nameRef = React.createRef();
	const emailRef = React.createRef();
	const passwordRef = React.createRef();
	const confirmPasswordRef = React.createRef();

	useEffect(() => {
		checkToken();
	}, []);


	const checkToken = () => {
		const token = localStorage.getItem('token');
		const id = localStorage.getItem('id');

		if ( id ) {
			axios.post('http://localhost:4000/user/check', {id}, {headers: {'Authorization': `Bearer ${token}`}}).then(res => {
				if (res.data) {
					history.push(`/tasks/${id}`);
				} else {
					history.push('/');
				}
			}).catch(err => {
				dispatch(presentAlert(err.response.data));
			});
		}
	};


	const clearFields = () => {
		nameRef.current.value = '';
		emailRef.current.value = '';
		passwordRef.current.value = '';
		confirmPasswordRef.current.value = '';
	};

	const createNewUser = () => {

		const nameInputValue = nameRef.current.value.trim();
		const emailInputValue = emailRef.current.value.trim();
		const passwordInputValue = passwordRef.current.value.trim();
		const confPasswordInputValue = confirmPasswordRef.current.value.trim();

		if (nameInputValue &&
			emailInputValue &&
			passwordInputValue &&
			confPasswordInputValue) {

			if (passwordInputValue === confPasswordInputValue) {

				axios.post('http://localhost:4000/user/signup', {
					name: nameInputValue,
					email: emailInputValue,
					password: passwordInputValue
				}).then((res) => {
					if (res.status !== 404) {
						history.push('/');
					}
				}).catch((err) => {
					dispatch(presentAlert(err.response.data));
				});
				clearFields();
			} else {
				dispatch(presentAlert('Passwords do not match'));
			}
		} else {
			dispatch(presentAlert('Empty input'));
		}
	};


	return (
		<div>
			<Button
				className={classes.backButton}
				onClick={() => history.push('/')}
			>Back</Button>
			<div className={classes.container}>
				<Alert/>
				<TextField
					inputRef={nameRef}
					className={classes.textField}
					id="outlined-basic"
					label="Name"
					variant="outlined"
					size='small'
					required/>
				<TextField
					inputRef={emailRef}
					className={classes.textField}
					id="outlined-basic"
					label="Email"
					variant="outlined"
					size='small'
					required/>
				<TextField
					inputRef={passwordRef}
					className={classes.textField}
					id="standard-password-input"
					label="Password"
					type="password"
					variant="outlined"
					size='small'
					required/>
				<TextField
					inputRef={confirmPasswordRef}
					className={classes.textField}
					id="standard-password-input"
					label="Confirm Password"
					type="password"
					variant="outlined"
					size='small'
					required/>
				<Button
					variant="contained"
					className={classes.button}
					onClick={() => createNewUser()}
				>Sign Up
				</Button>
			</div>
		</div>
	);
};

export default SignUp;
