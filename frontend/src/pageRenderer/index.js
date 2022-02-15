import _ from "lodash";
import React from "react";
import "./index.css";
import XMLToReact from "@condenast/xml-to-react"; //Converts an XML document into a React tree.
import { blockOfPara } from "./paraBlock";
import caption from "./customTags/caption";
import iLink from "./customTags/iLink";
import img from "./customTags/img";
import math from "./customTags/math";
import inlineMath from "./customTags/inlineMath";
import ul from "./customTags/ul";
import ol from "./customTags/ol";
import li from "./customTags/li";
import a from "./customTags/a";
import b from "./customTags/b";
import i from "./customTags/i";
import p from "./customTags/p";
import table from "./customTags/table";
import tbody from "./customTags/tbody";
import tr from "./customTags/tr";
import td from "./customTags/td";
import iframe from "./customTags/iframe";
import HideParaBlock from "./hideParaBlock";
import { hexToRGB } from "../constants/color";

const hiddenLevel = ["Proof", "Sketch of Proof", "Proof Idea", "Solution"];

export default function paraRenderer(
  para,
  isTitle = false,
  isInit = false,
  insideSublevel = false
) {
  const xmlToReact = new XMLToReact({
    //Custom tag
    caption: (attrs) => ({ type: caption, props: attrs }),
    iLink: (attrs) => ({ type: iLink, props: { ...attrs } }),
    Math: (attrs) => ({ type: math, props: attrs }),
    math: (attrs) => ({ type: inlineMath, props: attrs }),
    ParaWrap: (attrs) => ({ type: React.Fragment, props: attrs }),

    //HTML tag
    ul: (attrs) => ({ type: ul, props: stylingXML(attrs) }),
    ol: (attrs) => ({ type: ol, props: stylingXML(attrs) }),
    li: (attrs) => ({ type: li, props: stylingXML(attrs) }),
    b: (attrs) => ({ type: b, props: stylingXML(attrs) }),
    a: (attrs) => ({ type: a, props: stylingXML(attrs) }),
    p: (attrs) => ({ type: p, props: stylingXML(attrs) }),
    i: (attrs) => ({ type: i, props: stylingXML(attrs) }),
    img: (attrs) => ({
      type: img,
      props: stylingXML(attrs),
    }),

    table: (attrs) => ({
      type: table,
      props: stylingXML(attrs),
    }),
    tr: (attrs) => ({ type: tr, props: stylingXML(attrs) }),
    td: (attrs) => ({ type: td, props: stylingXML(attrs) }),
    tbody: (attrs) => ({
      type: tbody,
      props: stylingXML(attrs),
    }),
    iframe: (attrs) => ({
      type: iframe,
      props: stylingXML(attrs),
    }),
  });

  // has sublevel
  if (Array.isArray(para)) {
    if (isInit && hiddenLevel.includes(para[0].para_parent.tocTitle)) {
      return <HideParaBlock para={para} />;
    } else {
      let left_title = para[0].para_parent.tocTitle;
      let right_title = para[0].para_parent.title;
      return blockOfPara(para, left_title, right_title, isInit);
    }
  }

  let decodedData;
  //render a plain string
  if (typeof para === "string") {
    decodedData = para;
  } else {
    if (para && para.content) {
      decodedData = decodeURI(para.content.data);
    } else {
      decodedData = "";
    }
  }

  const reactTree = xmlToReact.convert(`<ParaWrap>${decodedData}</ParaWrap>`);

  const paraStyle = {
    border: `3px ridge ${hexToRGB("#ffffb8", 0.5)}`,
    borderRadius: "6px",
    padding: "6px",
  };

  const fragment = isTitle ? (
    <span>{reactTree}</span>
  ) : (
    <div style={insideSublevel ? {} : paraStyle}>{reactTree}</div>
  );

  return <React.Fragment key={_.uniqueId("div_")}>{fragment}</React.Fragment>;
}

function stylingXML(attrs) {
  if (attrs.style !== undefined && typeof attrs.style === "string") {
    let regex = /([\w-]*)\s*:\s*([^;]*)/g;
    let properties = {};
    while (true) {
      const match = regex.exec(attrs.style);
      if (!match) {
        break;
      }
      properties[match[1]] = match[2].trim();
    }
    attrs.style = properties;
  }
  return attrs;
}