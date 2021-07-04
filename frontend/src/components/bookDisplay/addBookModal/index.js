import {
  Button,
  Modal,
  DatePicker,
  Form,
  Input,
  Icon,
  InputNumber,
  Upload,
  message,
} from "antd";
import React from "react";
import postBook from "../../../requests/postBook";
import moment from "moment";

let id = 0;

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
}

const AddBook = Form.create({ name: "form_in_modal" })(
  class extends React.Component {
    state = { imageUrl: null };
    onCreate = () => {
      const { form, setLoading, setVisible, fetchRoots } = this.props;

      setLoading(true);

      form.validateFields((err, values) => {
        if (err) {
          setLoading(false);
          return;
        }
        //create new book
        delete values.cover_image_upload;
        let request_body = JSON.stringify({
          ...values,
          date: values["date"].format("YYYY-MM-DD"),
          isPage: false,
          cover_image: this.state.imageUrl
            ? this.state.imageUrl
            : values["cover_image"],
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
        this.setState({ imageUrl: null });
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

    coverImageChange = (info) => {
      if (info.file.status === "done") {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, (imageUrl) =>
          this.setState({
            imageUrl,
          })
        );
      } else {
        this.setState({
          imageUrl: null,
        });
      }
    };

    normFile = (e) => {
      if (Array.isArray(e)) {
        return e;
      }
      return e && e.fileList;
    };

    render() {
      const { visible, onCancel, form } = this.props;
      const { getFieldDecorator, getFieldValue } = form;

      const formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
      };

      const formItemLayoutWithOutLabel = {
        wrapperCol: { span: 14, offset: 6 },
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
            initialValue: "",
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
          width={800}
          onOk={() => this.onCreate()}
          onCancel={onCancel}
        >
          <Form layout="vertical" {...formItemLayout}>
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

            <Form.Item label="Author" {...formItemLayoutWithOutLabel}>
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
              {getFieldDecorator("middle_name", { initialValue: "" })(
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

            <Form.Item label="Cover Image">
              {getFieldDecorator("cover_image_upload", {
                valuePropName: "fileList",
                getValueFromEvent: this.normFile,
              })(
                <Upload
                  listType="picture"
                  beforeUpload={beforeUpload}
                  onChange={this.coverImageChange}
                  customRequest={({ file, onSuccess }) => {
                    setTimeout(() => {
                      onSuccess("ok");
                    }, 0);
                  }}
                >
                  <Button>
                    <Icon type="upload" /> Upload
                  </Button>
                </Upload>
              )}
              {getFieldDecorator(`cover_image`, {
                initialValue: "",
              })(
                <Input
                  placeholder="Image Link"
                  style={{ width: "80%", marginTop: 8 }}
                />
              )}
            </Form.Item>
          </Form>
        </Modal>
      );
    }
  }
);

export default AddBook;
