import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { addTask } from '../redux/actions';
import { useDispatch } from 'react-redux';
import { presentAlert } from '../redux/actions';

const useStyles = makeStyles({
	input: {
		maxLength: 70,
	},
	button: {
		marginLeft: 10,
	}
});

const Input = (props) => {
	const dispatch = useDispatch();

	const classes = useStyles();

	const generateID = () => {
		return Math.random().toString(36).substr(2, 9);
	};

	const inputRef = React.createRef();


	const enableEnter = (event) => {
		if (event.keyCode === 13) {
			appendTask();
		}
	};

	const appendTask = () => {

		let task = {
			title: inputRef.current.value,
			isCompleted: false,
			id: generateID(),
			date: Date(),
		};

		if (inputRef.current.value.trim() !== '') {
			const {id} = props.match.params;
			inputRef.current.value = '';


			axios.post(`http://localhost:4000/tasks/${id}`, {
				title: task.title,
				checked: task.isCompleted,
				id: task.id,
				date: task.date
			}).then(() => {
				dispatch(addTask(task));

			}).catch((err) => {
				dispatch(presentAlert(err.message));
			});

		} else {
			dispatch(presentAlert('Empty input'));
		}
	};

	return (
		<div>
			<TextField className={classes.input}
			           id='outlined-basic'
			           label='Add Task'
			           variant='outlined'
			           inputRef={inputRef}
			           size='small'
			           onKeyDown={(e) => enableEnter(e)}/>
			<Button
				className={classes.button}
				variant='contained'
				onClick={() => appendTask()}
			>Submit</Button>
		</div>
	);
};
export default withRouter(Input);
