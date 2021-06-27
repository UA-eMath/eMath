import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import LoginComp from "./LoginComp";
import Signup from "./Signup";

export default class UnauthenticatedRoute extends React.Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={() => <LoginComp />} />
        <Route path="/signup" render={(props) => <Signup />} />
      </div>
    );
  }
}
