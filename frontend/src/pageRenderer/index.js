import _ from "lodash";
import React from 'react'
import XMLToReact from '@condenast/xml-to-react';
import caption from "./caption";
import iLink from "./iLink";
import math from "./math";
import {blockOfPara} from "./paraBlock";
import "./index.css";
export default function paraRenderer(para, props) {

	/*
	"content":{"data":""}
	*/


	const xmlToReact = new XMLToReact({

		//Custom tag
		caption: (attrs) => ({type: caption, props: attrs}),
		iLink: (attrs) => ({type: iLink, props: {...attrs, ...props}}),
		Math: (attrs) => ({type: math, props: attrs}),
		ParaWrap: (attrs) => ({type: React.Fragment, props: attrs}),

		//HTML tag
		ul: (attrs) => ({type: 'ul', props: attrs}),
		ol: (attrs) => ({type: 'ol', props: attrs}),
		li: (attrs) => ({type: 'li', props: attrs}),
		b: (attrs) => ({type: 'b', props: attrs}),
		a: (attrs) => ({type: 'a', props: attrs}),
		p:(attrs) =>({type:'p',props:attrs}),

		table: (attrs) => ({type: 'table', props: attrs}),
		tr: (attrs) => ({type: 'tr', props: attrs}),
		td: (attrs) => ({type: 'td', props: attrs}),
		tbody: (attrs) => ({type: 'tbody', props: attrs})
	});

	if (Array.isArray(para)) {
		let left_title = para[0].para_parent.tocTitle;
		let right_title = xmlToReact.convert(`<span>${para[0].para_parent.title}</span>>`);

		return blockOfPara(para, left_title, right_title, props);
	}

	let decodedData = decodeURI(para.content.data);
	let reactTree = xmlToReact.convert(`<ParaWrap>${decodedData}</ParaWrap>`);

	return (
		<div key={_.uniqueId("div_")}>
			{reactTree}
		</div>
	)


}
