import React from "react";
import _ from "lodash";
import styles from "../styles/style";
import { Icon, Tooltip } from "antd";
import Scrollbars from "react-custom-scrollbars";
import getPage from "../../../requests/getPage";
import paraRenderer from "../../../pageRenderer";
import { setReadCache } from "../../../utils/setReadCache";

export default class InitElement extends React.Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      isLastPage: false,
    };
  }

  componentDidMount() {
    const { id, pageNum } = this.props;
    getPage({ root: id, page: pageNum + 1 }).then((nextPage) => {
      if (!nextPage || nextPage.status !== 200) {
        this.setState({ isLastPage: true });
      } else if (nextPage.data.length === 0) {
        this.setState({ nextPageData: [""] });
      } else {
        this.setState({ nextPageData: nextPage.data });
      }
    });
  }

  setData = (pageData, action) => {
    if (pageData) {
      let num = this.props.pageNum + action;
      this.props.onSetPage(
        pageData.flat(Infinity)[0].para_parent.id,
        pageData.flat(Infinity)[0].para_parent.title,
        pageData,
        num
      );
      setReadCache(this.props.match.params.id, this.props.id);
    }
  };

  getPrePage = async (id, pageNum) => {
    await getPage({ root: id, page: pageNum - 1 }).then((prePage) => {
      if (!prePage || prePage.status !== 200) {
        console.error("Fail to get pre page", prePage);
      } else if (prePage.data.length === 0) {
        return [""];
      } else {
        this.setData(prePage.data, -1);
      }
    });
  };

  getNextPage = (id, pageNum) => {
    const { nextPageData } = this.state;
    if (nextPageData) {
      this.setData(nextPageData, 1);
    }
  };

  render() {
    const { isLastPage } = this.state;
    const { id, pageNum, ...rest } = this.props;
    return (
      <div
        {...rest}
        className={`wrapper ${this.props.className}`}
        style={{ ...styles.secondborder, ...this.props.style }}
      >
        <div style={{ ...styles.titleBar }}>
          {pageNum - 1 < 1 ? (
            ""
          ) : (
            <Tooltip title="previous" placement="bottom">
              <Icon
                type="caret-left"
                style={{ fontSize: "20px", marginLeft: "20px" }}
                onClick={() => {
                  this.getPrePage(this.props.id, this.props.pageNum);
                }}
              />
            </Tooltip>
          )}

          <span style={{ ...styles.title, fontWeight: "bold" }}>
            {paraRenderer(this.props.pageTitle, true)}
          </span>

          {isLastPage ? (
            ""
          ) : (
            <Tooltip title="next" placement="bottom">
              <Icon
                type="caret-right"
                style={{ fontSize: "20px", marginRight: "20px" }}
                className="ml-auto"
                onClick={() => {
                  this.getNextPage(this.props.id, this.props.pageNum);
                }}
              />
            </Tooltip>
          )}
        </div>

        <Scrollbars>
          <div
            style={{
              ...styles.window,
            }}
          >
            {_.map(this.props.paraText, (para) => {
              return paraRenderer(para, false, true);
            })}
          </div>
        </Scrollbars>
      </div>
    );
  }
}
