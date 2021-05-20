import React from "react";
import "antd/dist/antd.css";
import TopNav from "./../../components/topNav";
import LevelEditor from "./../../components/levelEditor";
import ParaEditor from "./../../components/paraEditor";
import SplitPane from "react-split-pane";
import "./index.css";
import MathjaxRenderer from "../MathjaxRenderer";
import { Spin } from "antd";

export default class AuthoringLayout extends React.Component {
  state = {
    paneSize: 700,
    mathLoaded: false,
  };

  changePaneSize = (paneSize) => {
    this.setState({
      paneSize: paneSize,
    });
  };

  onMathLoaded = () => {
    this.setState({
      mathLoaded: true,
    });
  };

  render() {
    const id = this.props.match.params.id;

    const splitPane = this.state.mathLoaded ? (
      <SplitPane split="vertical" minSize={0} size={this.state.paneSize}>
        <div
          style={{
            minHeight: "100vh",
          }}
        >
          <LevelEditor
            bookID={id}
            levelId={id}
            changePaneSize={this.changePaneSize}
          />
        </div>

        <div
          style={{
            background: "#aaaa00",
            minHeight: "100vh",
          }}
        >
          <ParaEditor bookID={id} />
        </div>
      </SplitPane>
    ) : (
      <Spin
        tip="Waiting for MathJax..."
        style={{
          width: "100%",
          marginTop: 300,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      />
    );

    return (
      <div>
        <TopNav />
        <MathjaxRenderer id={id} mathLoaded={this.onMathLoaded} />
        {splitPane}
      </div>
    );
  }
}
