import footballApi from './../utils/footballApi';

let getCompetitions = (year) => {
	return (dispatch) => {
		fetch(footballApi.getCompetitionsURL(year), footballApi.getHeaders())
		.then(res => res.json())
		.then(competitions => {
			dispatch({type: 'GET_COMPETITIONS', competitions});
		})
	}
}

export default getCompetitions;