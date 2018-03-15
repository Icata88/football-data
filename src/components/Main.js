import React, { Component } from 'react';
import { connect } from 'react-redux';
import getCompetitions from './../actions/getCompetitions';
import bannerLogo from './../images/banner.jpg'; 
import Competition from './Competition';
import LeagueTable from './LeagueTable';

class Main extends Component {
	constructor(props) {
		super(props);

		this.state = {
			leagueCodes: ['PL', 'PD', 'SA', 'BL1', 'FL1'],
			year: '2017',
			selectedLeagueID: 0,
			leagueList: []
		}

		this.onTabClick = this.onTabClick.bind(this);
	}

	componentDidMount() {
		this.props.showCompetitions(this.state.year);
	}

	componentDidUpdate(prevProps, prevState) {

		if (prevState.leagueList.length === 0) {
			this.setState({leagueList: this.props.competitions.filter((competition) => this.state.leagueCodes.indexOf(competition.league) > -1)});

			let defaultSelectedLeague = this.props.competitions.filter((competition) => competition.league === 'PL');

			this.setState({selectedLeagueID: defaultSelectedLeague[0].id});
		}
	}

	onTabClick(id) {
		this.setState({selectedLeagueID: id});
	}

	render() {
		let bgImage = {
			backgroundImage: 'url(' + bannerLogo + ')'
		}
		return (
			<div>
				<div style={bgImage} className='row banner'></div>

				<div className='row'>
					<h1 className='col-xs-12 striked'>
						<span>Statistics and standings of the top 5 football leagues for season {this.state.year}/{parseInt(this.state.year)+1}</span>
					</h1>
					<h3 className='col-xs-12 center-xs'>
						<span>The information below is gathered from football-data.org and represents standings and statistics of the top 5 football leagues in Europe for season {this.state.year}/{parseInt(this.state.year)+1}</span>
					</h3>
				</div>

				<ul className='competitions row center-xs'>
					{this.state.leagueList.length > 0 ? this.state.leagueList.map((competition) => <Competition
					key={competition.id} 
					clickHandler={() => this.onTabClick(competition.id)} 
					selected={competition.id === this.state.selectedLeagueID} 
					leagueCode={competition.league}
					title={competition.caption} />) : null}
				</ul>
				{this.state.selectedLeagueID > 0 ? <LeagueTable 
					leagueCode={this.state.leagueList.filter((competition) => competition.id === this.state.selectedLeagueID).map((competition) => competition.league)}
					selectedLeagueID={this.state.selectedLeagueID}/> : null}
			</div>
		);

	}

}


function mapDispatchToProps(dispatch) {
	return {
		showCompetitions: function(year) {
			dispatch(getCompetitions(year));
		}
	}
}

function mapStateToProps(state) {	

	return {
		competitions: state.competitionsReducer.competitions	
	}	
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);