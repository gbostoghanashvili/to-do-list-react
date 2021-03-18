const defaultState = {
	isPresented: false,
	message: ''
};

const alertReducer = (state = defaultState, action) => {
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

export default alertReducer;