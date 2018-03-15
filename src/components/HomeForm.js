import React from 'react';
import LeagueTableRow from './LeagueTableRow';

let HomeForm = (props) => {
	return (
		<ul className='teams-list row'>
			{getSortedHomeForm(props).map((team, index) => <LeagueTableRow 
				team={getTeam(props, team, index)}
				key={index} />)}
		</ul>
	);
}


let getSortedHomeForm = (props) => {
	let list = props.home;

	let sorted = Object.keys(list).sort(function(a, b) {
		let draws_a = list[a].homeForm.draws,
			draws_b = list[b].homeForm.draws,
			wins_a = list[a].homeForm.wins,
			wins_b = list[b].homeForm.wins;

		let points_a = draws_a + (wins_a*3),
			points_b = draws_b + (wins_b*3);

		if (points_a === points_b) {
			let goals_a = list[a].homeForm.goals,
				goalsAgainst_a = list[a].homeForm.goalsAgainst,
				goals_b = list[b].homeForm.goals,
				goalsAgainst_b = list[b].homeForm.goalsAgainst;

			let difference_a = goals_a - goalsAgainst_a,
				difference_b = goals_b - goalsAgainst_b;

			return difference_b - difference_a;

		}

		return points_b - points_a;
	});
	return sorted;
}

let getTeam = (props, team, index) => {
	let filteredTeam = props.home[team],
		crest = filteredTeam.crest,
		position = index+1,
		playedGames = filteredTeam.homeForm.wins + filteredTeam.homeForm.draws + filteredTeam.homeForm.losses,
		goalDifference = filteredTeam.homeForm.goals - filteredTeam.homeForm.goalsAgainst,
		points = (filteredTeam.homeForm.wins*3) + filteredTeam.homeForm.draws;

	return {
		position: position,
		teamName: team,
		crestURI: crest,
		playedGames: playedGames,
		wins: filteredTeam.homeForm.wins,
		draws: filteredTeam.homeForm.draws,
		losses: filteredTeam.homeForm.losses,
		goals: filteredTeam.homeForm.goals,
		goalsAgainst: filteredTeam.homeForm.goalsAgainst,
		goalDifference: goalDifference,
		points: points
	}

}


export default HomeForm;