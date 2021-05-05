import {
  Button,
  DatePicker,
  Form,
  Input,
  message,
  Modal,
  Upload,
  Icon,
} from "antd";
import get from "lodash/get";
import React from "react";
import updateLevel from "../../requests/updateLevel";
import updateBook from "../../requests/updateBook";
import removeBook from "../../requests/removeBook";
import moment from "moment";

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

class BookSetting extends React.Component {
  state = {
    imageUrl: null,
  };
  onDelete = (bookId) => {
    Modal.confirm({
      title: "Are you sure delete this Book?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: () => {
        removeBook(bookId).then((data) => {
          if (data.status !== 200) {
            console.error("Delete error", data);
          } else {
            window.location.href = "/";
          }
        });
      },
    });
  };

  onUpdate = (nodeId, bookId) => {
    this.props.form.validateFields((err, values) => {
      if (err) {
        console.error(err);
        return;
      }

      let node_request_body;
      let root_request_body;

      node_request_body = JSON.stringify({
        title: values["title"],
        tocTitle: values["tocTitle"],
      });

      updateLevel(node_request_body, nodeId)
        .then((data) => {
          if (!data || data.status !== 200) {
            if (data.status === 400) {
              message.error(data.data);
            }
            console.error("Update error", node_request_body, data);
          }
        })
        .then((res) => {
          delete values.cover_image_upload;
          root_request_body = JSON.stringify({
            ...values,
            date: values["date"].format("YYYY-MM-DD"),
            authorID: this.props.book.root.author.id,
            cover_image: this.state.imageUrl
              ? this.state.imageUrl
              : values["cover_image"],
          });
          updateBook(root_request_body, bookId).then((data) => {
            if (!data || data.status !== 200) {
              if (data.status === 400) {
                message.error(data.data);
              }
              console.error("Update error", root_request_body, data);
            } else {
              window.location.href = "/";
            }
          });
        });

      message.success("Book information have been updated!");
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
    const { getFieldDecorator } = this.props.form;
    const { book } = this.props;

    return (
      <Form layout="vertical" onSubmit={this.handleSubmit}>
        <Form.Item label="Title">
          {getFieldDecorator("title", {
            initialValue: get(book, "title"),
            rules: [
              {
                required: true,
                message: "Please input the title of collection!",
              },
            ],
          })(<Input style={{ width: "50%" }} />)}
        </Form.Item>

        <Form.Item
          label="Table of content Title"
          extra="Leave it empty if same as title"
        >
          {getFieldDecorator("tocTitle", {
            initialValue: get(book, "tocTitle"),
          })(<Input style={{ width: "50%" }} />)}
        </Form.Item>

        <Form.Item label="HTML Title" extra="Leave it empty if same as title">
          {getFieldDecorator("html_title", {
            initialValue: get(book, ["root", "html_title"]),
          })(<Input style={{ width: "50%" }} />)}
        </Form.Item>

        <Form.Item label="Author">
          {getFieldDecorator("first_name", {
            initialValue: get(book, ["root", "author", "first_name"]),
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
          {getFieldDecorator("middle_name", {
            initialValue: get(book, ["root", "author", "middle_name"]),
          })(
            <Input
              placeholder="middle name"
              style={{ width: "30%", marginRight: 8 }}
            />
          )}
          {getFieldDecorator("last_name", {
            initialValue: get(book, ["root", "author", "last_name"]),
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

        {/* TODO: contributors */}
        {/* <Form.Item label="Contributors">
          {getFieldDecorator("first_name", {
            initialValue: "",
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
            initialValue: "",
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
        </Form.Item> */}

        <Form.Item label="Date">
          {getFieldDecorator("date", {
            rules: [{ type: "object" }],
            initialValue: moment(get(book, ["root", "date"])),
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
              style={{ width: "50%", marginTop: 8 }}
            />
          )}
        </Form.Item>

        <Form.Item>
          <Button
            key="submit"
            type="primary"
            onClick={() => {
              this.onUpdate(book.id, book.root.id);
            }}
          >
            Submit
          </Button>
        </Form.Item>

        <Form.Item>
          <Button
            type="danger"
            onClick={() => {
              this.onDelete(book.id);
            }}
          >
            Delete
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create({ name: "validate_other" })(BookSetting);
