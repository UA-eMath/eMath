import React from "react";
import _ from "lodash";
import paraRenderer from "./index";
import SubLevelTag from "../components/levelEditor/editingModal/subLevelTag";
import { hexToRGB, subLevelColor, tagColor } from "../constants/color";
//  A block of paras which are inside of a sub-level will be represented as an inner array.
// For a para array, inner para will be like: [xxx,[xxx,xxx],xxx]

export function blockOfPara(
  dataArray,
  left_title,
  right_title,
  isInit = false
) {
  let boxHeader;

  if (left_title || right_title) {
    boxHeader = (
      <div
        style={{
          background: "linear-gradient(#fdf5e8,#EAE7DC)",
          padding: "4px 4px",
        }}
      >
        {SubLevelTag({ title: left_title })}
        <span
          style={{
            fontWeight: "bold",
            float: "right",
          }}
        >
          {paraRenderer(right_title, true, false)}
        </span>
      </div>
    );
  }

  return (
    <div
      key={_.uniqueId("blockOfPara_")}
      style={{
        background: "#fdf5e8",
        border: `3px ridge ${hexToRGB(
          tagColor[subLevelColor[left_title]].color,
          0.5
        )}`,
        borderRadius: "10px",
        margin: "6px 0",
      }}
    >
      {boxHeader}
      <div
        style={{
          padding: "6px",
        }}
      >
        {_.map(dataArray, (para) => {
          return paraRenderer(para, false, isInit, true);
        })}
      </div>
    </div>
  );
}
