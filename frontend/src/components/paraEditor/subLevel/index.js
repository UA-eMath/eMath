import React from "react";
import _ from "lodash";
import { Button, Col, Icon, Modal, Row, Popover, Dropdown, Menu } from "antd";
import InputBox from "../../InputBox";
import DisplayArea from "../../displayArea";
import ParaControl from "../../paraControl";
import removeLevel from "../../../requests/removeLevel";
import { connect } from "react-redux";
import { fetchPage } from "../../../actions";
import paraRenderer from "../../../pageRenderer";
import AddLabel from "../../paraControl/addLabel";
import getLabel from "../../../requests/getLabel";

const { confirm } = Modal;

const mapStateToProps = (state) => {
  return {
    title: state.paras.title,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchPage: (id, title) => dispatch(fetchPage(id, title)),
});

class SubLevel extends React.Component {
  _isMounted = false;
  state = {
    isLabelModalVisible: false,
    label: <Icon type="loading" />,
    labelObj: null,
  };

  deleteLevel = (id) => {
    confirm({
      title: "Are you sure delete this Level?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: () => {
        removeLevel(id).then((data) => {
          if (data.status !== 200) {
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
  render() {
    const { children, alignment, deletePara, bookID } = this.props;
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
          <Col span={12}>
            <b>{left_title}</b>
          </Col>
          <Col span={12}>{right_title}</Col>
        </div>
      );
    }

    let content = _.map(children, (item, i) => {
      // TODO: only handle one layer
      if (Array.isArray(item)) {
        return (
          <SubLevel
            key={i}
            children={item}
            alignment={alignment}
            deletePara={deletePara}
            setFocusArea={this.props.setFocusArea}
            id={this.props.id}
            bookID={bookID}
          />
        );
      } else {
        return this.wrapPara(alignment, item, deletePara);
      }
    });

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

    let subLevelControl = (
      <div>
        <Button>
          <Icon type="up" />
        </Button>
        <Dropdown overlay={sublevelMenu}>
          <Button>
            <Icon type="ellipsis" />
          </Button>
        </Dropdown>
        <Button>
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
        <Row>{content}</Row>
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
