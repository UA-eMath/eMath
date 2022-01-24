import React from "react";
import { Tag } from "antd";
import { subLevelColor, tagColor } from "../../../constants/color";

function SubLevelTag(props) {
  let { title } = props;
  if (title) {
    return <Tag style={tagColor[subLevelColor[title]]}>{title}</Tag>;
  }
  return null;
}

export default SubLevelTag;
