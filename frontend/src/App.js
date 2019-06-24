import React from 'react';
import TopNav from './components/TopNav';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";

import SplitView from './components/SplitView'
import BookDisplay from "./components/BookDisplay";


export default class App extends React.Component {

	Home = () => {
		return (
			<div>
				<TopNav/>
				<BookDisplay/>
			</div>
		)
	};

	Item = () => {
		return (
			<div>
				<TopNav/>
				<SplitView/>
			</div>
		)
	};

	render() {
		return (
			<Router>
				<Route exact path="/" component={this.Home}/>
				<Route path="/:title/:id" component={this.Item}/>
			</Router>
		)
	}
}