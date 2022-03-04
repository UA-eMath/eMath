import React from "react";
import { Navbar, NavDropdown, Nav } from "react-bootstrap";
import "./index.css";
import { Avatar } from "antd";
import Control from "./Controls";
import logo from "../../static/img/eMathLogo.png";
import background from "../../static/img/wallTexture.jpeg";
import { signOut } from "../../utils/signout";
import { getAvatarSource } from "../../utils/getAvatar";

export default class TopNav extends React.Component {
  render() {
    const name = localStorage.getItem("name");
    const userType = localStorage.getItem("type");

    if (this.props.match) {
      return <Control props={this.props.match} />;
    } else {
      return (
        <Navbar background={background} variant="light" sticky="top">
          <Navbar.Brand href="/">
            <img
              src={logo}
              width="160"
              height="40"
              className="d-inline-block align-top"
              alt="eMath logo"
            />
          </Navbar.Brand>
          <Navbar.Collapse id="navbar-dark-example">
            <Nav className="ml-auto">
              <NavDropdown
                alignRight
                id="nav-dropdown-dark-example"
                title={
                  <span>
                    <Avatar src={getAvatarSource(name)} />
                    <span
                      style={{
                        fontWeight: "bold",
                        margin: "0 16px",
                        color: "black",
                      }}
                    >
                      {name}
                    </span>
                  </span>
                }
                menuVariant="dark"
              >
                <NavDropdown.ItemText>{userType}</NavDropdown.ItemText>
                <NavDropdown.Item
                  as="button"
                  onClick={signOut}
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
