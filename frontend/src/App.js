import React from 'react';
import TopNav from './components/TopNav';
import {BrowserRouter as Router, Route} from "react-router-dom";

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


	render() {
		return (
			<Router>
				<Route exact path="/" component={this.Home}/>
				<Route path="/:title/:id" render={(props) => (
					<div  >
						<TopNav {...this.props} {...props}/>
						<SplitView {...this.props} {...props} />
					</div>
				)}/>
			</Router>
		)
	}
}