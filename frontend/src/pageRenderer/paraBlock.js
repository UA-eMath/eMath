import React from "react";
import _ from "lodash";
import paraRenderer from "./index";
import SubLevelTag from "../components/levelEditor/editingModal/subLevelTag";
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
        borderRadius: "6px",
        boxShadow: "rgba(0,0,0,0.55) 0 2px 4px",
        margin: "16px 0 10px",
      }}
    >
      {boxHeader}
      <div
        style={{
          padding: "6px",
        }}
      >
        {_.map(dataArray, (para) => {
          return paraRenderer(para, false, isInit);
        })}
      </div>
    </div>
  );
}
