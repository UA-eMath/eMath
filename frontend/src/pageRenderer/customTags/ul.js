import React from "react";

export default function ul(props) {
  try {
    if (props.css !== undefined) {
      const style = JSON.parse(props.css);
      return <ul style={style} {...props} />;
    }
  } catch (e) {
    console.log(e);
  }
  return <ul {...props} />;
}
