import React from "react";
import "antd/dist/antd.css";
import TopNav from "./../../components/topNav";
import LevelEditor from "./../../components/levelEditor";
import ParaEditor from "./../../components/paraEditor";
import SplitPane from "react-split-pane";
import "./index.css";
import getNewCommand from "../../requests/getNewCommand";
import { texCommandArray } from "../InputBox/dataSource";
import { Node, Context } from "../react-mathjax";
import MathJaxConfig from "../../constants/MathJax_config";

export default class AuthoringLayout extends React.Component {
  _isMounted = false;
  state = {
    paneSize: 700,
    texCommandsInMathTag: [],
  };

  async componentDidMount() {
    this._isMounted = true;
    const texCommandFromDB = await getNewCommand(this.props.match.params.id);
    if (typeof texCommandFromDB !== "undefined") {
      const commands = texCommandFromDB.data;
      // put commands into <Math></Math>
      let items = [];
      for (const filename in commands) {
        for (const value of commands[filename]) {
          items.push(<Node>{value["tex"]}</Node>);
          texCommandArray.push(this.regexMatch(value["tex"], value["note"]));
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
        {/* render tex commands */}
        <div style={{ display: "none" }}>
          {this.state.texCommandsInMathTag.map((value, index) => {
            return (
              <div key={index}>
                <Context
                  input="tex"
                  onLoad={() => console.log("Loaded MathJax script!")}
                  onError={(MathJax, error) => {
                    console.warn(error);
                    console.log(
                      "Encountered a MathJax error, re-attempting a typeset!"
                    );
                    MathJax.Hub.Queue(MathJax.Hub.Typeset());
                  }}
                  script={MathJaxConfig.script}
                  options={MathJaxConfig.options}
                >
                  {value}
                </Context>
              </div>
            );
          })}
        </div>
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
            <ParaEditor bookID={id} />
          </div>
        </SplitPane>
      </div>
    );
  }
}
