import React from "react";
import TopNav from "./components/topNav";
import { Layout, message } from "antd";
import { BrowserRouter as Router, Route } from "react-router-dom";
import SplitView from "./components/splitView";
import BookDisplay from "./components/bookDisplay";
import AuthoringLayout from "./components/authoringLayout";
import SetupPage from "./components/setupPage";
import LoginComp from "./components/LoginComp";
import Signup from "./components/Signup";
import jwt_decode from "jwt-decode";

const { Content } = Layout;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: localStorage.getItem("token") ? true : false,
      username: localStorage.getItem("username"),
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

  Home = () => {
    return (
      <div>
        <TopNav />
        <BookDisplay />
      </div>
    );
  };

  logout = () => {
    localStorage.clear();
    this.setState({ loggedIn: null, username: "" });
    window.location.href = "/";
  };

  render() {
    const { loggedIn } = this.state;

    let page = loggedIn ? (
      <div>
        <Route exact path="/" component={this.Home} />
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
          render={(props) => <AuthoringLayout {...this.props} {...props} />}
        />

        <Route
          path="/setup/:id/"
          render={(props) => <SetupPage {...this.props} {...props} />}
        />
      </div>
    ) : (
      <div>
        <Route exact path="/" component={() => <LoginComp />} />
        <Route path="/signup" render={(props) => <Signup />} />
      </div>
    );
    return (
      <Layout className="layout">
        <Content>
          <Router>{page}</Router>
        </Content>
        {/* <Footer style={{ textAlign: "center" }}>
          eMath ©2020 Created by University of Alberta
        </Footer> */}
      </Layout>
    );
  }
}
