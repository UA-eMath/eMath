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

export default function paraRenderer(para, isTitle) {
  /*
	"content":{"data":""}
	*/

  const xmlToReact = new XMLToReact({
    //Custom tag
    caption: (attrs) => ({ type: caption, props: attrs }),
    iLink: (attrs) => ({ type: iLink, props: { ...attrs } }),
    Math: (attrs) => ({ type: math, props: attrs }),
    math: (attrs) => ({ type: inlineMath, props: attrs }),
    ParaWrap: (attrs) => ({ type: React.Fragment, props: attrs }),

    //HTML tag
    ul: (attrs) => ({ type: ul, props: attrs }),
    ol: (attrs) => ({ type: ol, props: attrs }),
    li: (attrs) => ({ type: li, props: attrs }),
    b: (attrs) => ({ type: b, props: attrs }),
    a: (attrs) => ({ type: a, props: attrs }),
    p: (attrs) => ({ type: p, props: attrs }),
    i: (attrs) => ({ type: i, props: attrs }),
    img: (attrs) => ({
      type: img,
      props: attrs,
    }),

    table: (attrs) => ({
      type: table,
      props: attrs,
    }),
    tr: (attrs) => ({ type: tr, props: attrs }),
    td: (attrs) => ({ type: td, props: attrs }),
    tbody: (attrs) => ({
      type: tbody,
      props: attrs,
    }),
    iframe: (attrs) => ({
      type: iframe,
      props: attrs,
    }),
  });

  if (Array.isArray(para)) {
    let left_title = para[0].para_parent.tocTitle;
    let right_title = xmlToReact.convert(
      `<span>${para[0].para_parent.title}</span>`
    );

    return blockOfPara(para, left_title, right_title);
  }

  let decodedData;
  //render a plain string
  if (typeof para === "string") {
    decodedData = para;
  } else {
    decodedData = decodeURI(para.content.data);
  }

  let reactTree = xmlToReact.convert(`<ParaWrap>${decodedData}</ParaWrap>`);
  // const reactTree = htmlToReactParser.parse(decodedData);

  const fragment = isTitle ? <span>{reactTree}</span> : <div>{reactTree}</div>;

  return <React.Fragment key={_.uniqueId("div_")}>{fragment}</React.Fragment>;

  // let xmlParser = new DOMParser();
  // let preDom = xmlParser.parseFromString(`<React.Fragment>${decodedData}</React.Fragment>`, "text/xml");
  //
  // if (preDom.getElementsByTagName("parsererror").length > 0) {
  // 	let errorMessage = preDom.getElementsByTagName("parsererror")[0].innerText;
  // 	return (
  // 		<p style={{color:"red"}} key={_.uniqueId("error_")}>
  // 			{errorMessage.replace("This page contains the following errors","This paragraph contains the following errors")}
  // 		</p>
  // 	)
  // } else {
  // 	let reactTree = xmlToReact.convert(`<ParaWrap>${decodedData}</ParaWrap>`);
  // 	return (
  // 		<React.Fragment key={_.uniqueId("div_")}>
  // 			{reactTree}
  // 		</React.Fragment>
  // 	)
  // }
}
