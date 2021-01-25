import React from "react";
import { Modal, Input } from "antd";

export default class AddLabel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
    };
  }

  labelModalOk = () => {
    this.props.toggleModal();
    // todo
  };

  labelModalCancel = () => {
    this.props.toggleModal();
  };

  changeTextArea = ({ target: { value } }) => {};

  render() {
    const { visible, id } = this.props;

    return (
      <div>
        <Modal
          title="Add Label"
          visible={visible}
          onOk={this.labelModalOk}
          onCancel={this.labelModalCancel}
        >
          <Input addonBefore={"ID: " + id} placeholder="Create a label" />
        </Modal>
      </div>
    );
  }
}
