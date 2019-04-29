import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Container from 'react-bootstrap/Container';

import Header from './components/layout/Header';
import Boards from './components/page/Boards' ;
import Lists from './components/page/Lists' ;
import Cards from './components/page/Cards' ;

function App() {
	return (
		<Router>
			<div className="App">
				<Header />
				<br />
				<Container>
					<Route exact path="/" component={Boards} />
					<Route exact path="/boards" component={Boards} />
					<Route exact path="/lists/:boardId" component={Lists} />
					<Route exact path="/cards/:listId" component={Cards} />
				</Container>
			</div>
		</Router>
	);
}

export default App;
