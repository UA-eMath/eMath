import React from "react";
import { message } from "antd";
import { BrowserRouter as Router, Route } from "react-router-dom";
import jwt_decode from "jwt-decode";
import background from "./static/img/paper_white.jpg";
import AuthorRoute from "./components/authorRoute";
import UnauthenticatedRoute from "./components/unauthenticatedRoute";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: localStorage.getItem("token") ? true : false,
      username: localStorage.getItem("username"),
      accountType: localStorage.getItem("type"),
    };
  }

  componentDidMount() {
    const token = localStorage.getItem("token");
    if (token && jwt_decode(token).exp < Date.now() / 1000) {
      this.logout();
    }
    // global message config
    message.config({
      top: 80,
      duration: 2,
      maxCount: 3,
    });
  }

  logout = () => {
    localStorage.clear();
    this.setState({ loggedIn: null, username: "", type: "" });
    window.location.href = "/";
  };

  switchAccountType = (type) => {
    switch (type) {
      case "Author":
        return <AuthorRoute {...this.props} />;
      default:
        return <div></div>;
    }
  };

  render() {
    const { loggedIn, accountType } = this.state;

    let page = loggedIn ? (
      <div>{this.switchAccountType(accountType)}</div>
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
        <Router>{page}</Router>
      </div>
    );
  }
}
