const apiToken  = 'a507335a02584175b0877ff28ede7235';
const hostURL = 'http://api.football-data.org/v1';

let footballApi = (function() {

	let getCompetitionsURL = (year) => {
		return `${hostURL}/competitions/?season=${year}`;
	}

	let getLeagueTableURL = (id) => {
		return `${hostURL}/competitions/${id}/leagueTable`;
	}

	let getHeaders = () => {
		return {
			headers: {
				'X-Auth-Token': `${apiToken}`,
				'X-Response-Control': 'full'
			}
		}
	}

	return {
		getHeaders: getHeaders,
		getCompetitionsURL: getCompetitionsURL,
		getLeagueTableURL: getLeagueTableURL
	}

})();

export default footballApi;