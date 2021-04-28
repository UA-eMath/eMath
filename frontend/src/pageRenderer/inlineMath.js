import React from "react";
import { Node, Context } from "./../components/react-mathjax";
import _ from "lodash";
import MathJaxConfig from "../constants/MathJax_config";
import { Icon } from "antd";

export default function inlineMath(props) {
  let node;
  node = (
    <Node key={_.uniqueId("MJN_")} inline>
      {props.children}
    </Node>
  );

  return (
    <span>
      <Context
        input="tex"
        delay={100}
        onLoad={() => {}}
        loading={<Icon type="loading" />}
        didFinishTypeset={() => {}}
        onError={(MathJax, error) => {
          console.warn(error);
          console.log("Encountered a MathJax error, re-attempting a typeset!");
          MathJax.Hub.Queue(MathJax.Hub.Typeset());
        }}
        script={MathJaxConfig.script}
        options={MathJaxConfig.options}
      >
        {node}
      </Context>
    </span>
  );
}
