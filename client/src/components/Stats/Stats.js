import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { logOut } from '../../actions/auth';
import { ScreenSpinner } from '../';
import './Stats.scss';

class Stats extends React.Component {
	render() {
		if (
			this.props.auth.inProgress
		) {
			return <ScreenSpinner />;
		}
		
		if (!this.props.auth.isLoggedIn) {
			return <Redirect to="/sign-in" />;
		}
		return (
			<div className="stats-component pt-5 container">
				<div className="row bg-white intro-box">
					<div className="col-md-6 p-5">
						<div className="font-30 text-center status-headings mb-4">
							Current Status
						</div>
						<div className="status-container">
							{this.props.auth.appliances.map((appl, index) => {
								return (
									<div
										className="appliance my-3"
										key={`appliance-index-${index}`}
									>
										<div className="mb-3">
											<b>{Object.keys(appl)[0]}</b>
										</div>
										{Object.keys(
											appl[Object.keys(appl)[0]]
										).map((property, index) => {
											return (
												<div
													className="pl-3"
													key={`property-index-${index}`}
												>
													{property}:{' '}
													{
														appl[
															Object.keys(appl)[0]
														][property]
													}
												</div>
											);
										})}
									</div>
								);
							})}
						</div>
					</div>
					<div className="col-md-6 p-5">
						<div className="font-30 text-center status-headings mb-4">
							Update Status
						</div>
						<div></div>
					</div>
				</div>
				<div className="row mt-5">
					<div className="col-md-6 py-3 text-right intro-box offset-md-6 bg-light">
						<button
							type="button"
							className="btn btn-danger"
							onClick={() => this.props.dispatch(logOut())}
						>
							Log Out
						</button>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = ({ ...state }) => {
	return {
		auth: state.auth,
	};
};

export default connect(mapStateToProps)(Stats);
