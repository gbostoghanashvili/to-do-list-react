import React from 'react';
import { Button, ButtonGroup } from '@material-ui/core';

import { useStyles } from './styles';

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
				<Button
					key={number}
					className={classes.button}
					onClick={() => props.paginate(number)}
				>{number}</Button>
			</ButtonGroup>
		))
	);
};

export default TasksPagination;


