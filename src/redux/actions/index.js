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

export const checkAll = () => {
	return {
		type: 'checkAll',
	};
};

export const uncheckAll = () => {
	return {
		type: 'uncheckAll'
	};
};

export const deleteSelected = () => {
	return {
		type: 'deleteSelected'
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

export const setCompletedTasks = (all, count) => {
	return {
		type: 'set',
		all: all,
		count: count
	};
};
