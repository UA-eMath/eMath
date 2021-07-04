import React from "react";
import { Form, Input, Button, Checkbox, Icon, message } from "antd";
import "../index.css";
import { authPerson, getUsermod } from "../../../requests/requestPerson";
import url from "../../../requests/Urls";
import _ from "lodash";

class LoginComp extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        authPerson(values).then((response) => {
          if (response.status === 400) {
            // username/password error
            message.error(response.data.non_field_errors);
          } else if (response.status === 200) {
            // username/password correct
            const token = response.data.token;
            getUsermod(values).then((response) => {
              // authentication dedicated account?
              if (response.status === 500) {
                // something unexpected
                message.error(response.data.msg);
              } else {
                if (Object.keys(response.data).length > 1) {
                  // username or usermod does not exist
                  message.error(response.data.msg);
                } else {
                  if (response.data.allowLogin) {
                    // not authentication dedicated account, all good
                    localStorage.setItem("token", token);
                    //fetch user and author
                    fetch(`${url.domain}:${url.port}/current-user/`, {
                      headers: {
                        Authorization: `JWT ${localStorage.getItem("token")}`,
                      },
                    })
                      .then((res) => res.json())
                      .then((json) => {
                        localStorage.setItem("username", json.username);
                        // get author
                        fetch(`${url.domain}:${url.port}/user-person/`, {
                          headers: {
                            Authorization: `JWT ${localStorage.getItem(
                              "token"
                            )}`,
                          },
                        })
                          .then((res) => res.json())
                          .then((json) => {
                            localStorage.setItem("personID", json.id);
                            localStorage.setItem(
                              "name",
                              _.filter([
                                json.first_name,
                                json.middle_name,
                                json.last_name,
                              ]).join()
                            );
                            localStorage.setItem("type", json.type);
                            localStorage.setItem(
                              "access",
                              JSON.stringify(json.access)
                            );
                            window.location.href = "/";
                          });
                      });
                  } else {
                    // do not allow authentication dedicated account to login
                    message.error(
                      `${values.username} is for external authentication only, cannot login.`
                    );
                  }
                }
              }
            });
          } else {
            // something unexpected
            message.error("Unknown error.");
          }
        });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator("username", {
            rules: [{ required: true, message: "Please input your username!" }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Username"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("password", {
            rules: [{ required: true, message: "Please input your Password!" }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="Password"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("remember", {
            valuePropName: "checked",
            initialValue: true,
          })(<Checkbox>Remember me</Checkbox>)}
          <a className="login-form-forgot" href="/">
            Forgot password
          </a>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
          Or <a href="/signup">register now!</a>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create()(LoginComp);
