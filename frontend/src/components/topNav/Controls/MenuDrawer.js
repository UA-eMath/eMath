import React from "react";
import fetchTocTree from "./treeData";
import { Tree } from "antd";
import { Drawer, Tabs, Icon, Button, Tooltip } from "antd";
import "antd/dist/antd.css";
import { connect } from "react-redux";
import {
  getPageToChange,
  openNewWindow,
  minimizeWindow,
} from "../../../actions";
import { getIndexTree } from "../../../requests/getTree";
import paraRenderer from "../../../pageRenderer";
import { setReadCache } from "../../../utils/setReadCache";

const { TreeNode } = Tree;
const { TabPane } = Tabs;

const styles = {
  Icon: {
    fontSize: "25px",
    color: "lightGrey",
  },
  Tree: {
    fontSize: "20px",
  },
  DivPos: {
    float: "left",
  },
};

const mapStateToProps = (state) => {
  return {
    items: state.windows.items,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onWindowOpen: (content, isPage) => dispatch(openNewWindow(content, isPage)),
  getPageToChange: (id) => dispatch(getPageToChange(id)),
  minimizeWindow: (id, title, content, isPage) =>
    dispatch(minimizeWindow(id, title, content, isPage)),
});

class MenuDrawer extends React.Component {
  _isMounted = false;
  state = {
    treeData: [],
    indexItem: [],
    symbolIndex: [],
    authorIndex: [],
    bibliography: [],
    visible: false,
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
    let id = this.props.props.params.id;
    fetchTocTree(id, (data) => {
      if (this._isMounted) {
        this.setState({ treeData: data });
      }
    });

    getIndexTree(id, "Index Item").then((data) => {
      if (!data || data.status !== 200) {
        console.error("FETCH_IndexItem_FAILED", data);
      } else {
        if (this._isMounted) {
          this.setState({ indexItem: data.data });
        }
      }
    });
    getIndexTree(id, "Symbol Index").then((data) => {
      if (!data || data.status !== 200) {
        console.error("FETCH_Symbol_Index_FAILED", data);
      } else {
        if (this._isMounted) {
          this.setState({ symbolIndex: data.data });
        }
      }
    });
    getIndexTree(id, "Author Index").then((data) => {
      if (!data || data.status !== 200) {
        console.error("FETCH_Author_Index_FAILED", data);
      } else {
        if (this._isMounted) {
          this.setState({ authorIndex: data.data });
        }
      }
    });
  }

  render() {
    let { indexItem, symbolIndex, authorIndex, bibliography } = this.state;

    let indexItemPane =
      indexItem.length === 0 ? null : (
        <TabPane tab="Index Item" key="3">
          <Tree
            switcherIcon={<Icon type="down" />}
            style={styles.Tree}
            defaultExpandAll={true}
          >
            {this.renderIndexNodes(indexItem)}
          </Tree>
        </TabPane>
      );

    let symbolPane =
      symbolIndex.length === 0 ? null : (
        <TabPane tab="Symbols" key="4">
          <Tree
            switcherIcon={<Icon type="down" />}
            style={styles.Tree}
            defaultExpandAll={true}
          >
            {this.renderIndexNodes(symbolIndex)}
          </Tree>
        </TabPane>
      );

    let authorIndPane =
      authorIndex.length === 0 ? null : (
        <TabPane tab="A-Ind" key="6">
          <Tree
            switcherIcon={<Icon type="down" />}
            style={styles.Tree}
            defaultExpandAll={true}
          >
            {this.renderIndexNodes(authorIndex)}
          </Tree>
        </TabPane>
      );

    let refsPane =
      bibliography.length === 0 ? null : (
        <TabPane tab="Refs" key="5">
          Content of Tab Pane 3
        </TabPane>
      );

    return (
      <div style={styles.DivPos}>
        <Tooltip title="Menu">
          <Icon type="read" onClick={this.showDrawer} style={styles.Icon} />
        </Tooltip>
        <Drawer
          placement="right"
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
          width={"50%"}
          style={{ fontSize: "25px", marginTop: "53px" }}
        >
          <Button
            style={{ float: "right" }}
            type="normal"
            onClick={() => {
              this.onClose();
            }}
          >
            <Icon type="right" />
          </Button>

          <Tabs defaultActiveKey="1">
            <TabPane tab="TOC" key="1">
              <Tree
                switcherIcon={<Icon type="down" />}
                style={styles.Tree}
                defaultExpandAll={true}
              >
                {this.renderTreeNodes(this.state.treeData.slice(1), true)}
              </Tree>
            </TabPane>

            <TabPane tab="ISO" key="2">
              <Tree
                switcherIcon={<Icon type="down" />}
                style={styles.Tree}
                defaultExpandAll={true}
              >
                {this.renderTreeNodes(this.state.treeData.slice(0, 1), false)}
              </Tree>
            </TabPane>

            {indexItemPane}
            {symbolPane}
            {refsPane}
            {authorIndPane}
          </Tabs>
        </Drawer>
      </div>
    );
  }

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  replaceWindow = () => {
    if (this.props.items.length > 1) {
      const exceptFirst = this.props.items.slice(1);
      exceptFirst.forEach((preWindow) => {
        this.props.minimizeWindow(
          preWindow.i,
          preWindow.title,
          preWindow.content,
          preWindow.isPage
        );
      });
    }
  };

  renderIndexNodes = (data) => {
    return data.map((item) => {
      if (item.children) {
        return (
          <TreeNode
            title={
              <a
                href
                onClick={() => {
                  this.replaceWindow();
                  this.props.onWindowOpen(item, false);
                  this.onClose();
                }}
              >
                {paraRenderer(item.tocTitle, true)}
              </a>
            }
            key={item.tocTitle + item.id}
            dataRef={item}
            selectable={false}
          >
            {this.renderIndexNodes(item.children)}
          </TreeNode>
        );
      } else return <TreeNode key={item.key} {...item} selectable={false} />;
    });
  };

  renderTreeNodes = (data, isTOC) =>
    data
      .filter((item) => {
        return item.tocTitle !== null;
      })
      .map((item) => {
        if (item.children) {
          if (item.isPage) {
            return (
              <TreeNode
                title={
                  <a
                    href
                    onClick={() => {
                      if (isTOC) {
                        this.props.getPageToChange(item.id);
                        setReadCache(this.props.props.params.id, item.id);
                      } else {
                        this.replaceWindow();
                        this.props.onWindowOpen(item, true);
                      }
                      this.onClose();
                    }}
                  >
                    {paraRenderer(item.tocTitle, true)}
                  </a>
                }
                key={item.id}
                dataRef={item}
                selectable={false}
              />
            );
          }
          return (
            <TreeNode
              title={paraRenderer(item.tocTitle, true)}
              key={item.id}
              dataRef={item}
              selectable={false}
            >
              {this.renderTreeNodes(item.children, isTOC)}
            </TreeNode>
          );
        }

        return <TreeNode key={item.id} {...item} selectable={false} />;
      });
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuDrawer);
