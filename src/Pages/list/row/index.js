import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { Button, TextField, Checkbox, Typography } from '@material-ui/core';

import { removeTask, editTask, presentAlert} from '../../../redux/actions';
import { useStyles } from './styles';
import { enableEnter } from '../../../functions/functions';


const Row = (props) => {
	const classes = useStyles();
	const dispatch = useDispatch();

	const [editMode, setEditMode] = useState(false);
	const editInputRef = React.createRef();
	const {row} = props;
	const {isCompleted} = row;

	const deleteTask = (task) => {
		return axios.post(`http://localhost:4000/tasks/remove/${task._id}`).then(() => {
			dispatch(removeTask(task._id));
		}).catch((err) => {
			dispatch(presentAlert(err.message));
		});
	};

	const saveTask = (task) => {
		if (editInputRef.current.value.trim()) {
			return axios.post(`http://localhost:4000/tasks/edit/${task._id}`, {
				title: editInputRef.current.value
			}).then(() => {
				task.title = editInputRef.current.value;
				dispatch(editTask(task));
				setEditMode(!editMode);
			}).catch((err) => {
				dispatch(presentAlert(err.message));
			});
		} else {
			setEditMode(!editMode)
		}
	};

	const changeCompletionStatus = (task) => {
		return axios.post(`http://localhost:4000/tasks/check/${task._id}`, {
			isCompleted: !task.isCompleted
		}).then(() => {
			task.isCompleted = !task.isCompleted;
			dispatch(editTask(task));
		}).catch((err) => {
			dispatch(presentAlert(err.message));
		});
	};

	return (
		<li
			className={'list'}>
			{editMode ?
				(
						<div className={classes.container}>
							<TextField
								inputProps={{maxLength: 70}}
								id="standard"
								defaultValue={row.title}
								inputRef={editInputRef}
								size='small'
								onKeyDown={(e) => enableEnter(e, () => saveTask(row))}/>
							<Button
								className={classes.button}
								variant="contained"
								onClick={() => setEditMode(!editMode)}
							>Cancel</Button>
							<Button variant="contained"
							        onClick={() => saveTask(row)}
							>Save</Button>
						</div>
				) :
					<div
						className={classes.container}>
						<Checkbox
							color="primary"
							defaultChecked={!!isCompleted}
							onClick={() => changeCompletionStatus(row)}/>
						<Typography
							variant="caption"
							className={`${isCompleted ? 'isCompleted' : ''}`}
						>{row.title}</Typography>
						<Button
							className={classes.button}
							variant="contained"
							onClick={() => deleteTask(row)}
						>Delete</Button>
						<Button
							variant="contained"
							onClick={() => setEditMode(!editMode)}
						>Edit</Button>
					</div>
				}
		</li>
	);
};

export default Row;
