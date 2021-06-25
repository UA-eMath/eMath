import React from "react";
import _ from "lodash";
import { Button } from "antd";
import { openNewWindow } from "../actions";
import { connect } from "react-redux";

const mapDispatchToProps = (dispatch) => ({
  onWindowOpen: (content, isPage) => dispatch(openNewWindow(content, isPage)),
});

export function HideParaBlock(props) {
  const upperLevel = props.para[0].para_parent;
  return (
    <span key={_.uniqueId("btnOfHiddenPara_")}>
      <Button
        style={{
          background: "#fdf5e8",
        }}
        onClick={() => {
          // open sublevel with its parent on the right pane
          props.onWindowOpen(upperLevel, upperLevel.isPage);
        }}
      >
        {upperLevel.tocTitle}
      </Button>
    </span>
  );
}

export default connect(null, mapDispatchToProps)(HideParaBlock);
