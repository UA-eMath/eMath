import React from "react";

export default function table(props) {
  try {
    if (props.css !== undefined) {
      const style = JSON.parse(props.css);
      return <table style={style} {...props} />;
    }
  } catch (e) {
    console.log(e);
  }
  return <table {...props} />;
}
