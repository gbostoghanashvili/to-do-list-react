import { combineReducers } from 'redux';
import {actionTypes} from '../actions';

const taskReducer = (state = [], action) => {
	switch (action.type) {
		case actionTypes.checkAll:
			return state.map(task => !task.isCompleted ? {...task, isCompleted: true} : task)
		case actionTypes.uncheckAll:
			return state.map(task => task.isCompleted ? {...task, isCompleted: false} : task)
		case actionTypes.deleteSelected:
			return state.filter(task => !task.isCompleted);
		case actionTypes.show:
			return action.payload;
		case actionTypes.add:
			return [action.payload, ...state];
		case actionTypes.remove:
			return state.filter(task => task._id !== action.payload);
		case actionTypes.edit:
		const {_id, title, isCompleted} = action.payload
			return state.map(task => task.id === _id ? {...task, title, isCompleted} : task)
		default:
			return state;
	}
};

const defaultCompletedTasksState = {
	allTasks: 0,
	completedTasks: 0,
};

const completedTasksReducer = (state = defaultCompletedTasksState, action) => {

	switch (action.type) {
		case actionTypes.set:
			return {
				allTasks: action.all,
				completedTasks: action.count
			};
		default:
			return defaultCompletedTasksState;
	}
};


const defaultAlertState = {
	isPresented: false,
	message: ''
};

const alertReducer = (state = defaultAlertState, action) => {
	switch (action.type) {
		case actionTypes.isPresented:
			return {
				isPresented: true,
				message: action.payload
			};
		case actionTypes.isHidden:
			return {
				isPresented: false,
				message: ''
			};
		default:
			return state;
	}
};

const reducers = combineReducers({
	taskReducer,
	alertReducer,
	completedTasksReducer,
});

export default reducers;
