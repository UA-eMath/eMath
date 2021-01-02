import React from "react";
import "antd/dist/antd.css";
import TopNav from "./../../components/topNav";
import LevelEditor from "./../../components/levelEditor";
import ParaEditor from "./../../components/paraEditor";
import SplitPane from "react-split-pane";
import "./index.css";
import getTexCommand from "../../requests/getTexCommand";
import { texCommandArray } from "../InputBox/dataSource";
import { Node, Context } from "../react-mathjax";

export default class AuthoringLayout extends React.Component {
  _isMounted = false;
  state = {
    paneSize: 700,
    texCommandsInMathTag: [],
  };

  async componentDidMount() {
    this._isMounted = true;
    const texCommandFromDB = await getTexCommand(this.props.match.params.id);
    if (typeof texCommandFromDB !== "undefined") {
      const commands = texCommandFromDB.data;
      // put commands into <Math></Math>
      let items = [];
      let num = 0;
      for (const filename in commands) {
        for (const [index, value] of commands[filename].entries()) {
          items.push(<Node>{value["tex"]}</Node>);
          texCommandArray.push(this.regexMatch(value["tex"], value["note"]));
          num = num + 1;
        }
      }
      if (this._isMounted) {
        this.setState({ texCommandsInMathTag: items });
      }
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  regexMatch = (tex, note) => {
    const regex = /{\\[^}]+/;
    const texCommand = tex.match(regex)[0];
    return { name: texCommand.slice(1), char: note };
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
        <SplitPane split="vertical" minSize={0} size={this.state.paneSize}>
          <div
            style={{
              minHeight: "100vh",
            }}
          >
            <LevelEditor levelId={id} changePaneSize={this.changePaneSize} />
          </div>

          <div
            style={{
              background: "#aaaa00",
              minHeight: "100vh",
            }}
          >
            <ParaEditor />
          </div>
        </SplitPane>
        {/* render tex commands */}
        <Context input="tex">
          <div style={{ display: "none" }}>
            {this.state.texCommandsInMathTag}
          </div>
        </Context>
      </div>
    );
  }
}
