import React from 'react';
import TopNav from './layouts/TopNav';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";

import SplitView from './layouts/SplitView'
import BookDisplay from "./layouts/BookDisplay";


export default class App extends React.Component {

	Home = () => {
		return (
			<div>
				<TopNav/>
				<BookDisplay/>
				{/*<PageBar/>*/}
			</div>
		)
	};

	Item = () => {
		return (

			<div>
				<TopNav/>
				<SplitView/>
				{/*<PageBar/>*/}
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