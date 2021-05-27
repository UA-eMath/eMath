import React from "react";

export default function i(props) {
  try {
    if (props.css !== undefined) {
      const style = JSON.parse(props.css);
      return <i style={style} {...props} />;
    }
  } catch (e) {
    console.log(e);
  }
  return <i {...props} />;
}
