import React from 'react';
import TopNav from './components/topNav';
import {BrowserRouter as Router, Route} from "react-router-dom";
import SplitView from './components/splitView'
import BookDisplay from "./components/bookDisplay";
import AuthoringLayout from './components/authoringLayout'
import SetupPage from "./components/setupPage"
import Footer from './components/footer';

export default class App extends React.Component {

	Home = () => {
		return (
			<div>
				<TopNav/>
				<BookDisplay/>
				<Footer/>
			</div>
		)
	};


	render() {
		return (
			<Router>
				<Route exact path="/" component={this.Home}/>
				<Route path="/view/:title/:id" render={(props) => (
					<div>
						<TopNav {...this.props} {...props}/>
						<SplitView {...this.props} {...props} />
					</div>
				)}/>
				<Route path='/authoring/:id/' render={(props) => (
					<AuthoringLayout {...this.props} {...props}/>
				)}/>

				<Route path='/setup/:id/' render={(props) => (
					<SetupPage {...this.props} {...props}/>
				)}/>
			</Router>
		)
	}
}