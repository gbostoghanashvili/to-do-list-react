import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useRouteMatch } from 'react-router-dom';
import { Button, TextField } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import { addTask, checkAll, deleteSelected, uncheckAll } from '../../../redux/actions';
import { presentAlert, setCompletedTasks } from '../../../redux/actions';
import { useStyles } from './styles';
import { generateID, enableEnter } from '../../../functions/functions';
import { tasksSelector } from '../../../redux/selectors';


const Input = () => {
	const dispatch = useDispatch();
	const classes = useStyles();
	const match = useRouteMatch('/tasks/:id')
	const inputRef = React.createRef();
	const tasks = useSelector(tasksSelector);
	const comps = tasks.every (task => task.isCompleted)
	const [selectionButtonTitle, setSelectionButtonTitle] = useState('')


	useEffect(() => {
		const trues = tasks.filter(task => task.isCompleted !== false)

		if(comps) {
			setSelectionButtonTitle('uncheck all')
		} else if (!comps) {
			setSelectionButtonTitle('check all')
		}
		dispatch(setCompletedTasks(tasks.length, trues.length ))
	}, [tasks])

	const appendTask = () => {

		let task = {
			title: inputRef.current.value,
			isCompleted: false,
			id: generateID(),
		};

		if (inputRef.current.value.trim() !== '') {
			const {id} = match.params;

			axios.post(`http://localhost:4000/tasks/${id}`, {
				title: task.title,
				isCompleted: task.isCompleted,
				id: task.id,
				userId: id,
			}).then((res) => {
				task._id = res.data._id
				dispatch(addTask(task));
			}).catch((err) => {
				dispatch(presentAlert(err.message));
			})
		}
		inputRef.current.value = '';
	};


	const selection = () => {
		const {id} = match.params;

		if(selectionButtonTitle === 'check all') {
			axios.post(`http://localhost:4000/tasks/checkAll/${id}`, {check: true})
			.then(() => {
				dispatch(checkAll())
			}).catch((err) => {
				dispatch(presentAlert(err.message));
			})
		} else {
			axios.post(`http://localhost:4000/tasks/checkAll/${id}`, {check: false})
			.then(() => {
				dispatch(uncheckAll())
			}).catch((err) => {
				dispatch(presentAlert(err.message));
			})

		}
	}

	const deleteChecked = () => {
		const {id} = match.params;

		axios.post(`http://localhost:4000/tasks/deleteChecked/${id}`)
		.then(() => {
			dispatch(deleteSelected())
		}).catch((err) => {
			dispatch(presentAlert(err.message));
		})

	}

	return (
		<div>
			<TextField
				inputProps={{maxLength: 70}}
				placeholder={'add task'}
				id='outlined-basic'
				label='Add Task'
				variant='outlined'
				inputRef={inputRef}
				size='small'
				onKeyDown={(e) => enableEnter(e, () => appendTask())}/>
			<Button
				className={classes.button}
				variant='contained'
				onClick={() => deleteChecked()}
			>Delete Selected</Button>
			<Button
				className={classes.button}
				variant='contained'
				onClick={() => selection()}
			>{selectionButtonTitle}</Button>
			<Button
				className={classes.button}
				variant='contained'
				onClick={() => appendTask()}
			>Submit</Button>
		</div>
	);
};
export default Input;
