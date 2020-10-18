import React from 'react';
import './SignIn.scss';
import { ButtonSpinner } from '../';
import { Link } from 'react-router-dom';

class SignIn extends React.Component {
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
						/>
					</div>
					<div className="form-group">
						<label htmlFor="password">Password</label>
						<input
							type="password"
							className="form-control"
							id="password"
						/>
					</div>

					<div className="form-group mt-4">
						<button type="submit" className="btn inline btn-primary">
							Submit&nbsp;&nbsp;
							<ButtonSpinner />
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
export default SignIn;
