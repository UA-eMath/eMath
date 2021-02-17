import React from "react";
import { Modal, Input, message } from "antd";
import postLabel from "../../../requests/postLabel";
import getLabel from "../../../requests/getLabel";
import putLabel from "../../../requests/putLabel";

export default class AddLabel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      paraID: this.props.paraID,
      levelID: this.props.levelID,
      oldLabel: null,
      newLabel: null,
    };
    this._isMounted = false;
  }

  async componentDidMount() {
    this._isMounted = true;
    let labelObj;
    if (typeof this.state.levelID !== "undefined") {
      labelObj = await getLabel({ levelID: this.props.levelID });
    } else {
      labelObj = await getLabel({ paraID: this.props.paraID });
    }
    if (typeof labelObj !== "undefined" && this._isMounted) {
      this.setState({ oldLabel: labelObj.data });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  labelModalOk = () => {
    this.props.toggleModal();
    if (this.state.newLabel !== null) {
      let request_body;
      if (this.state.oldLabel === null) {
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
        request_body = {
          id: this.state.oldLabel.id,
          content: this.state.newLabel,
        };
        putLabel(request_body);
      }
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
    const { oldLabel } = this.state;
    const isOldLabelEmpty = oldLabel === null;

    let id;
    if (typeof levelID !== "undefined") {
      id = levelID;
    } else {
      id = paraID;
    }

    return (
      <div>
        {isOldLabelEmpty ? (
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
        ) : (
          <Modal
            title="Edit Label"
            visible={visible}
            onOk={this.labelModalOk}
            onCancel={this.labelModalCancel}
          >
            <Input
              addonBefore={"ID: " + id}
              defaultValue={oldLabel.content}
              onChange={this.changeTextArea}
            />
          </Modal>
        )}
      </div>
    );
  }
}
