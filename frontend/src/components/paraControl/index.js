import React from "react";
import { connect } from "react-redux";
import { fetchPage } from "../../actions";
import { Button, Icon, Dropdown, Menu, Popover, message } from "antd";
import AddIndex from "./addIndex";
import { getIndexTree } from "../../requests/getTree";
import AddLabel from "./addLabel";
import getLabel from "../../requests/getLabel";
import updatePara from "../../requests/updatePara";

const valueMap = {};
const SubMenu = Menu.SubMenu;

const mapStateToProps = (state) => {
  return {
    title: state.paras.title,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchPage: (id, title) => dispatch(fetchPage(id, title)),
});

class ParaControl extends React.Component {
  state = {
    visible: false,
    title: "",
    indexTree: null,
    isLabelModalVisible: false,
    label: <Icon type="loading" />,
    labelObj: null,
  };

  showModal = (title) => {
    this.setState({
      visible: true,
      title: title,
    });
  };

  toggleModal = () => {
    this.setState((prevState) => ({ visible: !prevState.visible }));
  };

  showLabelModal = () => {
    this.setState({ isLabelModalVisible: true });
  };

  toggleLabelModal = () => {
    this.setState((prevState) => ({
      isLabelModalVisible: !prevState.isLabelModalVisible,
    }));
  };

  hoverLabel = () => {
    getLabel({ paraID: this.props.id })
      .then((labelObj) => {
        this.setState({
          label: labelObj.data.content,
          labelObj: labelObj.data,
        });
      })
      .catch((error) => this.setState({ label: "" }));
  };

  loops = (list, parent) => {
    return (list || []).map(({ children, value, title }) => {
      const node = (valueMap[value] = {
        parent,
        value,
        title,
      });
      node.children = this.loops(children, node);
      return node;
    });
  };

  fetchIndexTree = (type) => {
    getIndexTree(this.props.parentId, type).then((data) => {
      if (!data || data.status !== 200) {
        console.error("FETCH_TREE_FAILED", data);
      } else {
        this.setState({
          indexTree: data.data,
        });
        this.loops(this.state.indexTree);
      }
    });
  };

  moveParaUp = () => {
    const request_body = { action: -1 };
    updatePara(request_body, this.props.id).then((data) => {
      if (!data || data.status !== 200) {
        if (data.status === 400) {
          message.error(data.data);
        }
        console.error("Update Para error", request_body, data);
      } else {
        this.props.fetchPage(this.props.pageId, this.props.title);
      }
    });
  };

  moveParaDown = () => {
    const request_body = { action: 1 };
    updatePara(request_body, this.props.id).then((data) => {
      if (!data || data.status !== 200) {
        if (data.status === 400) {
          message.error(data.data);
        }
        console.error("Update Para error", request_body, data);
      } else {
        this.props.fetchPage(this.props.pageId, this.props.title);
      }
    });
  };

  render() {
    const { visible, title, isLabelModalVisible } = this.state;

    const menu = (
      <Menu>
        <SubMenu
          key="sub-index"
          title={
            <span>
              <Icon type="bars" />
              Index
            </span>
          }
        >
          <Menu.Item
            key="index"
            onClick={() => {
              this.showModal("Index Item");
              this.fetchIndexTree("Index Item");
            }}
          >
            Index Item
          </Menu.Item>
          <Menu.Item
            key="symbol"
            onClick={() => {
              this.showModal("Symbol Index");
              this.fetchIndexTree("Symbol Index");
            }}
          >
            Symbol Index
          </Menu.Item>
          <Menu.Item
            key="author"
            onClick={() => {
              this.showModal("Author Index");
              this.fetchIndexTree("Author Index");
            }}
          >
            Author Index
          </Menu.Item>
        </SubMenu>

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
          onClick={() => this.props.delete(this.props.id)}
        >
          <Icon type="delete" />
          Delete
        </Menu.Item>
      </Menu>
    );

    return (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "table-cell",
          verticalAlign: "middle",
        }}
      >
        <div>
          {/* TODO: up and down button */}
          <Button onClick={this.moveParaUp}>
            <Icon type="up" />
          </Button>
        </div>
        <Dropdown overlay={menu}>
          <Button>
            <Icon type="ellipsis" />
          </Button>
        </Dropdown>
        <div>
          <Button onClick={this.moveParaDown}>
            <Icon type="down" />
          </Button>
        </div>
        <AddIndex
          title={title}
          visible={visible}
          id={this.props.id}
          toggleModal={this.toggleModal}
          indexTree={this.state.indexTree}
          valueMap={valueMap}
          getNewIndexTree={(type) => this.fetchIndexTree(type)}
        />
        {isLabelModalVisible ? (
          <AddLabel
            visible={isLabelModalVisible}
            paraID={this.props.id}
            toggleModal={this.toggleLabelModal}
            bookID={this.props.bookID}
            label={this.state.labelObj}
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ParaControl);
