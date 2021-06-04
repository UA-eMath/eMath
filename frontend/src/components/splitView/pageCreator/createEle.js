import React from "react";
import styles from "../styles/style";
import Scrollbars from "react-custom-scrollbars";
import TitleBar from "../../titleBar";
import { connect } from "react-redux";
import { closeWindow, minimizeWindow, onLayoutChange } from "../../../actions";
import getPage from "../../../requests/getPage";
import getPara from "../../../requests/getPara";
import _ from "lodash";
import paraRenderer from "../../../pageRenderer";
import { Tabs } from "antd";
import getNextLevel from "../../../requests/getNextLevel";
import getLevel from "../../../requests/getLevel";

const { TabPane } = Tabs;

const mapStateToProps = (state) => {
  return { items: state.windows.items };
};

const mapDispatchToProps = (dispatch) => ({
  onCloseWindow: (id) => dispatch(closeWindow(id)),
  minimizeWindow: (id, title, content, isPage) =>
    dispatch(minimizeWindow(id, title, content, isPage)),
  onLayoutChange: (layout) => dispatch(onLayoutChange(layout)),
});

class CreateElement extends React.Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      paraText: [],
      pageTitle: null,
      context: null,
    };
  }

  async componentDidMount() {
    this._isMounted = true;
    //this.props['data-grid'] stores this window's information
    let pageContent;
    let context;
    const content = this.props["data-grid"].content;
    const id = content.id;
    // for label or index
    if (content.linkTo === "para" || content.levelParent) {
      pageContent = await getPara({ id: id });
      pageContent.data = [pageContent.data];
      context = await getNextLevel({ id: id });
    } else {
      // linked level
      if (this.props["data-grid"].isPage) {
        pageContent = await getPage({ id: id, page: null }); // isPage true -> para
      } else {
        pageContent = await getLevel(id);
      }
    }

    if (typeof context !== "undefined" && context.data.context.length !== 0) {
      this.setState({
        context: context.data.context,
      });
    }

    if (typeof pageContent !== "undefined" && pageContent.data.length !== 0) {
      // when not a page, show the level toctitle, e.g. Definition
      if (this.props["data-grid"].isPage) {
        this.setState({
          pageTitle: paraRenderer(
            pageContent.data.flat(Infinity)[0].para_parent.title
          ),
          paraText: pageContent.data,
        });
      } else if (content.levelParent) {
        // for index
        this.setState({
          pageTitle: paraRenderer(content.title),
          paraText: pageContent.data,
        });
      } else {
        this.setState({
          pageTitle: paraRenderer(
            pageContent.data.flat(Infinity)[0].para_parent.tocTitle
          ),
          paraText: pageContent.data,
        });
      }
    } else if (
      typeof pageContent !== "undefined" &&
      pageContent.data.length === 0
    ) {
      this.setState({
        pageTitle: content.title,
        paraText: pageContent.data,
      });
    } else {
      this.setState({
        pageTitle: ["This page is under construction."],
        paraText: null,
      });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    let i = this.props["data-grid"].i;
    const {
      minimizeWindow,
      onWindowOpen,
      onCloseWindow,
      onLayoutChange,
      ...rest
    } = this.props;
    const { context, pageTitle, paraText } = this.state;

    let contextPane =
      context === null ? null : (
        <TabPane tab={"Context"} key={"2"}>
          {_.map(context, (para) => {
            return paraRenderer(para, this.props);
          })}
        </TabPane>
      );

    return (
      <div
        {...rest}
        className={`wrapper ${this.props.className}`}
        style={{ ...styles.window, ...this.props.style }}
      >
        <TitleBar
          className="windowHeader"
          title={pageTitle}
          controls
          background={this.props.color}
          onCloseClick={() => {
            onCloseWindow(i);
          }}
          onMinimizeClick={() => {
            minimizeWindow(
              i,
              pageTitle,
              this.props["data-grid"].content,
              this.props["data-grid"].isPage
            );
          }}
        />
        <Scrollbars>
          {this.props.children}
          <div
            style={{
              background: "#F7F7EE",
              borderRadius: "2px",
              boxShadow:
                "0 0 0 1px rgba(0,0,0,0.1), 0 1px 10px rgba(0,0,0,0.35)",
              margin: "1em .9em",
              padding: ".25em 1.25em .1em",
            }}
          >
            <Tabs defaultActiveKey={"1"}>
              <TabPane tab={"Reference"} key={"1"}>
                {_.map(paraText, (para) => {
                  return paraRenderer(para);
                })}
              </TabPane>
              {contextPane}
            </Tabs>
          </div>
        </Scrollbars>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateElement);
