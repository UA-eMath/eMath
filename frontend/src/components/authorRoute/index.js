import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import TopNav from "../topNav";
import BookDisplay from "../bookDisplay";
import SplitView from "../splitView";
import AuthoringLayout from "../authoringLayout";
import SetupPage from "../setupPage";

// Author can create book, edit book, and read book.

export default class AuthorRoute extends React.Component {
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
      </div>
    );
  }
}
