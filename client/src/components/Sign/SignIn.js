import React from 'react';
import './SignIn.scss';
import {ButtonSpinner} from '../';

class SignIn extends React.Component {
	render() {
		return (
			<div className="sign-in">
				<div className="sign-in-text font-25 pb-4 google-font">
					Sign In
				</div>
				<form>
					<div class="form-group">
						<label htmlFor="email-address">Email address</label>
						<input
							type="email"
							class="form-control"
							id="email-address"
							aria-describedby="email"
						/>
					</div>
					<div class="form-group">
						<label htmlFor="password">Password</label>
						<input
							type="password"
							class="form-control"
							id="password"
						/>
					</div>

					<button type="submit" class="btn btn-primary">
						Submit&nbsp;&nbsp;<ButtonSpinner/>
					</button>
				</form>
			</div>
		);
	}
}
export default SignIn;
