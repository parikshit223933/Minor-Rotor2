import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { logOut } from '../../actions/auth';
import { ScreenSpinner } from '../';
import './Stats.scss';

class Stats extends React.Component {
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
																/>
																<span className="slider round"></span>
															</label>
														)
													) : (
														<div class="form-group mb-0">
															<input
																type="range"
																class="form-control-range"
																min={0}
																max={100}
																step={10}
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
							onClick={() => this.props.dispatch(logOut())}
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
