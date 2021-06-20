import React from "react";
import "antd/dist/antd.css";
import LevelEditor from "./../../components/levelEditor";
import ParaEditor from "./../../components/paraEditor";
import SplitPane from "react-split-pane";
import "./index.css";
import MathjaxRenderer from "../MathjaxRenderer";
import { Spin } from "antd";

export default class AuthoringLayout extends React.Component {
  state = {
    paneSize: 600,
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
      <SplitPane
        split="vertical"
        minSize={0}
        size={this.state.paneSize}
        style={{ position: "relative", minHeight: "84vh" }}
        pane2Style={{ background: "#aaaa00" }}
      >
        <div>
          <LevelEditor
            bookID={id}
            levelId={id}
            changePaneSize={this.changePaneSize}
          />
        </div>

        <div>
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
        {splitPane}
        <MathjaxRenderer id={id} mathLoaded={this.onMathLoaded} />
      </div>
    );
  }
}
