export const taskReducer = (state = [], action) => {
	switch (action.type) {
		case 'show':
			return action.payload;
		case 'add':
			return [action.payload, ...state];
		case 'remove':
			return [...state].filter(task => task.id !== action.payload);
		case 'edit':
			return [...state].map(task => {
				if (task.id === action.payload.id) {
					task.title = action.payload.title;
					task.isCompleted = action.payload.isCompleted;
				}
				return task;
			});
		default:
			return state;
	}
};

const defaultState = {
	isPresented: false,
	message: ''
};

export const alertReducer = (state = defaultState, action) => {
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
};