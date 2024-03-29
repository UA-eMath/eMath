import React from "react";
import { Upload, message, Icon, Button, Divider, Tabs } from "antd";
import postTexShortcut from "../../requests/postTexShortcut";
import getTexShortcut from "../../requests/getTexShortcut";
import EachTexShortcut from "./eachTexShortcut";
import AddTexShortcut from "./addTexShortcut";
import DeleteTexShortcutFile from "./deleteTexShortcutFile";

const { Dragger } = Upload;
const { TabPane } = Tabs;

export default class TexShortcut extends React.Component {
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
    const texCommandFromDB = await getTexShortcut(this.props.book.id);
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
      message.error("You can only upload .cwl/.txt file!");
    }
    return false;
  };

  // When added a new command, update command list
  texCommandsOnChange = (filename, commands) => {
    const texCommands = this.state.texCommands;
    if (commands === null) {
      delete texCommands[filename];
    } else {
      texCommands[filename] = commands;
    }
    this.setState({ texCommands: texCommands });
  };

  renderTexCommands = (commands) => {
    let items = [];
    let num = 0;
    for (const filename in commands) {
      items.push(
        <div>
          <Divider key={num}>{filename} </Divider>
          {commands[filename].map((command, index) => (
            <EachTexShortcut
              bookId={this.props.book.id}
              filename={filename}
              command={command}
              index={index}
              allCommands={commands[filename]}
            />
          ))}
          <AddTexShortcut
            bookId={this.props.book.id}
            filename={filename}
            allCommands={commands[filename]}
            texCommandsOnChange={this.texCommandsOnChange}
          />
          <DeleteTexShortcutFile
            bookId={this.props.book.id}
            filename={filename}
            texCommandsOnChange={this.texCommandsOnChange}
          />
        </div>
      );
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
      Object.keys(texCommands).length === 0 || texCommands.length === 0 ? (
        <p>There is no TexCommand for this book. </p>
      ) : (
        this.renderTexCommands(texCommands)
      );

    return (
      <div style={{ margin: "10px" }}>
        <Tabs defaultActiveKey="1">
          <TabPane tab="Available Tex Assist" key="1">
            <div style={{ margin: "10px" }}>{texCommandItems}</div>
          </TabPane>
          <TabPane tab="Upload Shortcuts File" key="2">
            <div style={{ margin: "10px" }}>
              <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                  <Icon type="file" />
                </p>
                <p className="ant-upload-text">
                  Click or drag file to this area to upload
                </p>
                <p className="ant-upload-hint">
                  Support for .cwl or .txt file. If upload more than one file,
                  only save the most recent one.
                </p>
              </Dragger>
              <div style={{ textAlign: "center" }}>
                <Button
                  key="save"
                  type="primary"
                  onClick={() => {
                    postTexShortcut(uploadFile, book.id);
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
