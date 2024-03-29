import React from "react";
import { Form, Input, Button, message, Select } from "antd";
import { postPerson } from "../../../requests/requestPerson";
import "../index.css";

const { Option } = Select;

class Signup extends React.Component {
  state = {
    confirmDirty: false,
    googleAuth: JSON.parse(localStorage.getItem("googleAuth")),
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        postPerson(values).then((response) => {
          if (response.status && response.status === 200) {
            if (Object.keys(response.data).length === 1) {
              message.error("Registration failed: " + response.data.msg);
            } else {
              message.success("Registration successful: " + response.data.msg);
            }
            window.location.href = "/";
          } else {
            message.error("Registration failed: " + response.data.msg);
          }
        });
      }
    });
  };

  passwordValidator = async (rule, value) => {
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordPattern.test(value)) {
      return Promise.reject(
        new Error(
          "Please input your password at least 8 characters long, contains charaters and digits, without special characters."
        )
      );
    }
    return Promise.resolve();
  };

  handleConfirmBlur = (e) => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue("password")) {
      callback("Two passwords that you enter is inconsistent!");
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value) {
      const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
      if (!passwordPattern.test(value)) {
        return Promise.reject(
          new Error(
            "Please input your password at least 8 characters long, contains charaters and digits, without special characters."
          )
        );
      }
    }
    if (value && this.state.confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };

  render() {
    const { googleAuth } = this.state;
    const { getFieldDecorator } = this.props.form;

    const layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    };

    const tailLayout = {
      wrapperCol: { offset: 8, span: 16 },
    };

    return (
      <div>
        <Form
          {...layout}
          onSubmit={this.handleSubmit}
          className="register-form"
        >
          <Form.Item label="Username">
            {getFieldDecorator("username", {
              initialValue: googleAuth?.name.replace(/\s/g, ""),
              rules: [
                { required: true, message: "Please input your username!" },
              ],
            })(<Input disabled={googleAuth} />)}
          </Form.Item>

          <Form.Item label="First Name">
            {getFieldDecorator("firstName", {
              initialValue: googleAuth?.first_name,
            })(<Input disabled={googleAuth} />)}
          </Form.Item>

          <Form.Item label="Middle Name">
            {getFieldDecorator("middleName", {})(<Input />)}
          </Form.Item>

          <Form.Item label="Last Name">
            {getFieldDecorator("lastName", {
              initialValue: googleAuth?.last_name,
            })(<Input disabled={googleAuth} />)}
          </Form.Item>

          <Form.Item
            label="Account Type"
            extra="Author and TA account need to wait for the approval of administrator."
            hasFeedback
          >
            {getFieldDecorator("type", {
              rules: [
                { required: true, message: "Please select your account type!" },
              ],
            })(
              <Select placeholder="Please select a type">
                <Option value="Author">Author</Option>
                <Option value="Student">Student</Option>
                <Option value="TA">TA</Option>
                <Option value="Tester">Tester</Option>
              </Select>
            )}
          </Form.Item>

          <Form.Item label="E-mail">
            {getFieldDecorator("email", {
              initialValue: googleAuth?.email,
              rules: [
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
              ],
            })(<Input disabled={googleAuth} />)}
          </Form.Item>

          <Form.Item label="Password" hasFeedback>
            {getFieldDecorator("password", {
              rules: [
                {
                  required: true,
                  message: "Please input your password!",
                },
                {
                  validator: this.validateToNextPassword,
                },
              ],
            })(<Input.Password />)}
          </Form.Item>
          <Form.Item label="Confirm Password" hasFeedback>
            {getFieldDecorator("confirm", {
              rules: [
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                {
                  validator: this.compareToFirstPassword,
                },
              ],
            })(<Input.Password onBlur={this.handleConfirmBlur} />)}
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Sign Up
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default Form.create()(Signup);
