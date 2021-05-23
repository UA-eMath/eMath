import React from "react";
import MathJax from "react-mathjax-preview";

export default function math(props) {
  return <MathJax math={`$$${props.children}$$`} />;
}
