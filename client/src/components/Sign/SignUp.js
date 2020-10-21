import React from 'react';
import './SignUp.scss';
import { ButtonSpinner } from '../';
import { Link } from 'react-router-dom';
import chalk from 'chalk';
import { signUp } from '../../actions/auth';
import { connect } from 'react-redux';

class SignUp extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			emal: '',
			password: '',
			confirmPassword: '',
		};
	}
	handleOnChange = (param, value) => {
		this.setState({
			[param]: value,
		});
	};
	handleOnSubmit = () => {
		if (
			!this.state.password ||
			!this.state.confirmPassword ||
			!this.state.name ||
			!this.state.email
		) {
			console.log(chalk.redBright.bold('Please fill in all the fields!'));
			return;
		}
		if (this.state.confirmPassword !== this.state.password) {
			console.log(chalk.redBright.bold('passwords do not match!'));
			return;
		}
		this.props.dispatch(
			signUp(
				this.state.name,
				this.state.email,
				this.state.password,
				this.state.confirmPassword
			)
		);
	};
	render() {
		return (
			<div className="sign-up">
				<div className="sign-up-text font-25 pb-4 google-font">
					Sign Up
				</div>
				<form>
					{' '}
					<div className="form-group">
						<label htmlFor="name">Name</label>
						<input
							type="text"
							className="form-control"
							id="name"
							aria-describedby="name"
							onChange={(event) =>
								this.handleOnChange('name', event.target.value)
							}
						/>
					</div>
					<div className="form-group">
						<label htmlFor="email-address">Email address</label>
						<input
							type="email"
							className="form-control"
							id="email-address"
							aria-describedby="email"
							onChange={(event) =>
								this.handleOnChange('email', event.target.value)
							}
						/>
					</div>
					<div className="row">
						<div className="form-group col-lg-6">
							<label htmlFor="password">Password</label>
							<input
								type="password"
								className="form-control"
								id="password"
								onChange={(event) =>
									this.handleOnChange(
										'password',
										event.target.value
									)
								}
							/>
						</div>
						<div className="form-group col-lg-6">
							<label htmlFor="confirm-password">
								Confirm Password
							</label>
							<input
								type="password"
								className="form-control"
								id="confirm-password"
								onChange={(event) =>
									this.handleOnChange(
										'confirmPassword',
										event.target.value
									)
								}
							/>
						</div>
					</div>
					<div className="form-group mt-3">
						<button
							onClick={this.handleOnSubmit}
							type="button"
							className="btn inline btn-primary"
						>
							Submit
							{this.props.auth.inProgress && (
								<span>&nbsp;&nbsp;</span>
							)}
							{this.props.auth.inProgress && <ButtonSpinner />}
						</button>
						<Link
							to="/"
							type="button"
							className="btn inline btn-secondary ml-4"
						>
							Back
						</Link>
					</div>
				</form>
			</div>
		);
	}
}
const mapStateToProps = ({ ...state }) => {
	return {
		auth: state.auth,
	};
};
export default connect(mapStateToProps)(SignUp);
