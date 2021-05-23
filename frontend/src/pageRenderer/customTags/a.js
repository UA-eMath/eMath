import React from "react";

export default function a(props) {
  try {
    if (props.css !== undefined) {
      const style = JSON.parse(props.css);
      return <a style={style} {...props} />;
    }
  } catch (e) {
    console.log(e);
  }
  return <a {...props} />;
}
