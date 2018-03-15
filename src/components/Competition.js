import React from 'react';
import enFlag from './../images/en-flag.png'; 
import spFlag from './../images/sp-flag.png'; 
import itFlag from './../images/it-flag.png'; 
import frFlag from './../images/fr-flag.png'; 
import deFlag from './../images/de-flag.png'; 

let Competition = (props) => {	
	let selected = props.selected ? 'selected' : '';
	let leagueAbr = props.leagueCode.toLowerCase();
	let flag;
	

	switch (props.leagueCode) {
		case 'PL':
			flag = enFlag;
			break;
		case 'PD':
			flag = spFlag;
			break;
		case 'SA':
			flag = itFlag;
			break;
		case 'FL1':
			flag = frFlag;
			break;
		default:
			flag = deFlag;	
	}

	return (
		<li onClick={props.clickHandler} className={`competition col-md-2 col-sm-2 col-xs-12 ${selected} ${leagueAbr}`}>
			<div className='row middle-xs center-xs competition-title-wrap'>
				<img className='col-md-2 col-sm-2' src={flag} />
				<p className={`competition-title col-md-10 col-sm-10 col-xs-12 ${selected}`}>{props.title}</p>				
			</div>
		</li>
	);
}

export default Competition;