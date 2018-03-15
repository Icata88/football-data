import React from 'react';
import LeagueTableRow from './LeagueTableRow';

let AwayForm = (props) => {
	return (
		<ul className='teams-list row'>
			{getSortedAwayForm(props).map((team, index) => <LeagueTableRow 
				team={getTeam(props, team, index)}
				key={index} />)}
		</ul>
	);	
}

let getSortedAwayForm = (props) => {
	let list = props.away;

	let sorted = Object.keys(list).sort(function(a, b) {
		let draws_a = list[a].awayForm.draws,
			draws_b = list[b].awayForm.draws,
			wins_a = list[a].awayForm.wins,
			wins_b = list[b].awayForm.wins;

		let points_a = draws_a + (wins_a*3),
			points_b = draws_b + (wins_b*3);

		if (points_a === points_b) {
			let goals_a = list[a].awayForm.goals,
				goalsAgainst_a = list[a].awayForm.goalsAgainst,
				goals_b = list[b].awayForm.goals,
				goalsAgainst_b = list[b].awayForm.goalsAgainst;

			let difference_a = goals_a - goalsAgainst_a,
				difference_b = goals_b - goalsAgainst_b;

			return difference_b - difference_a;

		}

		return points_b - points_a;
	});
	return sorted;
}

let getTeam = (props, team, index) => {
	let filteredTeam = props.away[team],
		crest = filteredTeam.crest,
		position = index+1,
		playedGames = filteredTeam.awayForm.wins + filteredTeam.awayForm.draws + filteredTeam.awayForm.losses,
		goalDifference = filteredTeam.awayForm.goals - filteredTeam.awayForm.goalsAgainst,
		points = (filteredTeam.awayForm.wins*3) + filteredTeam.awayForm.draws;

	return {
		position: position,
		teamName: team,
		crestURI: crest,
		playedGames: playedGames,
		wins: filteredTeam.awayForm.wins,
		draws: filteredTeam.awayForm.draws,
		losses: filteredTeam.awayForm.losses,
		goals: filteredTeam.awayForm.goals,
		goalsAgainst: filteredTeam.awayForm.goalsAgainst,
		goalDifference: goalDifference,
		points: points
	}

}

export default AwayForm;