import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { Button, TextField, Checkbox, Typography } from '@material-ui/core';

import { removeTask, editTask, presentAlert} from '../../../redux/actions';
import { useStyles } from './styles';
import { enableEnter } from '../../../functions';


const Row = (props) => {
	const classes = useStyles();
	const dispatch = useDispatch();

	const [editMode, setEditMode] = useState(false);
	const editInputRef = React.createRef();
	const {row} = props;
	const {isCompleted} = row;

	const deleteTask = () => {
		return axios.post(`http://localhost:4000/tasks/remove/${row._id}`)
		.then(() => {
			dispatch(removeTask(row._id));
		}).catch((err) => {
			dispatch(presentAlert(err.message));
		});
	};

	const saveTask = () => {
		if (editInputRef.current.value.trim()) {
			return axios.post(`http://localhost:4000/tasks/edit/${row._id}`, {
				title: editInputRef.current.value
			}).then(() => {
				row.title = editInputRef.current.value;
				dispatch(editTask(row));
				setEditMode(!editMode);
			}).catch((err) => {
				dispatch(presentAlert(err.message));
			});
		} else {
			setEditMode(!editMode)
		}
	};

	const changeCompletionStatus = () => {
		return axios.post(`http://localhost:4000/tasks/check/${row._id}`, {
			isCompleted: !row.isCompleted
		}).then(() => {
			row.isCompleted = !row.isCompleted;
			dispatch(editTask(row));
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
								onKeyDown={(e) => enableEnter(e, saveTask)}/>
							<Button
								className={classes.button}
								variant="contained"
								onClick={() => setEditMode(!editMode)}
							>Cancel</Button>
							<Button variant="contained"
							        onClick={saveTask}
							>Save</Button>
						</div>
				) :
					<div
						className={classes.container}>
						<Checkbox
							color="primary"
							defaultChecked={isCompleted}
							onClick={changeCompletionStatus}/>
						<Typography
							variant="caption"
							className={`${isCompleted ? 'isCompleted' : ''}`}
						>{row.title}</Typography>
						<Button
							className={classes.button}
							variant="contained"
							onClick={deleteTask}
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
