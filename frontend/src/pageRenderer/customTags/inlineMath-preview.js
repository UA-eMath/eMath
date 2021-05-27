import React from "react";
import MathJax from "react-mathjax-preview";

export default function inlineMath(props) {
  return <MathJax math={`$${props.children}$`} wrapperTag={"span"} />;
}
