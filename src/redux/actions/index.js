export const addTask = (task) => {
	return {
		type: 'add',
		payload: task
	};
};

export const showTasks = (tasks) => {
	return {
		type: 'show',
		payload: tasks
	};
};

export const removeTask = (id) => {
	return {
		type: 'remove',
		payload: id
	};
};

export const editTask = (task) => {
	return {
		type: 'edit',
		payload: task
	};
};

export const presentAlert = (message) => {
	return {
		type: 'isPresented',
		payload: message
	};
};

export const hideAlert = () => {
	return {
		type: 'isHidden',
	};
};