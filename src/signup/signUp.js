import React from 'react';
import axios from 'axios';
import { Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AlertMessage from '../alertMessage/alertMessage';
import { presentAlert } from '../redux/actions';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

const useStyles = makeStyles({
	container: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		paddingTop: 100
	},
	textField: {
		marginBottom: 10,
	},
	button: {
		width: 100,
	},
	backButton: {
		marginRight: 10,
	}
});

const SignUp = () => {
	const classes = useStyles();

	const nameRef = React.createRef();
	const emailRef = React.createRef();
	const passwordRef = React.createRef();
	const confirmPasswordRef = React.createRef();
	const dispatch = useDispatch();
	const history = useHistory();


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

		axios.get('http://localhost:4000/auth').then(res => {
			const emails = res.data.map(task => task.email);
			if (emails.includes(emailInputValue)) {
				dispatch(presentAlert('User with this email already exist'));
			} else {
				if (nameInputValue !== '' &&
					emailInputValue !== '' &&
					passwordInputValue !== '' &&
					confPasswordInputValue !== '') {

					if (passwordInputValue === confPasswordInputValue) {

						axios.post('http://localhost:4000/signup', {
							name: nameInputValue,
							email: emailInputValue,
							password: passwordInputValue
						}).then(() => {
							history.push('/auth');
						}).catch((err) => {
							dispatch(presentAlert(err.message));
						});
						clearFields();
					} else {
						dispatch(presentAlert('Passwords do not match'));
					}
				} else {
					dispatch(presentAlert('Empty input'));
				}
			}
		});
	};

	return (
		<div>
			<Button
				className={classes.backButton}
				onClick={() => history.push('/auth')}
			>Back</Button>
			<div className={classes.container}>
					<AlertMessage/>
				<TextField inputRef={nameRef}
				           className={classes.textField}
				           id="outlined-basic"
				           label="Name"
				           variant="outlined"
				           size='small'
				           required/>
				<TextField inputRef={emailRef}
				           className={classes.textField}
				           id="outlined-basic"
				           label="Email"
				           variant="outlined"
				           size='small'
				           required/>
				<TextField inputRef={passwordRef}
				           className={classes.textField}
				           id="standard-password-input"
				           label="Password"
				           type="password"
				           variant="outlined"
				           size='small'
				           required/>
				<TextField inputRef={confirmPasswordRef}
				           className={classes.textField}
				           id="standard-password-input"
				           label="Confirm Password"
				           type="password"
				           variant="outlined"
				           size='small'
				           required/>
				<Button variant="contained"
				        className={classes.button}
				        onClick={() => createNewUser()}
				>Sign Up</Button>
			</div>
		</div>
	);
};

export default SignUp;