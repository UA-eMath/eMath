import React from "react";
import { Navbar } from "react-bootstrap";
import "./index.css";
import "antd/dist/antd.css";
import { Avatar } from "antd";
import Control from "./Controls";
import { generateRandomAvatar } from "../../utils/generateRandomAvatar";

export default class TopNav extends React.Component {
  render() {
    const username = localStorage.getItem("username");
    if (this.props.match) {
      return <Control props={this.props.match} />;
    } else {
      return (
        <Navbar bg="dark" variant="dark" sticky="top">
          <Navbar.Brand href="/">eMath</Navbar.Brand>
          <span style={{ position: "fixed", right: 24 }}>
            <Avatar src={generateRandomAvatar(username)} />
            <span
              style={{ fontWeight: "bold", marginLeft: "16px", color: "white" }}
            >
              {username}
            </span>
          </span>
        </Navbar>
      );
    }
  }
}
