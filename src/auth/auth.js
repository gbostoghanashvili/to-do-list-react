import React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';
import { Button, ButtonGroup, TextField } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { presentAlert } from '../redux/actions';
import AlertMessage from '../alertMessage/alertMessage';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles({
	container: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		paddingTop: 100,
	},

	textField: {
		marginBottom: 10,
	},

	button: {
		marginRight: 10,
	}
});

const Auth = () => {

	const classes = useStyles();
	const dispatch = useDispatch();
	const emailRef = React.createRef();
	const passwordRef = React.createRef();
	const history = useHistory();

	const logUserIn = () => {

		axios.get('http://localhost:4000/auth').then(res => {
			const user = res.data.find(user => user.email === emailRef.current.value
				&& user.password === passwordRef.current.value);
			if (user !== undefined) {
				history.push(`/tasks/${user._id}`);
			} else {
				dispatch(presentAlert('user does not exist'));
			}
			return user;
		}).catch((err) => {
			dispatch(presentAlert(err.message));
		});
	};

	return (
		<div className={classes.container}>
			<AlertMessage/>
			<TextField className={classes.textField}
			           inputRef={emailRef}
			           id="outlined-basic"
			           label="Email"
			           variant="outlined"
			           size='small'
			           required/>
			<TextField className={classes.textField}
			           inputRef={passwordRef}
			           id="standard-password-input"
			           label="Password"
			           type="password"
			           variant="outlined"
			           size='small'
			           required/>
			<ButtonGroup orientation='horizontal'>
				<Button className={classes.button}
				        variant="contained"
				        onClick={() => logUserIn()}
				>Login</Button>
				<Button variant="contained"
				        onClick={() => history.push('/signup')}
				>SignUp</Button>
			</ButtonGroup>
		</div>
	);
};

export default withRouter(Auth);