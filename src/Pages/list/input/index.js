import React from 'react';
import axios from 'axios';
import { useRouteMatch } from 'react-router-dom';
import { Button, TextField } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import { addTask } from '../../../redux/actions';
import { presentAlert } from '../../../redux/actions';
import { useStyles } from './styles';
import { generateID, enableEnter } from '../../../functions/functions';

const Input = () => {
	const dispatch = useDispatch();
	const classes = useStyles();
	const match = useRouteMatch('/tasks/:id')
	const inputRef = React.createRef();

	const appendTask = () => {

		let task = {
			title: inputRef.current.value,
			isCompleted: false,
			id: generateID(),
			date: Date(),
		};

		if (inputRef.current.value.trim() !== '') {
			const {id} = match.params;
			inputRef.current.value = '';

			axios.post(`http://localhost:4000/tasks/${id}`, {
				title: task.title,
				isCompleted: task.isCompleted,
				id: task.id,
				date: task.date,
				userId: id,
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
			<TextField
				className={classes.input}
				id='outlined-basic'
				label='Add Task'
				variant='outlined'
				inputRef={inputRef}
				size='small'
				onKeyDown={(e) => enableEnter(e, () => appendTask())}/>
			<Button
				className={classes.button}
				variant='contained'
				onClick={() => appendTask()}
			>Submit</Button>
		</div>
	);
};
export default Input;
