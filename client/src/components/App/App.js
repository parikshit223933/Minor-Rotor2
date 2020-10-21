import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.scss';
import { Home, RestrictedRoute, SelectAppliances } from '../index';
import { Stats, PrivaterRoute } from '../';

class App extends React.Component {
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

export default App;
