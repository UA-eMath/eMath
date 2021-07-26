import React from "react";
import { Button, Modal, Input, Icon } from "antd";

export default class DeleteModal extends React.Component {
  state = {
    deleteButton: true,
  };

  matchCheck = (e) => {
    if (e.target.value === this.props.deleteContent) {
      this.setState({
        deleteButton: false,
      });
    } else {
      this.setState({
        deleteButton: true,
      });
    }
  };
  cancelInput = () => {
    this.setState({
      deleteButton: true,
    });
    this.props.onCancel();
  };

  render() {
    const { title, visible, onDelete, deleteContent } = this.props;

    const titleNode = (
      <span>
        Are you sure to delete <i>{title}</i>?
      </span>
    );

    return (
      <Modal
        visible={visible}
        title={titleNode}
        okText="Confirm"
        onOk={onDelete}
        onCancel={this.cancelInput}
        footer={[
          <Button
            key="delete"
            type={"danger"}
            disabled={this.state.deleteButton}
            onClick={onDelete}
            block={true}
          >
            I understand the consequences, delete this entry
          </Button>,
        ]}
      >
        <p>
          <Icon type="warning" theme="filled" style={{ color: "#ED5C57" }} />
          {"  This action cannot be undone. This will permanently delete the "}
          <b> {deleteContent} </b>
          {" entry and all the content belongs to it."}
        </p>
        <p>
          Please type in the name of the entry to confirm (if name field is
          empty, just type a whitespace and then delete it):{" "}
        </p>
        <Input onChange={this.matchCheck} />
      </Modal>
    );
  }
}
