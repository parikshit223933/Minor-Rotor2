import React from 'react';
import { Link } from 'react-router-dom';
import './Auth.scss';

class Auth extends React.Component {
	render() {
		return (
			<div className="authentication-area p-3 mb-4">
				<div className="sign-up">
					<Link
						to="/sign-up"
						type="button"
						className="btn btn-lg my-4 w-100 btn-primary"
					>
						Sign Up
					</Link>
				</div>
				<div className="sign-in">
					<Link
						to="/sign-in"
						type="button"
						className="btn btn-lg my-4 w-100 btn-primary"
					>
						Sign In
					</Link>
				</div>
			</div>
		);
	}
}
export default Auth;
