import React from "react";
import { connect } from "react-redux";
import { message } from "antd";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import background from "./static/img/wallTexture.jpeg";
import AuthorRoute from "./components/authorRoute";
import UnauthenticatedRoute from "./components/unauthenticatedRoute";
import StudentRoute from "./components/studentRoute";
import TesterRoute from "./components/testerRoute";
import TARoute from "./components/taRoute";
import { login } from "./actions";
import NotFound from "./components/NotFound";
import { signOut } from "./utils/signout";
import { Bibliography } from "./components/Bibliography";

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.authentication.isAuthenticated,
    username: state.authentication.username,
    userType: state.authentication.userType,
    access: state.authentication.access,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onAuthentication: (username, userType, access) =>
    dispatch(login(username, userType, access)),
});

class App extends React.Component {
  componentDidMount() {
    const token = localStorage.getItem("token");
    if (token && jwt_decode(token).exp < Date.now() / 1000) {
      signOut();
    } else if (token) {
      this.props.onAuthentication(
        localStorage.getItem("username"),
        localStorage.getItem("type"),
        JSON.parse(localStorage.getItem("access"))
      );
    }
    // global message config
    message.config({
      top: 80,
      duration: 2,
      maxCount: 3,
    });
  }

  switchAccountType = (type) => {
    switch (type) {
      case "Author":
        return <AuthorRoute {...this.props} />;
      case "Student":
        return <StudentRoute {...this.props} />;
      case "Tester":
        return <TesterRoute {...this.props} />;
      case "TA":
        return <TARoute {...this.props} />;
      default:
        return <div></div>;
    }
  };

  render() {
    const { isAuthenticated, userType } = this.props;

    let page = isAuthenticated ? (
      <div>{this.switchAccountType(userType)}</div>
    ) : (
      <UnauthenticatedRoute />
    );

    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
        }}
      >
        <Router>
          <Switch>
            <Route path="/citation" component={() => <Bibliography />} />
            {page}
            <Route component={NotFound} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
