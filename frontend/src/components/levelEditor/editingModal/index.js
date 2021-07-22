import React from "react";
import { Menu, Dropdown, Popover, Icon, message } from "antd";
import postLevel from "../../../requests/postLevel";
import updateLevel from "../../../requests/updateLevel";
import removeLevel from "../../../requests/removeLevel";
import LevelForm from "./levelForm";
import SubLevelTag from "./subLevelTag";
import { connect } from "react-redux";
import { fetchPage } from "../../../actions";
import getLabel from "../../../requests/getLabel";
import AddLabel from "../../paraControl/addLabel";
import paraRenderer from "../../../pageRenderer";

const mapStateToProps = (state) => {
  return {
    status: state.paras.status,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchPage: (id, title) => dispatch(fetchPage(id, title)),
});

class EditingModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      modifyState: "",
      loading: false,
      label: <Icon type="loading" />,
      labelObj: null,
      isLabelModalVisible: false,
    };
    this._isMounted = false;
  }

  showLabelModal = () => {
    this.setState({ isLabelModalVisible: true });
  };

  toggleLabelModal = () => {
    this.setState((prevState) => ({
      isLabelModalVisible: !prevState.isLabelModalVisible,
    }));
  };

  hoverLabel = () => {
    getLabel({ levelID: this.props.item.id })
      .then((labelObj) => {
        this.setState({
          label: labelObj.data.content,
          labelObj: labelObj.data,
        });
      })
      .catch((error) => this.setState({ label: "" }));
  };

  showModal = (state) => {
    this.setState({
      visible: true,
      modifyState: state,
    });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  };

  handleCreate = () => {
    const { form } = this.formRef.props;

    this.setState({ loading: true });

    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      if (values.tocTitle === "" && values.title !== "") {
        values.tocTitle = values.title;
      }
      // values.isPage = (values.isPage === "true");

      let request_body;

      if (this.state.modifyState === "New") {
        //create new level under selected parent level
        request_body = JSON.stringify({
          ...values,
          parent: this.props.item.id,
        });
        postLevel(request_body).then((data) => {
          if (!data || data.status !== 200) {
            console.error("Submit failed", data);
          } else {
            this.props.updateTree();
          }
        });
      } else {
        //modify selected parent Level
        request_body = JSON.stringify({ ...values });
        updateLevel(request_body, this.props.item.id).then((data) => {
          if (!data || data.status !== 200) {
            console.error("Update error", data);
          } else {
            this.props.updateTree();
          }
        });
      }

      form.resetFields();
      this.setState({
        visible: false,
        modifyState: "",
        loading: false,
      });
    });
  };

  handleDelete = () => {
    const { form } = this.formRef.props;
    // if ISO section
    if (this.props.item.position === -1) {
      message.error("Internal subordinate level cannot be deleted!");
      this.setState({
        visible: false,
        modifyState: "",
      });
      return;
    }
    this.setState({ loading: true });
    removeLevel(this.props.item.id).then((data) => {
      if (data.status !== 200) {
        console.error("Delete error", data);
      } else {
        this.props.updateTree();
      }
    });

    form.resetFields();
    this.setState({
      visible: false,
      modifyState: "",
      loading: false,
    });
  };

  copyToClipboard = (textToCopy) => {
    // navigator clipboard api needs a secure context (https)
    if (navigator.clipboard && window.isSecureContext) {
      // navigator clipboard api method'
      return navigator.clipboard.writeText(textToCopy);
    } else {
      // text area method
      let textArea = document.createElement("textarea");
      textArea.value = textToCopy;
      // make the textarea out of viewport
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      textArea.style.top = "-999999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      return new Promise((res, rej) => {
        // here the magic happens
        document.execCommand("copy") ? res() : rej();
        textArea.remove();
      });
    }
  };

  render() {
    const { item, fetchPage, changePaneSize, insertable } = this.props;

    const menu = insertable ? (
      <Menu>
        <Menu.Item
          key="editing-modal-new"
          onClick={() => {
            this.showModal("New");
          }}
        >
          <Icon type="plus" />
          New
        </Menu.Item>
        <Menu.Item
          key="editing-modal-edit"
          onClick={() => {
            this.showModal("Edit");
          }}
        >
          <Icon type="edit" />
          Edit
        </Menu.Item>
        <Menu.Item
          key="editing-modal-remove"
          onClick={() => {
            this.showModal("Remove");
          }}
        >
          <Icon type="delete" />
          Remove
        </Menu.Item>
        <Menu.Item key="editing-modal-label" onClick={this.showLabelModal}>
          <Popover
            placement="left"
            title="Label"
            content={this.state.label}
            onMouseEnter={this.hoverLabel}
          >
            <Icon type="tag-o" />
            Add Label
          </Popover>
        </Menu.Item>
      </Menu>
    ) : (
      <Menu>
        <Menu.Item
          key="editing-modal-edit"
          onClick={() => {
            this.showModal("Edit");
          }}
        >
          <Icon type="edit" />
          Edit
        </Menu.Item>
        <Menu.Item
          key="editing-modal-remove"
          onClick={() => {
            this.showModal("Remove");
          }}
        >
          <Icon type="delete" />
          Remove
        </Menu.Item>
        <Menu.Item
          key="editing-modal-get-linkable-tag"
          onClick={() => {
            if (this.state.labelObj) {
              const linkableTag = `<iLink id="${this.state.labelObj.id.toString()}"></iLink>`;
              //does not support safari browser
              this.copyToClipboard(linkableTag)
                .then(() => message.success("Linkable Tag Copied!"))
                .catch(() => message.error("Failed to copy."));
            } else {
              message.error("Please create a label first!");
            }
          }}
        >
          <Popover
            placement="left"
            title="Linkable Tag"
            content={
              this.state.labelObj
                ? `<iLink id="${this.state.labelObj.id.toString()}"></iLink>`
                : this.state.label
            }
            onMouseEnter={this.hoverLabel}
          >
            <Icon type="link" />
            Get linkable tag
          </Popover>
        </Menu.Item>
        <Menu.Item key="editing-modal-label" onClick={this.showLabelModal}>
          <Popover
            placement="bottom"
            content={this.state.label}
            title="Label"
            onMouseEnter={this.hoverLabel}
          >
            <Icon type="tag-o" />
            Add Label
          </Popover>
        </Menu.Item>
      </Menu>
    );

    return (
      <span
        onDoubleClick={() => {
          if (item.isPage) {
            fetchPage(item.id, item.title);
            changePaneSize(300);
          }
        }}
      >
        <Dropdown overlay={menu} trigger={["contextMenu"]}>
          <span style={{ userSelect: "none" }}>
            <SubLevelTag title={item.tocTitle} />
            {paraRenderer(item.title, true)}
          </span>
        </Dropdown>

        <LevelForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
          onDelete={this.handleDelete}
          modifyState={this.state.modifyState}
          parent={item}
          loading={this.state.loading}
        />
        {this.state.isLabelModalVisible ? (
          <AddLabel
            visible={this.state.isLabelModalVisible}
            levelID={this.props.item.id}
            toggleModal={this.toggleLabelModal}
            bookID={this.props.bookID}
            label={this.state.labelObj}
          />
        ) : (
          ""
        )}
      </span>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditingModal);
