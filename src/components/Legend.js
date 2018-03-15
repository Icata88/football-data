import React from 'react';

let Legend = (props) => {
	let league = props.leagueCode[0];
	return (
		<div className='row'>
			<div className='col-xs-12 legend'>
				<div className='row middle-xs'>
					<div className='indicator indicator--cl col-md-1 col-sm-1'></div>
					<div className='col-md-11 col-sm-11 text'>Champions League</div>
				</div>
				
				{
					league === 'FL1' && (
						<div className='row middle-xs'>
							<div className='indicator indicator--cl-po col-md-1 col-sm-1'></div>
							<div className='col-md-11 col-sm-11 text'>Champions League qualification</div>	
						</div>
					)
				}


				<div className='row middle-xs'>
					<div className='indicator indicator--el col-md-1 col-sm-1'></div>
					<div className='col-md-11 col-sm-11 text'>Europa League</div>
				</div>

				{
					(league === 'PD' || league === 'BL1' || league === 'SA') && (
						<div className='row middle-xs'>
							<div className='indicator indicator--el-po col-md-1 col-sm-1'></div>
							<div className='col-md-11 col-sm-11 text'>Europa League qualification</div>	
						</div>
					)
				}


				<div className='row middle-xs'>
					<div className='indicator indicator--rel col-md-1 col-sm-1'></div>
					<div className='col-md-11 col-sm-11 text'>Relegation</div>	
				</div>

				{
					(league === 'BL1' || league === 'FL1') && (
						<div className='row middle-xs'>
							<div className='indicator indicator--rel-po col-md-1 col-sm-1'></div>
							<div className='col-md-11 col-sm-11 text'>Relegation play-off</div>																									
						</div>
					)
				}

			</div>
		</div>
	);
}

export default Legend;