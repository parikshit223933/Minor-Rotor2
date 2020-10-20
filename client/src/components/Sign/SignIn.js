import React from 'react';
import './SignIn.scss';
import { ButtonSpinner } from '../';
import { Link } from 'react-router-dom';
import { login } from '../../actions/auth';
import chalk from 'chalk';
import { connect } from 'react-redux';

class SignIn extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
		};
	}
	handleOnChange = (param, newState) => {
		this.setState({
			[param]: newState,
		});
	};
	onSubmit = () => {
		if (!this.state.email || !this.state.password) {
			console.log(chalk.redBright.bold('You cant submit it dude!'));
			return;
		}
		this.props.dispatch(login(this.state.email, this.state.password));
	};
	render() {
		return (
			<div className="sign-in">
				<div className="sign-in-text font-25 pb-4 google-font">
					Sign In
				</div>
				<form>
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
					<div className="form-group">
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

					<div className="form-group mt-4">
						<button
							onClick={this.onSubmit}
							type="button"
							className="btn inline btn-primary"
						>
							Submit
							{this.props.auth.inProgress && <span>&nbsp;&nbsp;</span>}
							{this.props.auth.inProgress && (
								<ButtonSpinner />
							)}
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
export default connect(mapStateToProps)(SignIn);
