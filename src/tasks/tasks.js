import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { presentAlert, showTasks } from '../redux/actions';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, List, Button } from '@material-ui/core';
import Input from '../input/Input';
import TasksPagination from '../pagination/pagination';
import Row from '../row/row';
import AlertMessage from '../alertMessage/alertMessage';
import { useHistory } from 'react-router';

const useStyles = makeStyles({
	container: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},

	typo: {
		marginTop: 50,
	},

	list: {
		listStyle: 'none',
	},

	button: {
		marginRight: 10,
	}

});

const generateID = () => {
	return Math.random().toString(36).substr(2, 9);
};

const Tasks = (props) => {
	const classes = useStyles();
	const tasks = useSelector(state => state.taskReducer);
	const dispatch = useDispatch();
	const history = useHistory();

	const [currentPage, setCurrentPage] = useState(1);
	const [tasksPerPage] = useState(10);

	const indexOfLastTask = currentPage * tasksPerPage;
	const indexOfFirstTask = indexOfLastTask - tasksPerPage;
	const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

	useEffect(() => {
		setTasks();
	}, []);

	const setTasks = () => {
		const {id} = props.match.params;
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
			<Button className={classes.button}
			        onClick={() => history.push('/auth')}>Logout</Button>
			<div className={classes.container}>
				<AlertMessage/>
				<Typography
					className={classes.typo}
					variant="h3"
					align={'center'}
					color={'textPrimary'}
					gutterBottom
				>Tasks</Typography>
				<Input/>
				<List className={classes.list}>{rows}</List>
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

export default (withRouter(Tasks));