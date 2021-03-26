
export const taskReducer = (state = [], action) => {
	switch (action.type) {
		case 'checkAll':
			return [...state].map(task => {
				if(task.isCompleted === false) {
					task.isCompleted = true
				}
				return task
		})
		case 'uncheckAll':
			return [...state].map(task => {
				if(task.isCompleted === true) {
					task.isCompleted = false
				}
				return task
			})
		case 'deleteSelected':
			return [...state].filter(task => task.isCompleted !== true);
		case 'show':
			return action.payload.reverse();
		case 'add':
			return [action.payload, ...state];
		case 'remove':
			return [...state].filter(task => task._id !== action.payload);
		case 'edit':
			return [...state].map(task => {
				if (task.id === action.payload._id) {
					task.title = action.payload.title;
					task.isCompleted = action.payload.isCompleted;
				}
				return task;
			});
		default:
			return state;
	}
};

const defaultCompletedTasksState = {
	allTasks: 0,
	completedTasks: 0,
}

export const completedTasksReducer = (state = defaultCompletedTasksState, action) => {

	switch (action.type) {
		case 'set':
			return {
				allTasks: action.all,
				completedTasks: action.count
			}
		default:
			return defaultCompletedTasksState
	}
}




const defaultAlertState = {
	isPresented: false,
	message: ''
};

export const alertReducer = (state = defaultAlertState, action) => {
	switch (action.type) {
		case 'isPresented':
			return {
				isPresented: true,
				message: action.payload
			};
		case 'isHidden':
			return {
				isPresented: false,
				message: ''
			};
		default:
			return state;
		}
	}

