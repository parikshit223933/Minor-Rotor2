import React from 'react';
import './home.scss';
import bulb from '../../assets/svgs/undraw_lightbulb_moment_evxr.svg';

class Home extends React.Component {
	render() {
		return (
			<div className="home-component pt-5 container">
				<div className="row bg-white intro-box">
					<div className="col-md-6 p-5">
						<img src={bulb} alt="home" width="100%" />
					</div>
					<div className="col-md-6 p-5">
						<div className="text-center">
							<p className="font-30">Welcome to...</p>
						</div>
						<div className="text-center site-logo font-40 mb-5">
							AUTOMATE
						</div>
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
					</div>
				</div>
			</div>
		);
	}
}

export default Home;
