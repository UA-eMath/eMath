import React from "react";
import "antd/dist/antd.css";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import _ from "lodash";
import { Responsive, WidthProvider } from "react-grid-layout";
import { connect } from "react-redux";
import {
  minimizeWindow,
  closeWindow,
  onLayoutChange,
  getPageToChange,
  setPage,
} from "../../actions";
import CreateElement from "./pageCreator/createEle";
import initElement from "./pageCreator/initEle";
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
  onCloseWindow: (id) => dispatch(closeWindow(id)),
  minimizeWindow: (id) => dispatch(minimizeWindow(id)),
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
    };
    this.onBreakpointChange = this.onBreakpointChange.bind(this);
    this.initElement = initElement.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    this.props.getPageToChange(this.props.match.params["id"]); // pass rootID into function
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  onMathLoaded = () => {
    this.setState({
      mathLoaded: true,
    });
  };

  render() {
    const gridLayout = this.state.mathLoaded ? (
      <ResponsiveReactGridLayout
        className="layout"
        breakpoints={{ lg: 1200, md: 1000, sm: 800, xs: 500, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={100}
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
            return this.initElement(el);
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
          minHeight: "100rem",
          marginTop: 300,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      />
    );
    return (
      <div>
        <MathjaxRenderer
          id={this.props.match.params["id"]}
          mathLoaded={this.onMathLoaded}
        />
        {gridLayout}
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
