import React from "react";
import {
  Upload,
  message,
  Icon,
  Button,
  List,
  Divider,
  Tabs,
  Row,
  Col,
} from "antd";
import postNewCommand from "../../requests/postNewCommand";
import getNewCommand from "../../requests/getNewCommand";
import EditNewCommand from "../editNewCommand";

const { Dragger } = Upload;
const { TabPane } = Tabs;

export default class NewCommand extends React.Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      uploadFile: null,
      uploading: false,
      texCommands: [],
    };
  }

  async componentDidMount() {
    this._isMounted = true;
    const texCommandFromDB = await getNewCommand(this.props.book.id);
    if (typeof texCommandFromDB !== "undefined" && this._isMounted) {
      this.setState({ texCommands: texCommandFromDB.data });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleChange = (info) => {
    this.setState({ uploadFile: info.file });
    if (info.file.status === "done") {
      this.setState({ uploading: true });
    }
  };

  beforeUpload = (file) => {
    const isTexFile = file.type === "text/plain" || file.type === "";
    if (!isTexFile) {
      message.error("You can only upload .tex/.txt file!");
    }
    return false;
  };

  renderTexCommands = (commands) => {
    let items = [];
    let num = 0;
    for (const filename in commands) {
      items.push(
        <Divider key={num}>
          {filename}
          {/* click the button to show up the textarea */}
          <EditNewCommand
            book={this.props.book}
            filename={filename}
            content={commands[filename]}
          />
        </Divider>
      );
      num = num + 1;
      for (const value of commands[filename]) {
        items.push(
          <List key={num}>
            <Row>
              <Col span={12}>{value["tex"]}</Col>
              <Col span={12}>{value["note"]}</Col>
            </Row>
          </List>
        );
        num = num + 1;
      }
    }
    return items;
  };

  render() {
    const { book } = this.props;
    const { uploadFile, uploading, texCommands } = this.state;

    const props = {
      onChange: this.handleChange,
      beforeUpload: this.beforeUpload,
    };

    let texCommandItems =
      texCommands.length === 0 ? (
        <p>There is no TexCommand for this book. </p>
      ) : (
        this.renderTexCommands(texCommands)
      );

    return (
      <div style={{ margin: "10px" }}>
        <Tabs defaultActiveKey="1">
          {/* view new commands */}
          <TabPane tab="Available New Commands" key="1">
            <div style={{ margin: "10px" }}>{texCommandItems}</div>
          </TabPane>
          {/* upload file */}
          <TabPane tab="Upload Commands File" key="2">
            <div style={{ margin: "10px" }}>
              <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                  <Icon type="file" />
                </p>
                <p className="ant-upload-text">
                  Click or drag file to this area to upload
                </p>
                <p className="ant-upload-hint">
                  Support for .tex or .txt file. If upload more than one file,
                  only save the most recent one.
                </p>
              </Dragger>
              <div style={{ textAlign: "center" }}>
                <Button
                  key="save"
                  type="primary"
                  onClick={() => {
                    postNewCommand(uploadFile, book.id);
                    this.setState({ uploadFile: null });
                  }}
                  disabled={uploadFile === null}
                  loading={uploading}
                  style={{ marginTop: 16 }}
                >
                  {uploading ? "Save" : "Upload New File"}
                </Button>
              </div>
            </div>
          </TabPane>
        </Tabs>
      </div>
    );
  }
}
