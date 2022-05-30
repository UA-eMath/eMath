import React from "react";
import { Icon, List, Modal, Button } from "antd";
import putTexShortcut from "../../../requests/putTexShortcut";

const { confirm } = Modal;

export default class DeleteTexShortcutFile extends React.Component {
  deleteCommand = () => {
    confirm({
      title: "Are you sure delete this tex shortcut file?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: () => {
        const { filename, bookId, texCommandsOnChange } = this.props;
        putTexShortcut({ [filename]: null }, bookId);
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
