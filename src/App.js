// import logo from './logo.svg';
// import './App.css';

import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Show from './components/Show';
import Client from './components/Client';

function App() {
	return (
		<Router>
			<>
				<Switch>
					<Route path='/hotels/:id' component={Show} />
					<Route path='/hotels' component={Client} />
				</Switch>
			</>
		</Router>
	);
}

export default App;
