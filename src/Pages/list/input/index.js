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

			axios.post(`http://localhost:4000/tasks/${id}`, {
				title: task.title,
				isCompleted: task.isCompleted,
				id: task.id,
				userId: id,
			}).then((res) => {
				task.id = res.data._id
				dispatch(addTask(task));
			}).catch((err) => {
				dispatch(presentAlert(err.message));
			});

		} else {
			dispatch(presentAlert('Empty input'));
		}
		inputRef.current.value = '';
	};

	return (
		<div>
			<TextField
				inputProps={{maxLength: 70}}
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
