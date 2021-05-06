import React from "react";
import _ from "lodash";
import { openNewWindow } from "../actions";
import { connect } from "react-redux";
import getLabel from "../requests/getLabel";
import { message } from "antd";

const mapDispatchToProps = (dispatch) => ({
  onWindowOpen: (pageId, isPage, usage) =>
    dispatch(openNewWindow(pageId, isPage, usage)),
});

function iLink(props) {
  return (
    // todo href
    <a
      className="textLink"
      href
      onClick={async () => {
        // get label using label id
        const linked_obj = await getLabel({ labelID: props.id });
        if (linked_obj === undefined) {
          message.error(
            "Fail to get cross reference! Please check your linked ID!"
          );
        } else {
          props.onWindowOpen(linked_obj.data, linked_obj.data.isPage);
        }
      }}
      style={{ color: "#297DB5" }}
      key={_.uniqueId("iLink")}
    >
      {props.children}
    </a>
  );
}

export default connect(null, mapDispatchToProps)(iLink);
