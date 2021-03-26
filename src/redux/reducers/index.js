import { combineReducers } from 'redux';
import { taskReducer, alertReducer, completedTasksReducer } from './Reducers';

const reducers = combineReducers({
	taskReducer,
	alertReducer,
	completedTasksReducer,
});

export default reducers;