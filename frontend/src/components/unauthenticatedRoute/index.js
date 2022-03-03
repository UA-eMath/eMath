import React from "react";
import { Route } from "react-router-dom";
import { GoogleAuthentication } from "./GoogleAuthentication";
import { LoginComp } from "./LoginComp";
import Signup from "./Signup";

export default class UnauthenticatedRoute extends React.Component {
  render() {
    return (
      <>
        <Route exact path="/" component={() => <GoogleAuthentication />} />
        <Route path="/author" component={() => <LoginComp />} />
        <Route path="/signup" render={(props) => <Signup />} />
      </>
    );
  }
}
