import React from "react";
import _ from "lodash";
import { Button, Divider } from "antd";
import { openNewWindow } from "../actions";
import { connect } from "react-redux";
import getLevel from "../requests/getLevel";

const mapDispatchToProps = (dispatch) => ({
  onWindowOpen: (content, isPage) => dispatch(openNewWindow(content, isPage)),
});

export function HideParaBlock(props) {
  const upperLevel = props.para[0].para_parent;
  return (
    <span key={_.uniqueId("btnOfHiddenPara_")}>
      <Divider style={{ margin: "16px 0 0" }} />
      <Button
        type="link"
        onClick={() => {
          // open sublevel with its parent on the right pane
          getLevel(upperLevel.parent).then((data) => {
            const parent = data.data[0].para_parent;
            props.onWindowOpen(parent, parent.isPage);
          });
        }}
      >
        {upperLevel.tocTitle}
      </Button>
    </span>
  );
}

export default connect(null, mapDispatchToProps)(HideParaBlock);
