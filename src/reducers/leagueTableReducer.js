let leagueTableReducer = (state = {loading: false}, action) => {
	switch(action.type) {
		case 'GET_LEAGUE_TABLE':
			return {
				leagueTable: action.leagueTable,
				loading: false
			};
		case 'FETCH_LEAGUE_TABLE':
			return {
				...state,
				loading: true
			};
		default:
			return state;
	}
}


export default leagueTableReducer;