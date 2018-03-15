import React, { Component } from 'react';
import { connect } from 'react-redux';
import getLeagueTable from './../actions/getLeagueTable';
import LeagueTableRow from './LeagueTableRow';
import LoadingSpinner from './LoadingSpinner';
import HomeForm from './HomeForm';
import AwayForm from './AwayForm';
import Legend from './Legend';

class LeagueTable extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isTotalClicked: true,
			isHomeClicked: false,
			isAwayClicked: false
		}

		this.onClickTab = this.onClickTab.bind(this);
	}

	onClickTab(e) {		
		let clickedTab = e.target.getAttribute('data-value');		
		if (clickedTab === 'total') {
			this.setState({
				isTotalClicked: true, 
				isHomeClicked: false, 
				isAwayClicked: false
			});
		} else if (clickedTab === 'home') {
			this.setState({
				isTotalClicked: false, 
				isHomeClicked: true, 
				isAwayClicked: false
			});
		} else {
			this.setState({
				isTotalClicked: false, 
				isHomeClicked: false, 
				isAwayClicked: true
			});			
		}
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.selectedLeagueID !== nextProps.selectedLeagueID) {
			this.setState({
				isTotalClicked: true,
				isHomeClicked: false,
				isAwayClicked: false				
			});
		}
	}

	componentDidUpdate(prevProps, prevState) {	
		if (prevProps.selectedLeagueID !== this.props.selectedLeagueID) {
			this.props.showLeagueTable(this.props.selectedLeagueID);
		}		
	}

	componentDidMount() {
		this.props.showLeagueTable(this.props.selectedLeagueID);
	}

	getHomeForm() {
		let returnObj = {};
		this.props.leagueTable.standing.map((team) => {		
			returnObj[team.teamName] = {};
			returnObj[team.teamName]['homeForm'] = team.home;
			returnObj[team.teamName]['crest'] = team.crestURI;
		});

		return returnObj;		
	}

	getAwayForm() {
		let returnObj = {};
		this.props.leagueTable.standing.map((team) => {		
			returnObj[team.teamName] = {};
			returnObj[team.teamName]['awayForm'] = team.away;
			returnObj[team.teamName]['crest'] = team.crestURI;
		});

		return returnObj;		
	}	

	getTeamStatus(position) {

		let teamStatus = [
			{
				'PL': {
					'cl': [1, 2, 3, 4],
					'el': [5],
					'rel': [18, 19, 20]					
				}

			},
			{
				'PD': {
					'cl': [1, 2, 3, 4],
					'el': [5],
					'el-po': [6],
					'rel': [18, 19, 20]
				}			
			},
			{
				'FL1': {
					'cl': [1, 2],
					'cl-po': [3],
					'el': [4],
					'rel-po': [18],
					'rel': [19, 20]
				}				
			},
			{
				'BL1': {
					'cl': [1, 2, 3, 4],
					'el': [5],
					'el-po': [6],
					'rel-po': [16],
					'rel': [17, 18]
				}			
			},
			{
				'SA': {
					'cl': [1, 2, 3, 4],
					'el': [5],
					'el-po': [6],
					'rel': [18, 19, 20]
				}				
			}
											
		];

		let league = teamStatus.filter((league) => league[this.props.leagueCode])
		.map((league) => league[this.props.leagueCode]);

		league = league[0];

		for (let status in league) {
			let positions = league[status];
			if (positions.indexOf(position) > -1) {
				return status;
			}
		}
	}

	render() {

		let isTotalClicked = this.state.isTotalClicked ? 'active' : '';
		let isHomeClicked = this.state.isHomeClicked ? 'active' : '';
		let isAwayClicked = this.state.isAwayClicked ? 'active' : '';

		if (this.props.loading) {
			return 	<LoadingSpinner />
		}

		return (
			<div className='row'>
				<div className='col-xs-12'>
					<div className='row standing-tabs'>
						<div onClick={this.onClickTab} data-value='total' className={`col-md-4 col-sm-4 center-xs standing-tab ${isTotalClicked}`}>Total</div>
						<div onClick={this.onClickTab} data-value='home' className={`col-md-4 col-sm-4 center-xs standing-tab ${isHomeClicked}`}>Home</div>
						<div onClick={this.onClickTab} data-value='away' className={`col-md-4 col-sm-4 center-xs standing-tab ${isAwayClicked}`}>Away</div>
					</div>

					<div className='row table-header'>
						<div className='col-md-1 col-sm-1 center-xs'>#</div>
						<div className='col-md-3 col-sm-3'>Team</div>
						<div className='col-md-1 col-sm-1'>Played</div>
						<div className='col-md-1 col-sm-1'>Won</div>
						<div className='col-md-1 col-sm-1'>Drawn</div>
						<div className='col-md-1 col-sm-1'>Lost</div>
						<div className='col-md-1 col-sm-1'>For</div>
						<div className='col-md-1 col-sm-1'>Against</div>
						<div className='col-md-1 col-sm-1'>GD</div>
						<div className='col-md-1 col-sm-1'>Points</div>
					</div>
					{
						this.props.leagueTable && this.state.isTotalClicked && (
							<ul className='teams-list row'>
								{		
									this.props.leagueTable.standing.map((team, index) => 
										<LeagueTableRow 
										key={index}	
										status={this.getTeamStatus(team.position)}									
										team={team} />)
								}								
							</ul>
						)						
					
					}

					{
						this.props.leagueTable && this.state.isTotalClicked && (
							<Legend leagueCode={this.props.leagueCode} />
						)
					}

					{
						this.props.leagueTable && this.state.isHomeClicked && <HomeForm 
						home={this.getHomeForm()} />						
					}

					{
						this.props.leagueTable && this.state.isAwayClicked && <AwayForm
						away={this.getAwayForm()} />
					}
				</div>
			</div>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return {
		showLeagueTable: function(id) {
			dispatch(getLeagueTable(id));
		}
	}
}

function mapStateToProps(state) {	
	return {	
		leagueTable: state.leagueTableReducer.leagueTable,
		loading: state.leagueTableReducer.loading
	}	
}

export default connect(mapStateToProps, mapDispatchToProps)(LeagueTable);