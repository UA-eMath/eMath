import React from "react";
import { Input, Icon, List, Row, Col } from "antd";
import putNewCommand from "../../../requests/putNewCommand";

export default class EachNewCommand extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      onClickEdit: false,
      visible: true,
      inputTex: this.props.command["tex"],
      inputNote: this.props.command["note"],
    };
  }

  changeInputTex = ({ target: { value } }) => {
    this.setState({ inputTex: value });
  };

  changeInputNote = ({ target: { value } }) => {
    this.setState({ inputNote: value });
  };

  showInputBox = () => {
    this.setState({ onClickEdit: true });
  };

  saveNewCommand = () => {
    const { inputTex, inputNote } = this.state;
    const { filename, bookId, index, allCommands } = this.props;
    allCommands[index].tex = inputTex;
    allCommands[index].note = inputNote;
    putNewCommand({ [filename]: allCommands }, bookId);
    this.setState({ onClickEdit: false });
  };

  deleteCommand = () => {
    const { filename, bookId, index, allCommands } = this.props;
    allCommands.splice(index, 1); // remove current command from the origin array
    putNewCommand({ [filename]: allCommands }, bookId);
    this.setState({ visible: false });
  };

  render() {
    const { inputTex, inputNote, onClickEdit } = this.state;

    const content = onClickEdit ? (
      <>
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
      </>
    ) : (
      <>
        <Col span={11}>{inputTex}</Col>
        <Col span={11}>{inputNote}</Col>
      </>
    );

    const editOrSave = onClickEdit ? (
      <Icon
        type="save"
        style={{ color: "#0085F9" }}
        onClick={this.saveNewCommand}
      />
    ) : (
      <Icon
        type="edit"
        style={{ color: "#0085F9" }}
        onClick={this.showInputBox}
      />
    );

    const renderContent = this.state.visible ? (
      <List key={this.props.index}>
        <Row>
          {content}
          <Col span={1}>{editOrSave}</Col>
          <Col span={1}>
            <Icon
              type="delete"
              style={{ color: "#ED5C57" }}
              onClick={this.deleteCommand}
            />
          </Col>
        </Row>
      </List>
    ) : (
      ""
    );

    return <>{renderContent}</>;
  }
}
