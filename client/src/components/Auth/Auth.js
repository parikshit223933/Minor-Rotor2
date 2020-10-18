import React from 'react';
import './Auth.scss';

class Auth extends React.Component {
	render() {
		return (
			<div className="authentication-area p-3 mb-4">
				<div className="sign-up">
					<button
						type="button"
						class="btn btn-lg my-4 w-100 btn-primary"
					>
						Sign Up
					</button>
				</div>
				<div className="sign-in">
					<button
						type="button"
						class="btn btn-lg my-4 w-100 btn-primary"
					>
						Sign In
					</button>
				</div>
			</div>
		);
	}
}
export default Auth;
