import React from "react";
import getNewCommand from "../../requests/getNewCommand";
import dataSource from "../InputBox/dataSource";
import MathJax from "react-mathjax-preview";

export default class MathjaxRenderer extends React.Component {
  _isMounted = false;
  state = {
    texCommand: "",
  };

  componentDidMount() {
    this._isMounted = true;
    getNewCommand(this.props.id).then((texCommandFromDB) => {
      const commands = texCommandFromDB.data;
      let math = "";
      for (const filename in commands) {
        for (const value of commands[filename]) {
          math = math.concat(`$$${value["tex"]}$$ `);
          dataSource.push(this.regexMatch(value["tex"], value["note"]));
        }
      }
      if (this._isMounted) {
        this.setState({ texCommand: math });
      }
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.texCommand !== nextState.texCommand) {
      console.log("render-----------");
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
    const { texCommand } = this.state;
    return (
      <div style={{ display: "none" }}>
        return (
        <MathJax math={texCommand} />
        );
      </div>
    );
  }
}
