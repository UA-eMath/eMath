import React from "react";
import { Button, Icon, message, Switch, Tooltip } from "antd";

import { connect } from "react-redux";
import { fetchPage, loadPage, loadPageError } from "../../actions";
import AddSubLevel from "../paraEditor/addSubLevel";
import postLevel from "../../requests/postLevel";
import postPara from "../../requests/postPara";
import AddImage from "./addImage";

const mapStateToProps = (state) => {
  return {
    data: state.paras.paras,
    status: state.paras.status,
  };
};

const mapDispatchToProps = (dispatch) => ({
  loadPage: (id) => dispatch(loadPage(id)),
  loadPageError: (error) => dispatch(loadPageError(error)),
  fetchPage: (id, title) => dispatch(fetchPage(id, title)),
});

const ButtonGroup = Button.Group;

class EditorToolBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      imageVisible: false,
    };
  }

  showModal = () => {
    this.setState({
      visible: true,
      loading: false,
    });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  getItemById(id) {
    let flatState = this.props.data.flat(Infinity);
    return flatState[flatState.findIndex((i) => i.id === id)];
  }

  addSubLevel = () => {
    const { form } = this.formRef.props;

    this.setState({ loading: true });

    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      let request_body;
      //create new level under selected parent level

      let position = null;
      let parentId = this.props.parent;
      if (this.props.focusedArea !== null) {
        //behind on focused area
        let focusedPara = this.getItemById(this.props.focusedArea);
        if (typeof focusedPara !== "undefined") {
          //the position para want to be put
          position = focusedPara.position + 1;
          //check if inside a sub level
          if (parentId !== focusedPara.para_parent.id) {
            parentId = focusedPara.para_parent.id;
          }
        }
      }

      request_body = JSON.stringify({
        ...values,
        isPage: false,
        parent: parentId,
        position: position,
      });

      postLevel(request_body)
        .then((data) => {
          if (!data || data.status !== 200) {
            message.error("Submit failed", data);
          } else {
            return data.data.id;
          }
        })
        .then((res) => {
          request_body = JSON.stringify({
            content: {
              data: "",
            },
            para_parent: res,
          });
          postPara(request_body).then((data) => {
            if (!data || data.status !== 200) {
              message.error("Failed to add para", data);
            } else {
              this.props.fetchPage(this.props.parent, this.props.parentTitle);
            }
          });
        });

      form.resetFields();
      this.setState({
        visible: false,
        loading: false,
      });
    });
  };

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  };

  addImage = () => {
    this.setState({
      imageVisible: true,
    });
  };

  hideImageModel = () => {
    this.setState({
      imageVisible: false,
    });
  };

  render() {
    return (
      <div
        style={{
          background: "#F3F3F3",
          padding: "10px 10px 10px",
        }}
      >
        <ButtonGroup>
          <Tooltip placement="bottom" title={"Add one paragraph"}>
            <Button
              onClick={() => this.props.addPara()}
              style={{
                width: "100px",
              }}
            >
              Add Para
            </Button>
          </Tooltip>

          <Tooltip placement="bottom" title={"Add content block"}>
            <Button
              onClick={() => this.showModal()}
              style={{
                width: "100px",
              }}
            >
              Add Level
            </Button>

            <AddSubLevel
              wrappedComponentRef={this.saveFormRef}
              visible={this.state.visible}
              onCancel={this.handleCancel}
              onCreate={this.addSubLevel}
              onDelete={this.handleDelete}
              loading={this.state.loading}
            />
          </Tooltip>

          <Tooltip placement="bottom" title={"Image"}>
            <Button onClick={() => this.addImage()}>
              <Icon type="file-image" />
            </Button>
          </Tooltip>

          <Tooltip placement="bottom" title={"Save"}>
            <Button
              type="primary"
              icon="save"
              loading={this.props.uploading}
              onClick={() => this.props.uploadingData()}
            />
          </Tooltip>

          <AddImage
            visible={this.state.imageVisible}
            hideImageModel={this.hideImageModel}
            addPara={this.props.addPara}
          />
        </ButtonGroup>

        <div style={{ padding: "0 10px", display: "inline" }}>
          <Switch
            checkedChildren="LR"
            unCheckedChildren="TB"
            defaultChecked
            onChange={this.props.switchView}
          />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditorToolBar);
