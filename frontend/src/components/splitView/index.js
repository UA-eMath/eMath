import React from "react";
import "antd/dist/antd.css";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import _ from "lodash";
import { Responsive, WidthProvider } from "react-grid-layout";
import { connect } from "react-redux";
import { onLayoutChange, getPageToChange, setPage } from "../../actions";
import CreateElement from "./pageCreator/createEle";
import InitElement from "./pageCreator/initEle";
import MathjaxRenderer from "../MathjaxRenderer/index";
import { Spin } from "antd";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const mapStateToProps = (state) => {
  return {
    items: state.windows.items,
    pageTitle: state.currentpage.title,
    paraText: state.currentpage.page,
    pageNum: state.currentpage.pageNum,
    id: state.currentpage.pageId,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onLayoutChange: (layout) => dispatch(onLayoutChange(layout)),
  getPageToChange: (id) => dispatch(getPageToChange(id)),
  onSetPage: (id, title, content, pageNum) =>
    dispatch(setPage(id, title, content, pageNum)),
});

class SplitView extends React.Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      mathLoaded: false,
      innerHeight: 0,
    };
    this.onBreakpointChange = this.onBreakpointChange.bind(this);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    const rootId = this.props.match.params["id"];
    // Get pageId from cache
    const readCache = localStorage.getItem("readCache");
    if (readCache) {
      const pageId = JSON.parse(readCache)[rootId];
      if (pageId) {
        this.props.getPageToChange(pageId);
      } else {
        this.props.getPageToChange(rootId);
      }
    } else {
      this.props.getPageToChange(rootId); // pass rootID into function
    }

    this.updateWindowDimensions();
    // Add event listener
    window.addEventListener("resize", this.updateWindowDimensions.bind(this));
  }

  componentWillUnmount() {
    this._isMounted = false;
    // Remove event listener
    window.removeEventListener(
      "resize",
      this.updateWindowDimensions.bind(this)
    );
  }

  onMathLoaded = () => {
    this.setState({
      mathLoaded: true,
    });
  };

  /**
   * Calculate & Update state of new dimensions
   */
  updateWindowDimensions() {
    this.setState({ innerHeight: window.innerHeight });
  }

  render() {
    const gridLayout = this.state.mathLoaded ? (
      <ResponsiveReactGridLayout
        className="layout"
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }} //{{ lg: 1200, md: 1000, sm: 800, xs: 500, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={this.state.innerHeight - 80} // window height - some margins, navbar, etc.
        compactType="horizontal"
        draggableHandle=".windowHeader"
        color="#42b0f4"
        onLayoutChange={() => {
          this.props.onLayoutChange(this.props.items);
        }}
        onBreakpointChange={() => this.onBreakpointChange}
        key={_.uniqueId()}
      >
        {_.map(this.props.items, (el) => {
          if (el.i === "0") {
            return <InitElement key={el.i} data-grid={el} {...this.props} />;
          } else {
            const i = el.add ? "+" : el.i;
            return <CreateElement key={i} data-grid={el} />;
          }
        })}
      </ResponsiveReactGridLayout>
    ) : (
      <Spin
        tip="Waiting for MathJax..."
        style={{
          width: "100%",
          marginTop: 300,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      />
    );
    return (
      <div>
        {gridLayout}
        <MathjaxRenderer
          id={this.props.match.params["id"]}
          mathLoaded={this.onMathLoaded}
        />
      </div>
    );
  }

  // We're using the cols coming back from this to calculate where to add new items.
  onBreakpointChange(breakpoint, cols) {
    this.setState({
      breakpoint: breakpoint,
      cols: cols,
    });
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SplitView);
