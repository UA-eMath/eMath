import React from 'react'
import 'antd/dist/antd.css';
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import _ from "lodash";
import { Responsive, WidthProvider } from "react-grid-layout";
import { Scrollbars } from 'react-custom-scrollbars';



const ResponsiveReactGridLayout = WidthProvider(Responsive);


export default class SplitView extends React.Component{
  static defaultProps = {
    className: "layout",
    cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
    rowHeight: 100,
      verticalCompact:false
  };

  constructor(props) {
    super(props);

    this.state = {
      items: [0, 1].map(function(i, key, list) {
        return {
          i: i.toString(),
          x: i * 6,
          y: 0,
          w: 6,
          h: 12,
          add: i === (list.length - 1).toString()
        };
      }),
      newCounter: 0,
    };

    this.onAddItem = this.onAddItem.bind(this);
    this.onBreakpointChange = this.onBreakpointChange.bind(this);
  }

  createElement(el) {
    const removeStyle = {
      position: "absolute",
      right: "2px",
      top: 0,
      cursor: "pointer"
    };
    const i = el.add ? "+" : el.i;
    return (
      <div key={i} data-grid={el}
              style={{background:'LightBlue'}}>
        {el.add ? (
          <span
            className="add text"
            onClick={this.onAddItem}
            title="You can add an item by clicking here, too."
          >
            Add +
          </span>
        ) : (
          <span className="text">{i}</span>
        )}
        <span
          className="remove"
          style={removeStyle}
          onClick={this.onRemoveItem.bind(this, i)}
        >
          x
        </span>
      </div>
    );
  }

  onAddItem() {
    /*eslint no-console: 0*/
    console.log("adding", "n" + this.state.newCounter);
    this.setState({
      // Add a new item. It must have a unique key!
      items: this.state.items.concat({
        i: "n" + this.state.newCounter,
        x: (this.state.items.length * 2) % (this.state.cols || 12),
        y: Infinity, // puts it at the bottom
        w: 2,
        h: 2
      }),
      // Increment the counter to ensure key is always unique.
      newCounter: this.state.newCounter + 1
    });
  }

  // We're using the cols coming back from this to calculate where to add new items.
  onBreakpointChange(breakpoint, cols) {
    this.setState({
      breakpoint: breakpoint,
      cols: cols
    });
  }

  onLayoutChange(layout) {
    this.props.onLayoutChange(layout);
    this.setState({ layout: layout });
  }

  onRemoveItem(i) {
    console.log("removing", i);
    this.setState({ items: _.reject(this.state.items, { i: i }) });
  }

  render() {
    return (
      <div>
        <button onClick={this.onAddItem}>Add Item</button>
        <ResponsiveReactGridLayout
            onLayoutChange={() => this.onLayoutChange}
            onBreakpointChange={() => this.onBreakpointChange}
          {...this.props}

        >
          {_.map(this.state.items, el => this.createElement(el))}
        </ResponsiveReactGridLayout>
      </div>
    );
  }
}