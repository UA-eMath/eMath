import React from "react";
import { message } from "antd";
import getNewCommand from "../../requests/getNewCommand";
// import { texCommandArray } from "../InputBox/dataSource";
import { Node, Context } from "../react-mathjax";
import MathJaxConfig from "../../constants/MathJax_config";
import dataSource from "../InputBox/dataSource";

export default class MathjaxRenderer extends React.Component {
  _isMounted = false;
  state = {
    texCommandsInMathTag: [],
  };

  componentDidMount() {
    this._isMounted = true;
    getNewCommand(this.props.id).then((texCommandFromDB) => {
      const commands = texCommandFromDB.data;
      // put commands into <Math></Math>
      let items = [];
      for (const filename in commands) {
        for (const value of commands[filename]) {
          items.push(<Node key={items.length}>{value["tex"]}</Node>);
          dataSource.push(this.regexMatch(value["tex"], value["note"]));
        }
      }
      if (this._isMounted) {
        this.setState({ texCommandsInMathTag: items });
      }
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.texCommandsInMathTag !== nextState.texCommandsInMathTag) {
      return true;
    }
    return false;
  }

  regexMatch = (tex, note) => {
    const regex = /{\\[^}]+/;
    const texCommand = tex.match(regex)[0];
    return {
      value: texCommand.slice(1).substring(1),
      caption: texCommand.slice(1),
      meta: note,
      score: 1000,
    };
  };

  render() {
    return (
      <div style={{ display: "none" }}>
        <Context
          input="tex"
          onError={(MathJax, error) => {
            message.warning(
              "Encountered a MathJax error, re-attempting a typeset!"
            );
            MathJax.Hub.Queue(MathJax.Hub.Typeset());
          }}
          didFinishTypeset={() => {
            this.props.mathLoaded();
            message.success("Loaded MathJax script!");
          }}
          script={MathJaxConfig.script}
          options={MathJaxConfig.options}
        >
          <div>
            {this.state.texCommandsInMathTag.map((value, index) => {
              return value;
            })}
          </div>
        </Context>
      </div>
    );
  }
}
