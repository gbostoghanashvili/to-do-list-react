export const generateID = () => {
	return Math.random().toString(36).substr(2, 9);
};

export const enableEnter = (event, func) => {
	if (event.keyCode === 13) {
		func();
	}
};