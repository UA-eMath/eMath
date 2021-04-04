import {
  Button,
  Modal,
  DatePicker,
  Form,
  Input,
  Icon,
  InputNumber,
} from "antd";
import React from "react";
import postBook from "../../../requests/postBook";
import moment from "moment";

let id = 0;

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

    remove = (k) => {
      const { form } = this.props;
      // can use data-binding to get
      const keys = form.getFieldValue("keys");
      // can use data-binding to set
      form.setFieldsValue({
        keys: keys.filter((key) => key !== k),
      });
    };

    add = () => {
      const { form } = this.props;
      // can use data-binding to get
      const keys = form.getFieldValue("keys");
      const nextKeys = keys.concat(id++);
      // can use data-binding to set
      // important! notify form to detect changes
      form.setFieldsValue({
        keys: nextKeys,
      });
    };

    render() {
      const { visible, onCancel, form, loading } = this.props;
      const { getFieldDecorator, getFieldValue } = form;

      const formItemLayoutWithOutLabel = {
        wrapperCol: {
          xs: { span: 24, offset: 0 },
          sm: { span: 20, offset: 4 },
        },
      };
      getFieldDecorator("keys", { initialValue: [] });
      const keys = getFieldValue("keys");
      const formItems = keys.map((k, index) => (
        <Form.Item label={`Contributor ${index + 1}`} required={false} key={k}>
          {getFieldDecorator(`contributor_first_${index}`, {
            validateTrigger: ["onChange", "onBlur"],
            rules: [
              {
                required: true,
                message:
                  "Please input the first name of author or delete this field.",
              },
            ],
          })(
            <Input
              placeholder="first name"
              style={{ width: "30%", marginRight: 8 }}
            />
          )}
          {getFieldDecorator(`contributor_middle_${index}`, {
            defaultValue: "",
          })(
            <Input
              placeholder="middle name"
              style={{ width: "30%", marginRight: 8 }}
            />
          )}
          {getFieldDecorator(`contributor_last_${index}`, {
            validateTrigger: ["onChange", "onBlur"],
            rules: [
              {
                required: true,
                message:
                  "Please input the last name of author or delete this field.",
              },
            ],
          })(
            <Input
              placeholder="last name"
              style={{ width: "30%", marginRight: 8 }}
            />
          )}
          {keys.length > 0 ? (
            <Icon
              className="dynamic-delete-button"
              type="minus-circle-o"
              onClick={() => this.remove(k)}
            />
          ) : null}
        </Form.Item>
      ));

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
              {getFieldDecorator("first_name", {
                validateTrigger: ["onChange", "onBlur"],
                rules: [
                  {
                    required: true,
                    message: "Please input the first name of author!",
                  },
                ],
              })(
                <Input
                  placeholder="first name"
                  style={{ width: "30%", marginRight: 8 }}
                />
              )}
              {getFieldDecorator("middle_name", { defaultValue: "" })(
                <Input
                  placeholder="middle name"
                  style={{ width: "30%", marginRight: 8 }}
                />
              )}
              {getFieldDecorator("last_name", {
                validateTrigger: ["onChange", "onBlur"],
                rules: [
                  {
                    required: true,
                    message: "Please input the last name of author!",
                  },
                ],
              })(
                <Input
                  placeholder="last name"
                  style={{ width: "30%", marginRight: 8 }}
                />
              )}
            </Form.Item>

            {formItems}
            <Form.Item {...formItemLayoutWithOutLabel}>
              <Button type="dashed" onClick={this.add} style={{ width: "60%" }}>
                <Icon type="plus" /> Add contributor
              </Button>
            </Form.Item>

            <Form.Item label="Number of Contributors">
              {getFieldDecorator("contributors_num", {
                initialValue: keys.length,
                rules: [
                  {
                    required: true,
                    message: "Please input the number of contributors.",
                  },
                ],
              })(<InputNumber min={0} style={{ width: "30%" }} />)}
            </Form.Item>

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
