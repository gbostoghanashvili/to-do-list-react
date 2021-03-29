import { createSelector } from 'reselect';

export const tasksSelector = ( state => state.taskReducer)
export const alertSelector = (state => state.alertReducer)
export const completedTasksSelector = (state => state.completedTasksReducer)

const getCompletedTasks = (tasks) => {
	return tasks.filter(task => task.isCompleted === true);
}

export const tasksCompletionSelector = createSelector(
	tasksSelector,
	getCompletedTasks
)

