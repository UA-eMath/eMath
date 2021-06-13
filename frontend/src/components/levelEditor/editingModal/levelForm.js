import React from "react";
import { Form, Button, Modal, Input, Checkbox } from "antd";
import DeleteModal from "../../deleteModal";

const LevelForm = Form.create({ name: "form_in_modal" })(
  class extends React.Component {
    state = {
      deleteButton: true,
    };

    matchCheck = (e) => {
      if (e.target.value === this.props.parent.tocTitle) {
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
      const {
        visible,
        onCancel,
        onCreate,
        form,
        parent,
        modifyState,
        loading,
        onDelete,
      } = this.props;
      const { getFieldDecorator } = form;
      let title;
      if (modifyState === "New") {
        title = "Creating new table of content item under: " + parent.tocTitle;
      } else if (modifyState === "Edit") {
        title = "Editing table of content item " + parent.tocTitle;
      } else if (modifyState === "Remove") {
        return (
          <DeleteModal
            deleteContent={parent.tocTitle}
            visible={visible}
            onDelete={onDelete}
            onCancel={this.props.onCancel}
          />
        );
      }

      return (
        <Modal
          visible={visible}
          title={title}
          onCancel={this.cancelInput}
          footer={[
            <Button key="back" onClick={onCancel}>
              Cancel
            </Button>,
            <Button
              key="submit"
              type="primary"
              onClick={onCreate}
              loading={loading}
            >
              Submit
            </Button>,
          ]}
        >
          <Form layout="vertical">
            <Form.Item
              label="Header"
              extra="Headers for part, chapter, section, or subsection"
            >
              {getFieldDecorator("title", {
                rules: [
                  {
                    required: true,
                    message: "Please input the Header of collection!",
                  },
                ],
                initialValue: modifyState === "New" ? "" : parent.title,
              })(<Input />)}
            </Form.Item>

            <Form.Item
              label="Table of content Title"
              extra="Header/title as it should appear in the table of contents or the topic tree. Leave it empty if same as title"
            >
              {getFieldDecorator("tocTitle", {
                initialValue: modifyState === "New" ? "" : parent.tocTitle,
              })(<Input />)}
            </Form.Item>

            <Form.Item
              extra={"You will not be able to create a new entry under a page."}
            >
              {getFieldDecorator("isPage", {
                valuePropName: "checked",
                initialValue: modifyState === "New" ? false : parent.isPage,
              })(<Checkbox>It will be a page</Checkbox>)}
            </Form.Item>
          </Form>
        </Modal>
      );
    }
  }
);

export default LevelForm;
