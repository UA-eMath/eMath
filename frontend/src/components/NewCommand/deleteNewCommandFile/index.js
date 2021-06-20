import React from "react";
import { Icon, List, Modal, Button } from "antd";
import putNewCommand from "../../../requests/putNewCommand";

const { confirm } = Modal;

export default class DeleteNewCommandFile extends React.Component {
  deleteCommand = () => {
    confirm({
      title: "Are you sure delete this new command file?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: () => {
        const { filename, bookId, texCommandsOnChange } = this.props;
        putNewCommand({ [filename]: null }, bookId);
        texCommandsOnChange(filename, null);
      },
      onCancel() {},
    });
  };

  render() {
    return (
      <>
        <List key={"delete"} style={{ textAlign: "center", marginTop: 8 }}>
          <Button
            type="link"
            onClick={this.deleteCommand}
            block
            style={{ color: "#EF8079" }}
          >
            <Icon type="delete" /> Delete File
          </Button>
        </List>
      </>
    );
  }
}
