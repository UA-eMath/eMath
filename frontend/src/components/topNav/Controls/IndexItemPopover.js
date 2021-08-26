import React from "react";
import { Popover, Button } from "antd";
import "antd/dist/antd.css";
import getPara from "../../../requests/getPara";
import paraRenderer from "../../../pageRenderer";

export default class IndexItemPopover extends React.Component {
  _isMounted = false;
  state = {
    popoverContent: "",
    popoverTitle: "",
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
    getPara({ id: this.props.paraId }).then((data) => {
      this.setState({
        popoverContent: data.data,
        popoverTitle: data.data.para_parent.title,
      });
    });
  }

  render() {
    const { popoverContent, popoverTitle } = this.state;

    return (
      <Popover
        content={paraRenderer(popoverContent)}
        title={paraRenderer(popoverTitle)}
      >
        <Button
          shape="circle"
          icon="caret-down"
          onClick={() => {
            this.props.replaceWindow();
            let copiedItem = { ...this.props.item, id: this.props.paraId };
            this.props.onWindowOpen(copiedItem, false);
            this.props.onClose();
          }}
        />
      </Popover>
    );
  }
}
