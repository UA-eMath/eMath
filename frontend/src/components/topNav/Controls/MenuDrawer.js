import React from "react";
import { Tree, Drawer, Tabs, Icon, Button, Tooltip } from "antd";
import "antd/dist/antd.css";
import { connect } from "react-redux";
import {
  getPageToChange,
  openNewWindow,
  minimizeWindow,
} from "../../../actions";
import fetchTocTree from "./treeData";
import { getIndexTree } from "../../../requests/getTree";
import paraRenderer from "../../../pageRenderer";
import { setReadCache } from "../../../utils/setReadCache";
import IndexItemPopover from "./IndexItemPopover";

const { TreeNode } = Tree;
const { TabPane } = Tabs;

const styles = {
  Icon: {
    fontSize: "25px",
    color: "#44A0D1",
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

const indexedItemsKeys = [];
const generateIndexedItemsList = (data) => {
  for (let i = 0; i < data.length; i++) {
    const node = data[i];
    indexedItemsKeys.push((node.tocTitle + node.id).toString());
  }
};

class MenuDrawer extends React.Component {
  _isMounted = false;
  state = {
    treeData: [],
    indexItem: [],
    symbolIndex: [],
    authorIndex: [],
    bibliography: [],
    visible: false,
    expandAllIndexedItems: false,
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
    getIndexTree(id, "Symbol Index Item").then((data) => {
      if (!data || data.status !== 200) {
        console.error("FETCH_Symbol_Index_FAILED", data);
      } else {
        if (this._isMounted) {
          this.setState({ symbolIndex: data.data });
        }
      }
    });
    getIndexTree(id, "Author Index Item").then((data) => {
      if (!data || data.status !== 200) {
        console.error("FETCH_Author_Index_FAILED", data);
      } else {
        if (this._isMounted) {
          this.setState({ authorIndex: data.data });
        }
      }
    });
    // TODO: get bibliography used in current book (not supported API right now)
  }

  onIndexedItemExpand = (expandedKeys) => {
    if (this._isMounted) {
      this.setState({
        expandedIndexedItemsKey: expandedKeys,
      });
    }
  };

  expandAllIndexedItems = () => {
    generateIndexedItemsList(this.state.indexItem);

    this.setState((prevState) => ({
      expandAllIndexedItems: !prevState.expandAllIndexedItems,
      expandedIndexedItemsKey: !prevState.expandAllIndexedItems
        ? indexedItemsKeys
        : [],
    }));
  };

  render() {
    let {
      treeData,
      indexItem,
      symbolIndex,
      authorIndex,
      bibliography,
      expandedIndexedItemsKey,
    } = this.state;

    const tocPane = (
      <TabPane tab="TOC" key="1">
        <Tree
          switcherIcon={<Icon type="down" />}
          style={styles.Tree}
          defaultExpandAll={true}
        >
          {this.renderTreeNodes(treeData.slice(1), true)}
        </Tree>
      </TabPane>
    );

    let isoData = treeData.slice(0, 1);
    if (treeData !== undefined) {
      if (treeData.length > 0) {
        isoData = treeData.slice(0, 1)[0].children;
      }
    }

    const isoPane = (
      <TabPane tab="ISO" key="2">
        <Tree
          switcherIcon={<Icon type="down" />}
          style={styles.Tree}
          defaultExpandAll={true}
        >
          {this.renderTreeNodes(isoData, false)}
        </Tree>
      </TabPane>
    );

    const indexItemPane = (
      <TabPane tab="Subject" key="3">
        <div style={{ marginBottom: 16, float: "right" }}>
          <Button type="link" onClick={this.expandAllIndexedItems}>
            Expand All
          </Button>
        </div>
        <Tree
          switcherIcon={<Icon type="down" />}
          style={styles.Tree}
          onExpand={this.onIndexedItemExpand}
          expandedKeys={expandedIndexedItemsKey}
        >
          {this.renderIndexNodes(indexItem)}
        </Tree>
      </TabPane>
    );

    const symbolPane = (
      <TabPane tab="Math Notation" key="4">
        <Tree switcherIcon={<Icon type="down" />} style={styles.Tree}>
          {this.renderIndexNodes(symbolIndex)}
        </Tree>
      </TabPane>
    );

    let authorIndPane = (
      <TabPane tab="Scientist" key="5">
        <Tree switcherIcon={<Icon type="down" />} style={styles.Tree}>
          {this.renderIndexNodes(authorIndex)}
        </Tree>
      </TabPane>
    );

    const refsPane = (
      <TabPane tab="Refs" key="6">
        <Tree switcherIcon={<Icon type="down" />} style={styles.Tree}>
          {this.renderIndexNodes(bibliography)}
        </Tree>
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
          style={{ fontSize: "24px", marginTop: "60px" }}
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
            {tocPane}
            {isoPane}
            {indexItemPane}
            {symbolPane}
            {authorIndPane}
            {refsPane}
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

  getFirstElement = (array) => {
    if (array) {
      return array[0];
    } else {
      return array;
    }
  };

  renderIndexNodes = (data) => {
    return data.map((item) => {
      if (item.children) {
        return (
          <TreeNode
            title={
              item.id && item.id.length > 1 ? (
                <span>
                  {paraRenderer(item.tocTitle, true)}{" "}
                  {item.id.map((id) => {
                    return (
                      <IndexItemPopover
                        item={item}
                        paraId={id}
                        replaceWindow={this.replaceWindow}
                        onWindowOpen={this.props.onWindowOpen}
                        onClose={this.onClose}
                      />
                    );
                  })}
                </span>
              ) : (
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
              )
            }
            key={item.tocTitle + this.getFirstElement(item.id)}
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
