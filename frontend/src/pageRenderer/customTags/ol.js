import React from "react";

export default function ol(props) {
  try {
    if (props.css !== undefined) {
      const style = JSON.parse(props.css);
      return <ol style={style} {...props} />;
    }
  } catch (e) {
    console.log(e);
  }
  return <ol {...props} />;
}
