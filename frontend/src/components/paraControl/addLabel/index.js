import React from "react";
import { Modal, Input, message } from "antd";
import postLabel from "../../../requests/postLabel";

export default class AddLabel extends React.Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      paraID: this.props.paraID,
      levelID: this.props.levelID,
      newLabel: null,
    };
  }

  labelModalOk = () => {
    this.props.toggleModal();
    if (this.state.newLabel !== null) {
      let request_body;
      if (typeof this.state.levelID !== "undefined") {
        request_body = JSON.stringify({
          content: this.state.newLabel,
          linked_level: this.state.levelID,
          root: parseInt(this.props.bookID),
        });
      } else {
        request_body = JSON.stringify({
          content: this.state.newLabel,
          linked_para: this.state.paraID,
          root: parseInt(this.props.bookID),
        });
      }
      postLabel(request_body);
    } else {
      message.error("new label is null");
    }
  };

  labelModalCancel = () => {
    this.props.toggleModal();
  };

  changeTextArea = ({ target: { value } }) => {
    this.setState({ newLabel: value });
  };

  render() {
    const { visible, levelID, paraID } = this.props;

    let id;
    if (typeof levelID !== "undefined") {
      id = levelID;
    } else {
      id = paraID;
    }

    return (
      <div>
        <Modal
          title="Add Label"
          visible={visible}
          onOk={this.labelModalOk}
          onCancel={this.labelModalCancel}
        >
          <Input
            addonBefore={"ID: " + id}
            placeholder="Create a label"
            onChange={this.changeTextArea}
          />
        </Modal>
      </div>
    );
  }
}
