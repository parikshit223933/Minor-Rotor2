import React from 'react';
import './Stats.scss';

class Stats extends React.Component {
	render() {
		return (
			<div className="stats-component pt-5 container">
				<div className="row bg-white intro-box">
					<div className="col-md-6 p-5">
						<div className="font-30 text-center status-headings mb-4">
							Current Status
						</div>
						<div className="status-container">
							<div className="appliance my-3">
								<div className="mb-3"><b>BULB</b></div>
                <div className="pl-3">isTurnedOn: true</div>
                <div className="pl-3">Intensity: 50%</div>
							</div>
              <div className="appliance">
								<div className="mb-3"><b>BULB</b></div>
                <div className="pl-3">isTurnedOn: true</div>
                <div className="pl-3">Intensity: 50%</div>
							</div>
						</div>
					</div>
					<div className="col-md-6 p-5">
						<div className="font-30 text-center status-headings mb-4">
							Update Status
						</div>
						<div></div>
					</div>
				</div>
			</div>
		);
	}
}

export default Stats;
