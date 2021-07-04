import React from "react";
import { Route } from "react-router-dom";
import LoginComp from "./LoginComp";
import Signup from "./Signup";

export default class UnauthenticatedRoute extends React.Component {
  render() {
    return (
      <>
        <Route exact path="/" component={() => <LoginComp />} />
        <Route path="/signup" render={(props) => <Signup />} />
      </>
    );
  }
}
