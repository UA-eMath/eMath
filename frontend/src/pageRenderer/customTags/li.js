import React from "react";

export default function li(props) {
  try {
    if (props.css !== undefined) {
      const style = JSON.parse(props.css);
      return <li style={style} {...props} />;
    }
  } catch (e) {
    console.log(e);
  }
  return <li {...props} />;
}
