import React from "react";
import {} from "antd";
import LoginForm from "./loginForm";

export default class LoginComp extends React.Component {
  render() {
    return (
      <div className="login-form">
        <h1>eMath</h1>
        <LoginForm />
      </div>
    );
  }
}
