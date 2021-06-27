import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import TopNav from "../topNav";
import BookDisplay from "../bookDisplay";
import SplitView from "../splitView";

// Tester can read a specific developing book.

export default class TesterRoute extends React.Component {
  render() {
    return (
      <div>
        <Route
          exact
          path="/"
          render={() => {
            return (
              <div>
                <TopNav />
                <BookDisplay type={this.props.type} />
                {/* only display books that the user is allowed to see */}
              </div>
            );
          }}
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
      </div>
    );
  }
}
