import React from 'react';
import TopNav from './layouts/TopNav';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import SplitView from './layouts/SplitView'
import Footer from './layouts/Footer'
import BookDisplay from "./layouts/BookDisplay";


export default class App extends React.Component{

    Home = () =>{
        return(
            <div>
                <TopNav/>
                <BookDisplay/>
                {/*<Footer/>*/}
            </div>
        )
    };

    Item = () => {
        return(
            <div>
                <TopNav/>
                {/*<SplitView/>*/}
            </div>
        )
    };

    render(){
        return(
            <Router>
                    <Route exact path="/" component={this.Home}/>
                    <Route path = "/:title/:id" component={this.Item}/>
            </Router>
        )
    }
}