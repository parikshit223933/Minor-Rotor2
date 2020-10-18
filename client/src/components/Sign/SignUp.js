import React from 'react';
import './SignUp.scss';
import { ButtonSpinner } from '../';
import { Link } from 'react-router-dom';

class SignUp extends React.Component {
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
						/>
					</div>
					<div className="form-group">
						<label htmlFor="email-address">Email address</label>
						<input
							type="email"
							className="form-control"
							id="email-address"
							aria-describedby="email"
						/>
					</div>
					<div className="row">
						<div className="form-group col-lg-6">
							<label htmlFor="password">Password</label>
							<input
								type="password"
								className="form-control"
								id="password"
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
							/>
						</div>
					</div>
					<div className="form-group mt-3">
						<button type="button" className="btn inline btn-primary">
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
export default SignUp;
