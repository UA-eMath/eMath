import React from "react";
import { Button, Icon, Dropdown, Menu, Popover } from "antd";
import AddIndex from "./addIndex";
import { getIndexTree } from "../../requests/getTree";
import AddLabel from "./addLabel";
import getLabel from "../../requests/getLabel";

const valueMap = {};
const SubMenu = Menu.SubMenu;

export default class ParaControl extends React.Component {
  state = {
    visible: false,
    title: "",
    indexTree: null,
    isLabelModalVisible: false,
    label: "",
  };

  async componentDidMount() {
    const labelObj = await getLabel(this.props.id);
    if (typeof labelObj !== "undefined") {
      this.setState({ label: labelObj.data.content });
    }
  }

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
          <Popover placement="left" content={this.state.label} title="Label">
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
        }}
      >
        <div>
          <Button>
            <Icon type="up" />
          </Button>
        </div>
        <Dropdown overlay={menu}>
          <Button>
            <Icon type="ellipsis" />
          </Button>
        </Dropdown>
        <div>
          <Button>
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
        <AddLabel
          visible={isLabelModalVisible}
          paraID={this.props.id}
          toggleModal={this.toggleLabelModal}
          bookID={this.props.bookID}
        />
      </div>
    );
  }
}
