import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import './App.scss';
import { Home } from '../index';

class App extends React.Component {
	render() {
		return (
			<div className="App">
				<Router>
					<Switch>
						<Route path="/" component={Home} />
					</Switch>
				</Router>
			</div>
		);
	}
}

export default App;
