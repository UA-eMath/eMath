import React from "react";
import { connect } from "react-redux";
import { fetchPage } from "../../../actions";
import _ from "lodash";
import {
  Button,
  Col,
  Icon,
  Modal,
  Row,
  Popover,
  Dropdown,
  Menu,
  message,
} from "antd";
import InputBox from "../../InputBox";
import DisplayArea from "../../displayArea";
import ParaControl from "../../paraControl";
import removeLevel from "../../../requests/removeLevel";
import paraRenderer from "../../../pageRenderer";
import AddLabel from "../../paraControl/addLabel";
import getLabel from "../../../requests/getLabel";
import updateLevel from "../../../requests/updateLevel";

const mapStateToProps = (state) => {
  return {
    title: state.paras.title,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchPage: (id, title) => dispatch(fetchPage(id, title)),
});

const { confirm } = Modal;
class SubLevel extends React.Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      isLabelModalVisible: false,
      label: <Icon type="loading" />,
      labelObj: null,
    };
  }

  deleteLevel = (id) => {
    confirm({
      title: "Are you sure delete this Level?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: () => {
        removeLevel(id).then((data) => {
          if (data.status !== 200) {
            message.error("Fail to delete level.");
            console.error("Delete error", data);
          } else {
            this.props.fetchPage(this.props.id, this.props.title);
          }
        });
      },
      onCancel() {},
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
    if (alignment) {
      // true: RL
      return (
        <div className="paraWrapper" key={item.id}>
          <div className="inputDiv">
            <InputBox
              id={item.id}
              bookID={bookID}
              setFocusArea={this.props.setFocusArea}
              boxValue={item.content.data}
            />
          </div>
          <DisplayArea id={item.id} />
          <ParaControl
            id={item.id}
            bookID={bookID}
            delete={deletePara}
            parentId={item.para_parent.id}
            pageId={this.props.id}
          />
        </div>
      );
    } else {
      return (
        <Row key={item.id}>
          <Col span={23}>
            <InputBox
              id={item.id}
              bookID={bookID}
              boxValue={item.content.data}
              setFocusArea={this.props.setFocusArea}
              TBview="true"
            />
            <DisplayArea id={item.id} />
          </Col>

          <Col span={1}>
            <ParaControl
              id={item.id}
              bookID={bookID}
              delete={deletePara}
              parentId={item.para_parent.id}
              pageId={this.props.id}
            />
          </Col>
        </Row>
      );
    }
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
        <Menu.Item
          key="delete"
          onClick={() => this.deleteLevel(children[0].para_parent.id)}
        >
          <Icon type="delete" />
          Delete
        </Menu.Item>
      </Menu>
    );

    // TODO: up and down button
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
          borderRadius: "2px",
          boxShadow: "0 0 0 1px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.35)",
          margin: "10px 0",
          paddingBottom: "30px",
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
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubLevel);
