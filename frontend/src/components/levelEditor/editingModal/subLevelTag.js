import React from "react";
import { Tag } from "antd";

function SubLevelTag(props) {
  let { title } = props;

  switch (title) {
    case "Comment":
      return <Tag color="blue">Comment</Tag>;
    case "Convention":
      return <Tag color="orange">Convention</Tag>;
    case "Corollary":
      return <Tag color="orange">Corollary</Tag>;
    case "Definition":
      return <Tag color="green">Definition</Tag>;
    case "Example":
      return <Tag color="lime">Example</Tag>;
    case "Exercise":
      return <Tag color="purple">Exercise</Tag>;
    case "Lemma":
      return <Tag color="gold">Lemma</Tag>;
    case "Notation":
      return <Tag color="green">Notation</Tag>;
    case "Proof":
      return <Tag color="geekblue">Proof</Tag>;
    case "Proof Idea":
      return <Tag color="geekblue">Proof Idea</Tag>;
    case "Proposition":
      return <Tag color="gold">Proposition</Tag>;
    case "Remark":
      return <Tag color="blue">Remark</Tag>;
    case "Sketch of Proof":
      return <Tag color="geekblue">Sketch of Proof</Tag>;
    case "Solution":
      return <Tag color="geekblue">Solution</Tag>;
    case "Terminology":
      return <Tag color="green">Terminology</Tag>;
    case "Theorem":
      return <Tag color="gold">Theorem</Tag>;
    default:
      return null;
  }
}

export default SubLevelTag;
