import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { changeState, logOut } from '../../actions/auth';
import { ScreenSpinner } from '../';
import './Stats.scss';

class Stats extends React.Component {
	constructor(props) {
		super(props);
		this.state = { updated_states: {} };
	}
	updateState(appliance, state_name, new_value) {
		this.setState({
			updated_states: {
				...this.state.updated_states,
				[appliance]: {
					...this.state.updated_states[appliance],
					[state_name]: new_value,
				},
			},
		});
	}
	render() {
		if (this.props.auth.inProgress) {
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
													{typeof appl[
														Object.keys(appl)[0]
													][property] === typeof true
														? appl[
																Object.keys(
																	appl
																)[0]
														  ][property] === false
															? 'No'
															: 'Yes'
														: appl[
																Object.keys(
																	appl
																)[0]
														  ][property]}
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
													style={{
														display: 'flex',
														flexDirection: 'row',
														justifyContent:
															'space-between',
														alignItems: 'center',
													}}
													key={`property-index-${index}`}
												>
													<div>{property}: </div>
													{typeof appl[
														Object.keys(appl)[0]
													][property] ===
													typeof true ? (
														appl[
															Object.keys(appl)[0]
														][property] ===
														false ? (
															<label
																className="switch"
																style={{
																	marginBottom: 0,
																}}
															>
																<input
																	type="checkbox"
																	defaultChecked={
																		false
																	}
																	onChange={(
																		event
																	) =>
																		this.updateState(
																			Object.keys(
																				appl
																			)[0],
																			property,
																			event
																				.target
																				.checked
																		)
																	}
																/>
																<span className="slider round"></span>
															</label>
														) : (
															<label
																className="switch"
																style={{
																	marginBottom: 0,
																}}
															>
																<input
																	type="checkbox"
																	defaultChecked={
																		true
																	}
																	onChange={(
																		event
																	) =>
																		this.updateState(
																			Object.keys(
																				appl
																			)[0],
																			property,
																			event
																				.target
																				.checked
																		)
																	}
																/>
																<span className="slider round"></span>
															</label>
														)
													) : (
														<div className="form-group mb-0">
															<input
																type="range"
																className="form-control-range"
																min={0}
																max={100}
																step={10}
																onChange={(
																	event
																) =>
																	this.updateState(
																		Object.keys(
																			appl
																		)[0],
																		property,
																		event
																			.target
																			.value
																	)
																}
																defaultValue={
																	appl[
																		Object.keys(
																			appl
																		)[0]
																	][property]
																}
																id="formControlRange"
															/>
														</div>
													)}
												</div>
											);
										})}
									</div>
								);
							})}
						</div>
					</div>
				</div>
				<div className="row mt-5">
					<div className="col-md-6 py-3 d-flex justify-content-between intro-box offset-md-6 bg-light">
						<button
							type="button"
							className="btn btn-success"
							onClick={() =>
								this.props.dispatch(
									changeState({
										new_appliance_states: this.state
											.updated_states,
										email: this.props.auth.user.email,
									})
								)
							}
						>
							Update
						</button>
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
