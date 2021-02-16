import React from "react";
import _ from "lodash";
import { openNewWindow } from "../actions";
import { connect } from "react-redux";
import getLabel from "../requests/getLabel";

const mapDispatchToProps = (dispatch) => ({
  onWindowOpen: (pageId, isPage) => dispatch(openNewWindow(pageId, isPage)),
});

function iLink(props) {
  return (
    // todo href
    <a
      className="textLink"
      href
      onClick={async () => {
        // get label using label content
        const linked_obj = await getLabel({ content: props.label });
        props.onWindowOpen(
          { id: linked_obj.data.id, linkTo: linked_obj.data.linkTo },
          linked_obj.data.isPage
        );
      }}
      style={{ color: "#297DB5" }}
      key={_.uniqueId("iLink")}
    >
      {props.children}
    </a>
  );
}

export default connect(null, mapDispatchToProps)(iLink);
