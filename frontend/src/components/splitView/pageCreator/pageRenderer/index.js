import _ from "lodash";
import React from 'react'
import * as utils from './utils'
import {addCaption} from "./utils/caption";
import {listProcessor} from "./utils/list";
import {tableProcessor} from "./utils/table";
import {tagParser} from "./utils";
import {linkGroup} from "./utils/linkGroup";
import {blockOfPara} from "./utils/paraBlock";
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

			return blockOfPara(para, left_title, right_title, props);
		}

		let processingPara = para.content;
		let text, list, table, textAlign, links;

		let type = processingPara["type"];
		let data = processingPara["data"];

		if (type === "text") {
			textAlign = data["textAlign"];
			processingPara = utils.tagParser(data["content"], props);
			text =
				<div style={{"textAlign": textAlign, "marginBottom": "10px"}}>
					{addCaption(processingPara, para.caption)}
				</div>
		}

		else if (type === "table") {
			table = tableProcessor(data, props)
		}

		else if (type === "list") {
			list = listProcessor(data, props);
		}

		else if (type === 'linkGroup') {
			links = <div
					style={{
						padding: "3px",
						borderRadius: '2px 2px 0 0',
						overflow:"auto"
					}}>
					{linkGroup(data, props)}
				</div>
		}

		return (
			<div key={_.uniqueId("div_")}>
				{text}
				{table}
				{list}
				{links}
			</div>
		)
	}));

}