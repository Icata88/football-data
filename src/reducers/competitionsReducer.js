let competitionsReducer = (state = [], action) => {
	switch(action.type) {
		case 'GET_COMPETITIONS':
			return {
				competitions: action.competitions
			};
		default:
			return state;
	}
}

export default competitionsReducer;