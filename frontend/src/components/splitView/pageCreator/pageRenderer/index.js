import _ from "lodash";
import React from 'react'
import * as utils from './utils'
import {addCaption} from "./utils/caption";
import {listProcessor} from "./utils/list";
import {tableProcessor} from "./utils/table";
import {tagParser} from "./utils";
import {PageHeader} from 'antd';

/*
A Para JSON structure is following:
	{   ...
		"content":{
			"data": {
			},
			"type":""
		},
		...
	}
*/
export default function contentProcessor(paraText, props) {

	return (_.map(paraText, para => {
		if (Array.isArray(para)) {
			let left_title = para[0].para_parent.tocTitle;
			let right_title = utils.tagParser(para[0].para_parent.title, props);

			return blockOfPara(para, left_title, right_title);
		}

		let processingPara = para.content;
		let text, list, table, textAlign;

		let type = processingPara["type"];
		let data = processingPara["data"];

		if (type === "text") {
			textAlign = data["textAlign"];
			processingPara = utils.tagParser(data["content"], props);
			text = addCaption(processingPara, para.caption);
		}

		else if (type === "table") {
			table = tableProcessor(data, props)
		}

		else if (type === "list") {
			list = listProcessor(data, props);
		}

		return (
			<div key={_.uniqueId("div_")}>
				<div style={{"textAlign": textAlign, "marginBottom": "10px"}}>
					{text}
				</div>

				{table}
				{list}
			</div>
		)
	}));

}

//  A block of paras which are inside of a sub-level will be represented as an inner array.
// For a para array, inner para will be like: [xxx,[xxx,xxx],xxx]

function blockOfPara(dataArray, left_title, right_title) {
	console.log(dataArray);
	let boxHeader;

	if (left_title || right_title) {
		boxHeader =
			<div
				style={{
					background: 'linear-gradient(#fdf5e8,#EAE7DC)',
					borderRadius: '2px 2px 0 0',
					padding: "2px 4px 2px 4px"
				}}>
				<span>
					<b>{left_title}</b>
				</span>
				<span
					style={{float: "right"}}>
					<b>{right_title}</b>
				</span>
			</div>
	}

	return (
		<div
			key={_.uniqueId("blockOfPara_")}
			style={{
				background: '#fdf5e8',
				borderRadius: '2px',
				boxShadow: '0 0 0 1px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.35)',
			}}>
			{boxHeader}
			<div
				style={{
					padding: "2px 4px 2px 4px"
				}}>
				{contentProcessor(dataArray)}
			</div>

		</div>

	)
}