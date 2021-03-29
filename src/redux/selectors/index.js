import { createSelector } from 'reselect';

export const tasksSelector = (state => state.taskReducer);
export const alertSelector = (state => state.alertReducer);
export const completedTasksSelector = (state => state.completedTasksReducer);


export const tasksCompletionSelector = createSelector(
	tasksSelector, (tasks) => tasks.filter(task => task.isCompleted)
);

