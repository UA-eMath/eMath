import React from "react";
import { Form, Button, Modal, Input, Checkbox } from "antd";
import CaptionOptions from "./SubLevelCaptionOptions";

const AddSubLevel = Form.create({ name: "form_in_modal" })(
  class extends React.Component {
    state = {
      isChecked: false,
    };

    putLevelOutside = () => {
      this.setState({
        isChecked: true,
      });
      this.props.removeFocusArea();
    };

    onSubmitForm = () => {
      this.setState({
        isChecked: false,
      });
      this.props.onCreate();
    };

    render() {
      const { visible, onCancel, onCreate, form, loading } = this.props;
      const { getFieldDecorator } = form;

      return (
        <Modal
          visible={visible}
          title={"Add A Content Block"}
          onCancel={onCancel}
          onOk={onCreate}
          footer={[
            <Button key="back" onClick={onCancel}>
              Cancel
            </Button>,
            <Button
              key="submit"
              type="primary"
              onClick={this.onSubmitForm}
              loading={loading}
            >
              Submit
            </Button>,
          ]}
        >
          <Form layout="vertical">
            <Form.Item label="Table of content Title">
              <CaptionOptions form={form} />
            </Form.Item>

            <Form.Item
              label="Header"
              extra="You could put Latex code here, for example, <math>...</math>."
            >
              {getFieldDecorator("title", {
                initialValue: "",
              })(<Input />)}
            </Form.Item>

            <Form.Item>
              <Checkbox
                checked={this.state.isChecked}
                disabled={this.state.isChecked}
                onChange={this.putLevelOutside}
              >
                Do you want to put the new level outside the current selected
                level?
              </Checkbox>
            </Form.Item>
          </Form>
        </Modal>
      );
    }
  }
);

export default AddSubLevel;
