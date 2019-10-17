import _ from "lodash";
import React from 'react'
import * as utils from './utils'
import {addCaption} from "./utils/caption";
import {listProcessor} from "./utils/list";
import {tableProcessor} from "./utils/table";

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
		if(Array.isArray(para)){
			return blockOfPara(para);
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
			table = tableProcessor(data,props)
		}

		else if (type === "list") {
			list = listProcessor(data,props);
		}

		return (
			<div key={_.uniqueId("div_")}>
				<div style={{"textAlign":textAlign,"marginBottom":"10px"}}>
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

function blockOfPara(dataArray) {

	return(
		<div
			key={_.uniqueId("blockOfPara_")}
			style={{background: '#fdf5e8',
                    borderRadius: '2px',
				    boxShadow: '0 0 0 1px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.35)',
				    margin: '1em .9em',
				    padding: '.25em 1.25em .1em'
			}}>
			{contentProcessor(dataArray)}
		</div>
	)
}