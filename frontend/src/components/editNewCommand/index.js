import React from "react";
import { Button, Modal, Input } from "antd";
import putNewCommand from "../../requests/putNewCommand";

const { TextArea } = Input;

export default class EditNewCommand extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      textAreaValue: JSON.stringify(this.props.content),
    };
  }

  showEditModal = () => {
    this.setState({ isModalVisible: true });
  };

  editModalOk = (filename, content, bookId) => {
    // to JSON
    putNewCommand({ [filename]: JSON.parse(content) }, bookId);
    this.setState({ isModalVisible: false });
  };

  editModalCancel = () => {
    this.setState({ isModalVisible: false });
  };

  changeTextArea = ({ target: { value } }) => {
    this.setState({ textAreaValue: value });
  };

  render() {
    const { book, filename } = this.props;
    const { isModalVisible, textAreaValue } = this.state;

    return (
      <div>
        <Button key="edit-file" onClick={this.showEditModal}>
          Edit
        </Button>
        <Modal
          title={filename}
          visible={isModalVisible}
          onOk={() => {
            this.editModalOk(filename, textAreaValue, book.id);
          }}
          onCancel={() => {
            this.editModalCancel();
          }}
        >
          <TextArea
            value={textAreaValue}
            autoSize={true}
            onChange={this.changeTextArea}
          />
        </Modal>
      </div>
    );
  }
}
