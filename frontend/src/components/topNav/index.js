import React from "react";
import { Navbar, NavDropdown, Nav } from "react-bootstrap";
import "./index.css";
import "antd/dist/antd.css";
import { Avatar } from "antd";
import Control from "./Controls";
import { generateRandomAvatar } from "../../utils/generateRandomAvatar";

export default class TopNav extends React.Component {
  logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  render() {
    const username = localStorage.getItem("username");
    const userType = localStorage.getItem("type");

    if (this.props.match) {
      return <Control props={this.props.match} />;
    } else {
      return (
        <Navbar bg="dark" variant="dark" sticky="top">
          <Navbar.Brand href="/">eMath</Navbar.Brand>
          <Navbar.Collapse id="navbar-dark-example">
            <Nav className="ml-auto">
              <NavDropdown
                alignRight
                id="nav-dropdown-dark-example"
                title={
                  <span>
                    <Avatar src={generateRandomAvatar(username)} />
                    <span
                      style={{
                        fontWeight: "bold",
                        marginLeft: "16px",
                        color: "white",
                      }}
                    >
                      {username}
                    </span>
                  </span>
                }
                menuVariant="dark"
              >
                <NavDropdown.ItemText>{userType}</NavDropdown.ItemText>
                <NavDropdown.Item
                  as="button"
                  onClick={this.logout}
                  style={{ color: "red" }}
                >
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      );
    }
  }
}
