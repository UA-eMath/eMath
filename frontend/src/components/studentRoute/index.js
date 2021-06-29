import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import TopNav from "../topNav";
import BookDisplay from "../bookDisplay";
import SplitView from "../splitView";

// Student can read all matured books.

export default class StudentRoute extends React.Component {
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
                <BookDisplay type={this.props.userType} />
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
