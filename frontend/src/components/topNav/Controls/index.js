import React from "react";
import "antd/dist/antd.css";
import { Navbar, Nav } from "react-bootstrap";

import MenuDrawer from "./MenuDrawer";
import SubordinateDrawer from "./SubordinateDrawer";
import { Tooltip } from "antd";
import logo from "../../../static/img/eMathLogo.png";

const styles = {
  logoText: {
    fontSize: "25px",
    color: "black",
  },
};

export default class Controls extends React.Component {
  render() {
    return (
      <Navbar bg="light" variant="light" sticky="top">
        <SubordinateDrawer className="mr-auto" />
        <Nav className="m-auto">
          <div style={{ display: "flex", alignItems: "center" }}>
            <Tooltip placement="bottom" title="home">
              <a href="/">
                <img
                  src={logo}
                  width="160"
                  height="60"
                  className="d-inline-block align-top"
                  alt="eMath logo"
                  href="/"
                />
              </a>
            </Tooltip>
            <span style={styles.logoText}>{this.props.props.params.title}</span>
          </div>
        </Nav>
        <MenuDrawer className="ml-auto" props={this.props.props} />
      </Navbar>
    );
  }
}
