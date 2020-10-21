import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.scss';
import { Home, SelectAppliances } from '../index';
import { Stats, PrivaterRoute } from '../';

class App extends React.Component {
	render() {
		return (
			<div className="App">
				<Router>
					<Switch>
						<PrivaterRoute exact path="/select-appliances" component={SelectAppliances} />
						<PrivaterRoute exact path="/stats" component={Stats} />
						<Route path="/" component={Home} />
					</Switch>
				</Router>
			</div>
		);
	}
}

export default App;
