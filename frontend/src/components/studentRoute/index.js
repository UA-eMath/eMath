import React from "react";
import { Route } from "react-router-dom";
import TopNav from "../topNav";
import SplitView from "../splitView";

// Student can read all matured books.

export default class StudentRoute extends React.Component {
  render() {
    return (
      <Route
        path="/view/:title/:id"
        render={(props) => (
          <div>
            <TopNav {...this.props} {...props} />
            <SplitView {...this.props} {...props} />
          </div>
        )}
      />
    );
  }
}
