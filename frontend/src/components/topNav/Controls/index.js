import React from "react";
import "antd/dist/antd.css";
import { Navbar, Nav } from "react-bootstrap";

import MenuDrawer from "./MenuDrawer";
import SubordinateDrawer from "./SubordinateDrawer";
import { Icon, Tooltip } from "antd";

const styles = {
  logoDiv: {
    width: "100%",
    height: "100%",
  },
  logoText: {
    fontSize: "25px",
    color: "white",
    textDecoration: "none",
  },
};

export default class Controls extends React.Component {
  render() {
    return (
      <Navbar bg="dark" variant="dark">
        <SubordinateDrawer className="mr-auto" />
        <Nav style={styles.logoDiv}>
          <div style={{ margin: "auto" }}>
            <Tooltip placement="bottom" title="Home">
              <Icon type="home" style={{ fontSize: "1.8em", color: "white" }} />
              <a style={styles.logoText} href="/">
                {" "}
                eMath :{" "}
              </a>
            </Tooltip>
            <span style={styles.logoText}>
              {" "}
              {this.props.props.params.title}
            </span>
          </div>
        </Nav>
        <MenuDrawer className="ml-auto" props={this.props.props} />
      </Navbar>
    );
  }
}
