import React from "react";
import { Input, Icon, List, Row, Col, Button } from "antd";
import putNewCommand from "../../../requests/putNewCommand";

export default class AddNewCommand extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      onClickAdd: false,
      inputTex: "",
      inputNote: "",
    };
  }

  addCommand = () => {
    this.setState({ onClickAdd: true });
  };

  changeInputTex = ({ target: { value } }) => {
    this.setState({ inputTex: value });
  };

  changeInputNote = ({ target: { value } }) => {
    this.setState({ inputNote: value });
  };

  saveNewCommand = () => {
    const { inputTex, inputNote } = this.state;
    const { filename, bookId, allCommands, texCommandsOnChange } = this.props;
    if (inputTex !== "") {
      allCommands.push({ tex: inputTex, note: inputNote });
      putNewCommand({ [filename]: allCommands }, bookId);
      texCommandsOnChange(filename, allCommands);
    }
    this.setState({ onClickAdd: false });
  };

  render() {
    const { inputTex, inputNote, onClickAdd } = this.state;
    const { allCommands } = this.props;

    const textarea = onClickAdd ? (
      <List key={allCommands.length}>
        <Row>
          <Col span={11}>
            <Input
              addonBefore={"Tex:"}
              value={inputTex}
              onChange={this.changeInputTex}
            />
          </Col>
          <Col span={11}>
            <Input
              addonBefore={"Note:"}
              value={inputNote}
              onChange={this.changeInputNote}
            />
          </Col>
          <Col span={2}>
            <Icon
              type="save"
              style={{ color: "#0085F9" }}
              onClick={this.saveNewCommand}
            />
          </Col>
        </Row>
      </List>
    ) : (
      ""
    );

    return (
      <>
        {textarea}

        <List
          key={allCommands.length + 1}
          style={{ textAlign: "center", marginTop: 16 }}
        >
          <Button type="link" onClick={this.addCommand} block>
            <Icon type="plus" /> Add Command
          </Button>
        </List>
      </>
    );
  }
}
