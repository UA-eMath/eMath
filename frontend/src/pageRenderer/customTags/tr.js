import React from "react";

export default function tr(props) {
  try {
    if (props.css !== undefined) {
      const style = JSON.parse(props.css);
      return <tr style={style} {...props} />;
    }
  } catch (e) {
    console.log(e);
  }
  return <tr {...props} />;
}
