import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { Typography, List, Button } from '@material-ui/core';
import { useHistory } from 'react-router';

import Input from './input';
import TasksPagination from './pagination';
import Row from './row';
import Alert from '../../components/alertMessage';
import { useStyles } from './styles';
import { generateID } from '../../functions';
import { presentAlert, showTasks } from '../../redux/actions';
import { tasksSelector, completedTasksSelector } from '../../redux/selectors';

const tasksPerPage = 10

const Tasks = () => {
	const classes = useStyles();
	const tasks = useSelector(tasksSelector);
	const completedTasks = useSelector(completedTasksSelector);
	const dispatch = useDispatch();
	const history = useHistory();
	const match = useRouteMatch('/tasks/:id');

	const [currentPage, setCurrentPage] = useState(1);

	const indexOfLastTask = currentPage * tasksPerPage;
	const indexOfFirstTask = indexOfLastTask - tasksPerPage;
	const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

	useEffect(() => {
		checkToken();
	}, []);

	useEffect(() => {
		if( currentPage !== 1 && currentTasks.length === 0) {
			setCurrentPage(currentPage - 1)
		}
	},[currentTasks])

	const checkToken = () => {
		const token = localStorage.getItem('token');
		const {id} = match.params;

		axios.post('http://localhost:4000/check', {id}, {headers: {'Authorization': `Bearer ${token}`}})
		.then(res => {
			if (res.data) {
				setTasks();
			} else {
				history.push('/');
			}
		}).catch(err => {
			dispatch(presentAlert(err.response.data));
		});
	};


	const setTasks = () => {
		const {id} = match.params;
		axios.get(`http://localhost:4000/tasks/${id}`)
		.then(res => {
			dispatch(showTasks(res.data));
		}).catch((err) => {
			dispatch(presentAlert(err.message));
		});
	};

	const logUserOut = () => {
		localStorage.clear();
		history.push('/');
	};

	const rows = currentTasks.map((row) => {
		return (
			<Row
				key={generateID()}
				row={row}
			/>
		);
	});

	return (
		<div>
			<Button
				className={classes.button}
				onClick={logUserOut}>Logout</Button>
			<Typography
				className={classes.countLabel}
				variant="h6"
				align={'left'}
				color={'textPrimary'}
				gutterBottom
			>{`Selected Tasks: ${completedTasks.completedTasks}/${completedTasks.allTasks}`} </Typography>
			<div className={classes.container}>
				<Alert setTasks={setTasks}/>
				<Typography
					className={classes.typo}
					variant="h3"
					align={'center'}
					color={'textPrimary'}
					gutterBottom
				>Tasks</Typography>
				<Input/>
				<List
					className={classes.list}>{rows}
				</List>
				<div>
					<TasksPagination
						tasksPerPage={tasksPerPage}
						totalTasks={tasks.length}
						paginate={setCurrentPage}/>
				</div>
			</div>
		</div>
	);
};

export default Tasks;
