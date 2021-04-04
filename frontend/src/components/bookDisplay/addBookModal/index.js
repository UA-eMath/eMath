import { Button, Modal, DatePicker, Form, Input } from "antd";
import React from "react";
import postBook from "../../../requests/postBook";
import moment from "moment";

const AddBook = Form.create({ name: "form_in_modal" })(
  class extends React.Component {
    onCreate = () => {
      const { form, setLoading, setVisible, fetchRoots } = this.props;

      setLoading(true);

      form.validateFields((err, values) => {
        if (err) {
          return;
        }

        let request_body;
        //create new book

        request_body = JSON.stringify({
          ...values,
          date: values["date"].format("YYYY-MM-DD"),
          isPage: false,
        });

        postBook(request_body)
          .then((data) => {
            if (!data || data.status !== 200) {
              console.error("Submit failed", data);
            } else {
              console.log(data.data);
            }
          })
          .then(() => {
            fetchRoots();
          });

        form.resetFields();
        setVisible(false);
        setLoading(false);
      });
    };

    render() {
      const { visible, onCancel, form, loading } = this.props;
      const { getFieldDecorator } = form;

      return (
        <Modal
          visible={visible}
          title={"Create a new book"}
          footer={[
            <Button key="back" onClick={onCancel}>
              Cancel
            </Button>,
            <Button
              key="submit"
              type="primary"
              onClick={() => this.onCreate()}
              loading={loading}
            >
              Create
            </Button>,
          ]}
        >
          <Form layout="vertical">
            <Form.Item label="Title">
              {getFieldDecorator("title", {
                rules: [
                  {
                    required: true,
                    message: "Please input the title of collection!",
                  },
                ],
              })(<Input />)}
            </Form.Item>

            <Form.Item
              label="Table of content Title"
              extra="Leave it empty if same as title"
            >
              {getFieldDecorator("tocTitle", {
                defaultValue: "",
              })(<Input />)}
            </Form.Item>

            <Form.Item
              label="HTML Title"
              extra="Leave it empty if same as title"
            >
              {getFieldDecorator("html_title", {
                defaultValue: "",
              })(<Input />)}
            </Form.Item>

            <Form.Item label="Author">
              <Input.Group compact>
                <Form.Item label="First Name">
                  {getFieldDecorator("first_name", {
                    rules: [
                      {
                        required: true,
                        message: "Please input the first name of author!",
                      },
                    ],
                  })(<Input />)}
                </Form.Item>
                <Form.Item label="Middle Name">
                  {getFieldDecorator("middle_name", { defaultValue: "" })(
                    <Input />
                  )}
                </Form.Item>
                <Form.Item label="Last Name">
                  {getFieldDecorator("last_name", {
                    rules: [
                      {
                        required: true,
                        message: "Please input the last name of author!",
                      },
                    ],
                  })(<Input />)}
                </Form.Item>
              </Input.Group>
            </Form.Item>

            {/* <Form.Item
              label="Contributor"
              extra="Leave it empty if no contributors"
            >
              {getFieldDecorator("contributor", {
                defaultValue: "",
              })(<Input />)}
            </Form.Item> */}

            <Form.Item label="Date">
              {getFieldDecorator("date", {
                rules: [{ type: "object" }],
                initialValue: moment(),
              })(<DatePicker />)}
            </Form.Item>
          </Form>
        </Modal>
      );
    }
  }
);

export default AddBook;
