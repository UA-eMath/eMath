import React from "react";
import { Button, Modal, Input } from "antd";

const { TextArea } = Input;

export default class EditNewCommand extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
    };
  }

  showEditModal = () => {
    this.setState({ isModalVisible: true });
  };

  editModalOk = () => {
    // save commands
    //todo

    this.setState({ isModalVisible: false });
  };

  editModalCancel = () => {
    this.setState({ isModalVisible: false });
  };

  render() {
    return (
      <div>
        <Button key="edit-file" onClick={this.showEditModal}>
          Edit
        </Button>
        <Modal
          title={this.props.filename}
          visible={this.state.isModalVisible}
          onOk={this.editModalOk}
          onCancel={this.editModalCancel}
        >
          <TextArea
            defaultValue={JSON.stringify(this.props.content)}
            autoSize={true}
          />
        </Modal>
      </div>
    );
  }
}
