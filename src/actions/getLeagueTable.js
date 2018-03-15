import footballApi from './../utils/footballApi';

let getLeagueTable = (id) => {
	return (dispatch) => {
		dispatch({type: 'FETCH_LEAGUE_TABLE'});
		fetch(footballApi.getLeagueTableURL(id), footballApi.getHeaders())
		.then(res => res.json())
		.then(leagueTable => {
			setTimeout(() => dispatch({type: 'GET_LEAGUE_TABLE', leagueTable}), 400);
		})
	}
}

export default getLeagueTable;