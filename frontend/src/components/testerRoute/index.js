import React from "react";
import { Route } from "react-router-dom";
import TopNav from "../topNav";
import SplitView from "../splitView";
import BookDisplay from "../bookDisplay";

// Tester can read a specific developing book.

export default class TesterRoute extends React.Component {
  render() {
    return (
      <>
        <Route
          exact
          path="/"
          component={() => (
            <div>
              <TopNav />
              <BookDisplay type={this.props.userType} {...this.props} />
            </div>
          )}
        />
        <Route
          path="/view/:title/:id"
          render={(props) => (
            <div>
              <TopNav {...this.props} {...props} />
              <SplitView {...this.props} {...props} />
            </div>
          )}
        />
      </>
    );
  }
}
