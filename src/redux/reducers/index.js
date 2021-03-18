import { combineReducers } from 'redux';
import taskReducer from './taskReducer';
import alertReducer from './alertReducer';

const reducers = combineReducers({
	taskReducer,
	alertReducer
});

export default reducers;