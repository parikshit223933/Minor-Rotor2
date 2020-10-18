import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.scss';
import { Home, SelectAppliances } from '../index';

class App extends React.Component {
	render() {
		return (
			<div className="App">
				<Router>
					<Switch>
						<Route exact path="/" component={Home} />
						<Route path="/select-appliances" component={SelectAppliances} />
					</Switch>
				</Router>
			</div>
		);
	}
}

export default App;
