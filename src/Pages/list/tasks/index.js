import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { Typography, List, Button } from '@material-ui/core';
import { useHistory } from 'react-router';

import Input from '../input';
import TasksPagination from '../pagination';
import Row from '../row';
import Alert from '../../../Components/AlertMessage';
import { useStyles } from './styles';
import { generateID } from '../../../functions/functions';
import { presentAlert, showTasks } from '../../../redux/actions';
import { tasksSelector } from '../../../redux/selectors';


const Tasks = () => {
	const classes = useStyles();
	const tasks = useSelector(tasksSelector);
	const dispatch = useDispatch();
	const history = useHistory();
	const match = useRouteMatch('/tasks/:id');

	const [currentPage, setCurrentPage] = useState(1);
	const [tasksPerPage] = useState(10);

	const indexOfLastTask = currentPage * tasksPerPage;
	const indexOfFirstTask = indexOfLastTask - tasksPerPage;
	const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

	useEffect(() => {
		setTasks();
	}, []);

	const setTasks = () => {
		const {id} = match.params;
		axios.get(`http://localhost:4000/tasks/${id}`).then(res => {
			dispatch(showTasks(res.data));
		}).catch((err) => {
			dispatch(presentAlert(err.message));
		});
	};

	const paginate = (pageNumber) => {
		setCurrentPage(pageNumber);
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
				onClick={() => history.push('/')}>Logout</Button>
			<div className={classes.container}>
				<Alert/>
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
						paginate={paginate}/>
				</div>
			</div>
		</div>
	);
};

export default Tasks;