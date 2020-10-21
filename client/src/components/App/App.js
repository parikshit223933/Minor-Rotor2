import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import './App.scss';
import { Home, RestrictedRoute, SelectAppliances } from '../index';
import { Stats, PrivaterRoute } from '../';
import jwt_decode from "jwt-decode";
import { connect } from 'react-redux';
import { authenticateUser } from '../../actions/auth';

class App extends React.Component {
	componentDidMount()
	{
		const token=localStorage.getItem('token');
		if(token)
		{
			const {email, name, _id} = jwt_decode(token);
			this.props.dispatch(authenticateUser(email, name, _id));
		}
	}
	render() {
		return (
			<div className="App">
				<Router>
					<Switch>
						<PrivaterRoute exact path="/select-appliances" component={SelectAppliances} />
						<PrivaterRoute exact path="/stats" component={Stats} />
						<RestrictedRoute path="/" component={Home} />
					</Switch>
				</Router>
			</div>
		);
	}
}
const mapStateToProps=({...state})=>
{
	return{
		auth:state.auth
	}
}
export default connect(mapStateToProps)(App);
