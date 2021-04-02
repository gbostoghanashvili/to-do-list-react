export const actionTypes = {
	add: 'add',
	show: 'show',
	remove: 'remove',
	edit: 'edit',
	checkAll: 'checkAll',
	uncheckAll: 'uncheckAll',
	deleteSelected: 'deleteSelected',
	isPresented: 'isPresented',
	isHidden: 'isHidden',
	set: 'set'

}

export const addTask = (task) => {
	return {
		type: actionTypes.add,
		payload: task
	};
};

export const showTasks = (tasks) => {
	return {
		type: actionTypes.show,
		payload: tasks
	};
};

export const removeTask = (id) => {
	return {
		type: actionTypes.remove,
		payload: id
	};
};

export const editTask = (task) => {
	return {
		type: actionTypes.edit,
		payload: task
	};
};

export const checkAll = () => {
	return {
		type: actionTypes.checkAll,
	};
};

export const uncheckAll = () => {
	return {
		type: actionTypes.uncheckAll
	};
};

export const deleteSelected = () => {
	return {
		type: actionTypes.deleteSelected
	};
};

export const presentAlert = (message) => {
	return {
		type: actionTypes.isPresented,
		payload: message
	};
};

export const hideAlert = () => {
	return {
		type: actionTypes.isHidden,
	};
};

export const setCompletedTasks = (all, count) => {
	return {
		type: actionTypes.set,
		all: all,
		count: count
	};
};
