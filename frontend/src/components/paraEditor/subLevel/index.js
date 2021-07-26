import React from "react";
import { connect } from "react-redux";
import { fetchPage } from "../../../actions";
import _ from "lodash";
import { Button, Icon, Row, Popover, Dropdown, Menu, message } from "antd";
import removeLevel from "../../../requests/removeLevel";
import paraRenderer from "../../../pageRenderer";
import AddLabel from "../../paraControl/addLabel";
import getLabel from "../../../requests/getLabel";
import updateLevel from "../../../requests/updateLevel";
import DeleteModal from "../../deleteModal";
import ParaArea from "../../paraArea";

const mapStateToProps = (state) => {
  return {
    title: state.page.title,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchPage: (id, title) => dispatch(fetchPage(id, title)),
});

class SubLevel extends React.Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      isLabelModalVisible: false,
      label: <Icon type="loading" />,
      labelObj: null,
      visible: false,
    };
  }

  showModal = (state) => {
    this.setState({
      visible: true,
    });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  onDelete = (id) => {
    removeLevel(id).then((data) => {
      if (data.status !== 200) {
        message.error("Fail to delete level.");
        console.error("Delete error", data);
      } else {
        this.props.fetchPage(this.props.id, this.props.title);
      }
    });
  };

  showLabelModal = () => {
    this.setState({ isLabelModalVisible: true });
  };

  toggleLabelModal = () => {
    this.setState((prevState) => ({
      isLabelModalVisible: !prevState.isLabelModalVisible,
    }));
  };

  wrapPara = (alignment, item, deletePara) => {
    const bookID = this.props.bookID;
    return (
      <ParaArea
        key={item.id}
        para={item}
        bookID={bookID}
        id={this.props.id}
        sideAlign={alignment}
        setFocusArea={this.props.setFocusArea}
        deletePara={deletePara}
      />
    );
  };

  hoverLabel = () => {
    getLabel({
      levelID: this.props.children[0].para_parent.id,
    })
      .then((labelObj) => {
        this.setState({
          label: labelObj.data.content,
          labelObj: labelObj.data,
        });
      })
      .catch((error) => this.setState({ label: "" }));
  };

  moveParaUp = () => {
    //change position
    const request_body = JSON.stringify({
      action: -1,
    });
    updateLevel(request_body, this.props.children[0].para_parent.id).then(
      (data) => {
        if (!data || data.status !== 200) {
          if (data.status === 400) {
            message.error(data.data);
          }
          console.error("Update error", request_body, data);
        } else {
          this.props.fetchPage(this.props.id, this.props.title);
        }
      }
    );
  };

  moveParaDown = () => {
    const request_body = JSON.stringify({
      action: 1,
    });
    updateLevel(request_body, this.props.children[0].para_parent.id).then(
      (data) => {
        if (!data || data.status !== 200) {
          if (data.status === 400) {
            message.error(data.data);
          }
          console.error("Update error", request_body, data);
        } else {
          this.props.fetchPage(this.props.id, this.props.title);
        }
      }
    );
  };

  render() {
    const { children, alignment, deletePara, bookID, setFocusArea, fetchPage } =
      this.props;
    const { isLabelModalVisible } = this.state;
    let left_title = children[0].para_parent.tocTitle;
    let right_title =
      children[0].para_parent.title === null
        ? ""
        : paraRenderer(children[0].para_parent.title);

    let boxHeader;
    if (left_title || right_title) {
      boxHeader = (
        <div
          style={{
            background: "linear-gradient(#fdf5e8,#EAE7DC)",
            borderRadius: "2px 2px 0 0",
            padding: "2px 4px 2px 4px",
          }}
        >
          <span style={{ fontWeight: "bold" }}>{left_title}</span>
          <span style={{ float: "right", fontWeight: "bold" }}>
            {right_title}
          </span>
        </div>
      );
    }

    const sublevelMenu = (
      <Menu>
        <Menu.Item key="label" onClick={this.showLabelModal}>
          <Popover
            placement="left"
            content={this.state.label}
            title="Label"
            onMouseEnter={this.hoverLabel}
          >
            <Icon type="tag-o" />
            Add Label
          </Popover>
        </Menu.Item>
        <Menu.Item key="delete" onClick={this.showModal}>
          <Icon type="delete" />
          Delete
        </Menu.Item>
      </Menu>
    );

    let subLevelControl = (
      <div>
        <Button onClick={this.moveParaUp}>
          <Icon type="up" />
        </Button>
        <Dropdown overlay={sublevelMenu}>
          <Button>
            <Icon type="ellipsis" />
          </Button>
        </Dropdown>
        <Button onClick={this.moveParaDown}>
          <Icon type="down" />
        </Button>
      </div>
    );

    return (
      <div
        style={{
          background: "#fdf5e8",
          borderRadius: "4px",
          boxShadow: "0 0 0 1px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.35)",
          margin: "10px 0",
          paddingBottom: "16px",
        }}
      >
        <Row>{boxHeader}</Row>
        <Row>
          {_.map(children, (item, i) => {
            if (Array.isArray(item)) {
              return (
                <SubLevel
                  key={i}
                  children={item}
                  alignment={alignment}
                  deletePara={deletePara}
                  setFocusArea={setFocusArea}
                  id={this.props.id}
                  bookID={bookID}
                  fetchPage={fetchPage}
                />
              );
            } else {
              return this.wrapPara(alignment, item, deletePara);
            }
          })}
        </Row>
        <Row type="flex" justify="center">
          {subLevelControl}
        </Row>

        {this.state.isLabelModalVisible ? (
          <AddLabel
            visible={isLabelModalVisible}
            levelID={children[0].para_parent.id}
            toggleModal={this.toggleLabelModal}
            label={this.state.labelObj}
            bookID={"1"} //TODO
          />
        ) : (
          ""
        )}

        {this.state.visible ? (
          <DeleteModal
            title={`this ${children[0].para_parent.tocTitle} Level`}
            onDelete={() => this.onDelete(children[0].para_parent.id)}
            deleteContent={children[0].para_parent.title}
            visible={this.state.visible}
            onCancel={this.handleCancel}
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubLevel);
