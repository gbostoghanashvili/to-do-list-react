import React from 'react';
import { Button, ButtonGroup } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	button: {
		marginLeft: 10,
		height: 30,
		width: 30,
	}
});


const TasksPagination = (props) => {
	const pageNumbers = [];

	const classes = useStyles();

	for (let i = 1; i <= Math.ceil(props.totalTasks / props.tasksPerPage); i++) {
		pageNumbers.push(i);
	}

	return (
		pageNumbers.map(number => (
			<ButtonGroup
				key={number}
				orientation={'horizontal'}>
				<Button key={number}
				        className={classes.button}
				        onClick={() => props.paginate(number)}
				>{number}</Button>
			</ButtonGroup>
		))
	);
};

export default TasksPagination;


