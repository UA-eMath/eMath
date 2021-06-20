import React from "react";
import _ from "lodash";
import { openNewWindow, minimizeWindow } from "../../actions";
import { connect } from "react-redux";
import getLabel from "../../requests/getLabel";
import { message } from "antd";

const mapStateToProps = (state) => {
  return {
    items: state.windows.items,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onWindowOpen: (content, isPage) => dispatch(openNewWindow(content, isPage)),
  minimizeWindow: (id, title, content, isPage) =>
    dispatch(minimizeWindow(id, title, content, isPage)),
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
          linked_obj.data.id = linked_obj.data.linkedID;

          // Minimize previous windows
          if (props.items.length > 1) {
            const exceptFirst = props.items.slice(1);
            exceptFirst.forEach((preWindow) => {
              props.minimizeWindow(
                preWindow.i,
                preWindow.title,
                preWindow.content,
                preWindow.isPage
              );
            });
          }
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

export default connect(mapStateToProps, mapDispatchToProps)(iLink);
