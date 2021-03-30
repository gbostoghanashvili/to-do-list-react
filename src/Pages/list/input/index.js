import React, { useEffect } from 'react';
import axios from 'axios';
import { useRouteMatch } from 'react-router-dom';
import { Button, TextField } from '@material-ui/core';
import { connect } from 'react-redux';

import { addTask, checkAll, uncheckAll, deleteSelected, presentAlert, setCompletedTasks } from '../../../redux/actions';
import { useStyles } from './styles';
import { generateID, enableEnter } from '../../../functions/functions';
import { tasksCompletionSelector, tasksSelector } from '../../../redux/selectors';


const Input = ({tasks,completedTasks, add, alert, checkAll, uncheckAll, deleteSelected, setCheckedTasksLabel}) => {
	const classes = useStyles();
	const match = useRouteMatch('/tasks/:id');
	const inputRef = React.createRef();
	const allTasksChecked = tasks.every(task => task.isCompleted);

	useEffect(() => {
		setCheckedTasksLabel(tasks.length, completedTasks)
	}, [tasks]);

	const appendTask = () => {
		let task = {
			title: inputRef.current.value,
			isCompleted: false,
			id: generateID(),
		};

		if (inputRef.current.value.trim()) {
			const userId = match.params.id;
			const	{title, isCompleted, id } = task

			axios.post(`http://localhost:4000/tasks/${userId}`, { title, isCompleted, id, userId })
				.then((res) => {
				task._id = res.data._id;
				add(task)
			}).catch((err) => {
				alert(err.message)
			});
		}
		inputRef.current.value = '';
	};

	const changeCompStatus = (check) => {
		const {id} = match.params;

		axios.post(`http://localhost:4000/tasks/checkAll/${id}`, {check}).then(() => {
			check ? checkAll() : uncheckAll()
		}).catch((err) => {
			alert(err.message)
		});
	};

	const deleteChecked = () => {
		const {id} = match.params;

		axios.post(`http://localhost:4000/tasks/deleteChecked/${id}`).then(() => {
			deleteSelected()
		}).catch((err) => {
			alert(err.message)
		});
	};

	return (
		<div>
			<TextField
				className={classes.input}
				inputProps={{maxLength: 70}}
				placeholder={'add task'}
				id='outlined-basic'
				label='Add Task'
				variant='outlined'
				inputRef={inputRef}
				size='small'
				onKeyDown={(e) => enableEnter(e, appendTask)}/>
			<Button
				className={classes.button}
				variant='contained'
				onClick={deleteChecked}
			>Delete Selected</Button>
			<Button
				className={classes.button}
				variant='contained'
				onClick={ () => changeCompStatus(!allTasksChecked) }
			>{allTasksChecked ? 'uncheck all' : 'check all'}</Button>
			<Button
				className={classes.button}
				variant='contained'
				onClick={ appendTask }
			>Submit</Button>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		completedTasks: tasksCompletionSelector(state),
		tasks: tasksSelector(state),
	};
};

const mapDispatchToProps = {
		add : addTask,
		alert : presentAlert,
		checkAll : checkAll,
		uncheckAll : uncheckAll,
		deleteSelected : deleteSelected,
		setCheckedTasksLabel : setCompletedTasks,
}

export default connect(mapStateToProps, mapDispatchToProps)(Input)
