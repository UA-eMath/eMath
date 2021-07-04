import React from "react";
import { Form, Input, Button, message, Descriptions, Badge } from "antd";
import { postPerson } from "../../requests/requestPerson";
import _ from "lodash";

class CreateTester extends React.Component {
  state = {
    confirmDirty: false,
    tester: this.props.book.root.tester,
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

  forgetPasswordBtnClick = () => {
    message.warning("This functionality is not available at this time.");
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { tester } = this.state;

    const layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    };

    const tailLayout = {
      wrapperCol: { offset: 8, span: 16 },
    };

    return _.isEmpty(tester) ? (
      <div style={{ margin: "10px" }}>
        <Form
          {...layout}
          onSubmit={this.handleSubmit}
          style={{ maxWidth: 600 }}
        >
          <Form.Item label="Username">
            {getFieldDecorator("username", {
              rules: [
                { required: true, message: "Please input the username!" },
              ],
            })(<Input />)}
          </Form.Item>

          <Form.Item label="Display Name">
            {getFieldDecorator("firstName", {
              rules: [{ required: true, message: "Please input the name!" }],
            })(<Input />)}
          </Form.Item>

          <Form.Item
            label="Account Type"
            help="Tester account can only test current book"
          >
            {getFieldDecorator("type", {
              initialValue: "Tester",
            })(<Input disabled />)}
          </Form.Item>

          <Form.Item label="Authorized Book" help="Current book's ID">
            {getFieldDecorator("access", {
              initialValue: this.props.book.root.id,
            })(<Input disabled />)}
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
    ) : (
      <Descriptions
        title="Tester Info"
        column={1}
        bordered
        style={{ maxWidth: 600 }}
      >
        <Descriptions.Item label="Username">
          {tester.username}
        </Descriptions.Item>
        <Descriptions.Item label="Password">
          <Button onClick={this.forgetPasswordBtnClick}>Forget password</Button>
        </Descriptions.Item>
        <Descriptions.Item label="Status" span={3}>
          <Badge status="processing" text="Activate" />
        </Descriptions.Item>
      </Descriptions>
    );
  }
}

export default Form.create()(CreateTester);
