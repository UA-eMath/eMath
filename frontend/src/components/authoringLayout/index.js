import React from "react";
import "antd/dist/antd.css";
import LevelEditor from "./../../components/levelEditor";
import ParaEditor from "./../../components/paraEditor";
import SplitPane from "react-split-pane";
import "./index.css";
import MathjaxRenderer from "../MathjaxRenderer";
import { Spin } from "antd";
import background from "../../static/img/write.jpg";

export default class AuthoringLayout extends React.Component {
  _isMounted = false;
  state = {
    paneSize: "40%",
    mathLoaded: false,
    innerHeight: 0,
  };

  componentDidMount() {
    this._isMounted = true;
    this.updateWindowDimensions();
    // Add event listener
    window.addEventListener("resize", this.updateWindowDimensions.bind(this));
  }

  componentWillUnmount() {
    this._isMounted = false;
    // Remove event listener
    window.removeEventListener(
      "resize",
      this.updateWindowDimensions.bind(this)
    );
  }

  /**
   * Calculate & Update state of new dimensions
   */
  updateWindowDimensions() {
    this.setState({ innerHeight: window.innerHeight });
  }

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
        style={{
          position: "relative",
          height: this.state.innerHeight - 80,
        }}
        pane2Style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
        }} // #aaaa00
      >
        <div>
          <LevelEditor
            bookID={id}
            levelId={id}
            changePaneSize={this.changePaneSize}
            windowHeight={this.state.innerHeight}
          />
        </div>

        <div>
          <ParaEditor bookID={id} windowHeight={this.state.innerHeight} />
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
