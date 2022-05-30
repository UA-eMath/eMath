import React from "react";
import { Upload, message, Icon, Button, Divider, Tabs } from "antd";
import postNewCommand from "../../requests/postNewCommand";
import getNewCommand from "../../requests/getNewCommand";
import EachNewCommand from "./eachNewCommand";
import AddNewCommand from "./addNewCommand";
import DeleteNewCommandFile from "./deleteNewCommandFile";

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
            <EachNewCommand
              bookId={this.props.book.id}
              filename={filename}
              command={command}
              index={index}
              allCommands={commands[filename]}
            />
          ))}
          <AddNewCommand
            bookId={this.props.book.id}
            filename={filename}
            allCommands={commands[filename]}
            texCommandsOnChange={this.texCommandsOnChange}
          />
          <DeleteNewCommandFile
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
                <p className="ant-upload-hint">
                  Note: The order of the listing of \newcommands should be done
                  in the file to be uploaded.
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
