import React from "react";
import _ from "lodash";
import { openNewWindow } from "../actions";
import { connect } from "react-redux";

const mapDispatchToProps = (dispatch) => ({
  onWindowOpen: (pageId, isPage) => dispatch(openNewWindow(pageId, isPage)),
});

function iLink(props) {
  console.log(props);

  return (
    <a
			className="textLink"
			href
      onClick={() => props.onWindowOpen(props.id, true)}
      style={{ color: "#297DB5" }}
      key={_.uniqueId("iLink")}
    >
      {props.children}
    </a>
  );
}

export default connect(null, mapDispatchToProps)(iLink);
