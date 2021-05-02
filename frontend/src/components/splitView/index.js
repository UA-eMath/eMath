import React from "react";
import "antd/dist/antd.css";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import _ from "lodash";
import { Responsive, WidthProvider } from "react-grid-layout";

import { connect } from "react-redux";
import { minimizeWindow, closeWindow, onLayoutChange } from "../../actions";

import CreateElement from "./pageCreator/createEle";
import getPage from "../../requests/getPage";
import initElement from "./pageCreator/initEle";
import MathjaxRenderer from "../MathjaxRenderer";
import TopNav from "../topNav";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const mapStateToProps = (state) => {
  return { items: state.windows.items };
};

const mapDispatchToProps = (dispatch) => ({
  onCloseWindow: (id) => dispatch(closeWindow(id)),
  minimizeWindow: (id) => dispatch(minimizeWindow(id)),
  onLayoutChange: (layout) => dispatch(onLayoutChange(layout)),
});

class SplitView extends React.Component {
  _isMounted = false;
  constructor(props) {
    super(props);

    this.state = {
      paraText: [],
      pageTitle: "Loading page ...",
    };
    this.onBreakpointChange = this.onBreakpointChange.bind(this);
    this.initElement = initElement.bind(this);
  }

  async componentDidMount() {
    this._isMounted = true;
    let rootID = this.props.match.params["id"];
    const pageContent = await getPage({ id: rootID });

    if (typeof pageContent !== "undefined" && pageContent.data.length > 0) {
      if (this._isMounted) {
        this.setState({
          pageTitle: pageContent.data.flat(Infinity)[0].para_parent.title,
          paraText: pageContent.data,
          pageNum: 1,
          id: rootID,
        });
      }
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <div>
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
        <MathjaxRenderer id={this.props.match.params["id"]} />
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
