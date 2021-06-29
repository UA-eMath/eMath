import React from "react";
import { Route } from "react-router-dom";
import TopNav from "../topNav";
import SplitView from "../splitView";
import AuthoringLayout from "../authoringLayout";
import SetupPage from "../setupPage";

// TA can modify a specific book, and also read it.

export default class TARoute extends React.Component {
  render() {
    return (
      <>
        <Route
          path="/view/:title/:id"
          render={(props) => (
            <div>
              <TopNav {...this.props} {...props} />
              <SplitView {...this.props} {...props} />
            </div>
          )}
        />
        <Route
          path="/authoring/:id/"
          render={(props) => (
            <div>
              <TopNav />
              <AuthoringLayout {...this.props} {...props} />
            </div>
          )}
        />

        <Route
          path="/setup/:id/"
          render={(props) => (
            <div>
              <TopNav />
              <SetupPage {...this.props} {...props} />
            </div>
          )}
        />
      </>
    );
  }
}
