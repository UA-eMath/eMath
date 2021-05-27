import React from "react";

export default function p(props) {
  try {
    if (props.css !== undefined) {
      const style = JSON.parse(props.css);
      return <p style={style} {...props} />;
    }
  } catch (e) {
    console.log(e);
  }
  return <p {...props} />;
}
