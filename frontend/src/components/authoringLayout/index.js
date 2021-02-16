import React from "react";
import "antd/dist/antd.css";
import TopNav from "./../../components/topNav";
import LevelEditor from "./../../components/levelEditor";
import ParaEditor from "./../../components/paraEditor";
import SplitPane from "react-split-pane";
import "./index.css";
import MathjaxRenderer from "../MathjaxRenderer";

export default class AuthoringLayout extends React.Component {
  state = {
    paneSize: 700,
  };

  changePaneSize = (paneSize) => {
    this.setState({
      paneSize: paneSize,
    });
  };

  render() {
    const id = this.props.match.params.id;

    return (
      <div>
        <TopNav />
        <MathjaxRenderer id={id} />
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
      </div>
    );
  }
}
