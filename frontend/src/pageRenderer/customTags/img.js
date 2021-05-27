import React from "react";

export default function img(props) {
  try {
    if (props.css !== undefined) {
      const style = JSON.parse(props.css);
      return <img style={style} className="imageTag" {...props} />;
    }
  } catch (e) {
    console.log(e);
  }
  return <img className="imageTag" {...props} />;
}
