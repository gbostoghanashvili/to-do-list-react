import { combineReducers } from 'redux';
import { taskReducer, alertReducer } from './Reducers';

const reducers = combineReducers({
	taskReducer,
	alertReducer
});

export default reducers;