import React from "react";

export default function iframe(props) {
  try {
    if (props.css !== undefined) {
      const style = JSON.parse(props.css);
      return <iframe style={style} {...props} />;
    }
  } catch (e) {
    console.log(e);
  }
  return <iframe {...props} />;
}
