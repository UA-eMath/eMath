import React from "react";
import { Form, Button, Modal, Input } from "antd";
import CaptionOptions from "./SubLevelCaptionOptions";

const AddSubLevel = Form.create({ name: "form_in_modal" })(
  class extends React.Component {
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
              onClick={onCreate}
              loading={loading}
            >
              Submit
            </Button>,
          ]}
        >
          <Form layout="vertical">
            <Form.Item label="Type">
              <CaptionOptions form={form} />
            </Form.Item>

            <Form.Item
              label="Caption"
              extra="You could put Latex code here, for example, <math>...</math>."
            >
              {getFieldDecorator("title", {
                initialValue: "",
              })(<Input />)}
            </Form.Item>
          </Form>
        </Modal>
      );
    }
  }
);

export default AddSubLevel;
