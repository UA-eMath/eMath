import React from "react";
import { Menu, Dropdown, Popover, Icon } from "antd";
import postLevel from "../../../requests/postLevel";
import updateLevel from "../../../requests/updateLevel";
import removeLevel from "../../../requests/removeLevel";
import LevelForm from "./levelForm";
import SubLevelTag from "./subLevelTag";
import { connect } from "react-redux";
import { fetchPage } from "../../../actions";
import getLabel from "../../../requests/getLabel";
import AddLabel from "../../paraControl/addLabel";

const mapStateToProps = (state) => {
  return {
    data: state.paras.data,
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
      label: "",
      isLabelModalVisible: false,
    };
    this._isMounted = false;
  }

  async componentDidMount() {
    this._isMounted = true;
    const labelObj = await getLabel({ paraID: this.props.id });
    if (typeof labelObj !== "undefined" && this._isMounted) {
      this.setState({ label: labelObj.data.content });
    }
  }

  componentWillUnmount() {
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
        updateLevel(request_body, this.props.parent.id).then((data) => {
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
          New...
        </Menu.Item>
        <Menu.Item
          key="editing-modal-edit"
          onClick={() => {
            this.showModal("Edit");
          }}
        >
          Edit
        </Menu.Item>
        <Menu.Item
          key="editing-modal-remove"
          onClick={() => {
            this.showModal("Remove");
          }}
        >
          Remove
        </Menu.Item>
        <Menu.Item key="editing-modal-label" onClick={this.showLabelModal}>
          <Popover placement="left" content={this.state.label} title="Label">
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
          Edit
        </Menu.Item>
        <Menu.Item
          key="editing-modal-remove"
          onClick={() => {
            this.showModal("Remove");
          }}
        >
          Remove
        </Menu.Item>
        <Menu.Item
          key="editing-modal-get-linkable-tag"
          onClick={() => {
            //does not support safari browser
            navigator.clipboard.writeText(
              '<iLink id="' + item.id.toString() + '"></iLink>'
            );
          }}
        >
          Get linkable tag
        </Menu.Item>
        <Menu.Item key="editing-modal-label" onClick={this.showLabelModal}>
          <Popover placement="left" content={this.state.label} title="Label">
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
            {item.id + item.title + item.position.toString()}
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
        <AddLabel
          visible={this.state.isLabelModalVisible}
          levelID={this.props.item.id}
          toggleModal={this.toggleLabelModal}
          bookID={this.props.bookID}
        />
      </span>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditingModal);
