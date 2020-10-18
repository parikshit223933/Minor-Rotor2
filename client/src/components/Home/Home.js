import React from 'react';
import './home.scss';
import bulb from '../../assets/svgs/undraw_lightbulb_moment_evxr.svg';
import { Auth, SignIn, SignUp } from '../';
import { BrowserRouter as Router, Route } from 'react-router-dom';
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
						<Router>
							<Route exact path="/sign-in" component={SignIn} />
							<Route exact path="/sign-up" component={SignUp} />
							<Route exact path="/" component={Auth} />
						</Router>
					</div>
				</div>
			</div>
		);
	}
}

export default Home;
