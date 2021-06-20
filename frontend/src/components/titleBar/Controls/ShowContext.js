import React, { Component } from "react";
import Radium from "radium";

const styles = {
  button: {
    WebkitUserSelect: "none",
    userSelect: "none",
    WebkitAppRegion: "no-drag",
    cursor: "pointer",
    width: "46px",
    height: "100%",
    lineHeight: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    ":hover": {
      transition: "background-color 0.1s",
      backgroundColor: "#e5e5e5",
    },

    ":active": {
      backgroundColor: "#cccccc",
    },
  },

  buttonColorBackground: {
    ":hover": {
      transition: "background-color 0.1s",
      backgroundColor: "rgba(255, 255, 255, .13)",
    },

    ":active": {
      backgroundColor: "rgba(255, 255, 255, .23)",
    },
  },

  icon: {
    width: "10px",
    height: "10px",
  },
};

class ShowContext extends Component {
  render() {
    const { style, ...props } = this.props;

    let componentStyle = {
      ...styles.button,
      ...styles.buttonColorBackground,
      ...style,
    };

    return (
      <a title="Show Context" style={componentStyle} {...props}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-arrows-expand"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M1 8a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 8zM7.646.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 1.707V5.5a.5.5 0 0 1-1 0V1.707L6.354 2.854a.5.5 0 1 1-.708-.708l2-2zM8 10a.5.5 0 0 1 .5.5v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 .708-.708L7.5 14.293V10.5A.5.5 0 0 1 8 10z"
          />
        </svg>
      </a>
    );
  }
}
ShowContext = Radium(ShowContext);
export default ShowContext;
