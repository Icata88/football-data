import React from 'react';

let LeagueTableRow = (props) => {
	let status = 'status' in props ? props.status : '';
	return (
		<li className='col-xs-12'>
			<div className='row team'>
				<div className={`col-md-1 col-sm-1 center-xs team-position ${status}`}>{props.team.position}</div>
				<div className='col-md-3 col-sm-3 team-name'>
					<div className='row middle-xs'>
						<img className='crest-small col-xs-12' src={props.team.crestURI} />
						<div className='col-md-9 col-sm-9'>{props.team.teamName}</div>
					</div>				
				</div>
				<div className='col-md-1 col-sm-1'>{props.team.playedGames}</div>
				<div className='col-md-1 col-sm-1'>{props.team.wins}</div>
				<div className='col-md-1 col-sm-1'>{props.team.draws}</div>
				<div className='col-md-1 col-sm-1'>{props.team.losses}</div>
				<div className='col-md-1 col-sm-1'>{props.team.goals}</div>
				<div className='col-md-1 col-sm-1'>{props.team.goalsAgainst}</div>
				<div className='col-md-1 col-sm-1'>{props.team.goalDifference}</div>
				<div className='col-md-1 col-sm-1'>{props.team.points}</div>
			</div>
		</li>
	);
}

export default LeagueTableRow;