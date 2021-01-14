import React from "react";
import _ from "lodash";
import paraRenderer from "./index";

//  A block of paras which are inside of a sub-level will be represented as an inner array.
// For a para array, inner para will be like: [xxx,[xxx,xxx],xxx]

export function blockOfPara(dataArray, left_title, right_title) {
  let boxHeader;

  if (left_title || right_title) {
    boxHeader = (
      <div
        style={{
          background: "linear-gradient(#fdf5e8,#EAE7DC)",
          borderRadius: "2px 2px 0 0",
          padding: "2px 4px 2px 4px",
          marginBottom: "10px",
        }}
      >
        <span>
          <b>{left_title}</b>
        </span>
        <span
          style={{
            float: "right",
            fontWeight: "bold",
          }}
        >
          {right_title}
        </span>
      </div>
    );
  }

  return (
    <div
      key={_.uniqueId("blockOfPara_")}
      style={{
        background: "#fdf5e8",
        borderRadius: "2px",
        boxShadow: "0 0 0 1px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.35)",
        marginBottom: "10px",
      }}
    >
      {boxHeader}
      <div
        style={{
          padding: "2px 4px 2px 4px",
        }}
      >
        {_.map(dataArray, (para) => {
          return paraRenderer(para);
        })}
      </div>
    </div>
  );
}
