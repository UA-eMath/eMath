import _ from "lodash";
import React from 'react'
import * as utils from './utils'

export default function contentProcessor(paraText, props) {

	return (_.map(paraText, para => {
		if(Array.isArray(para)){
			return blockOfPara(para);
		}

		let processingPara = para.content;
		let text, list, table;

		if (processingPara["text"]) {
			processingPara = utils.tagParser(processingPara["text"], props);
			text = utils.addCaption(processingPara, para.caption);
		}

		if (processingPara["table"]) {
			table = utils.tableProcessor(processingPara["table"],props)
		}

		if (processingPara["list"]) {
			list = utils.listProcessor(processingPara["list"],props);

		}

		return (
			<div key={_.uniqueId("div_")}>
				<div>
					{text}
					{table}
				</div>
				{list}
			</div>
		)
	}));

}


function blockOfPara(dataArray) {
	return(
		<div
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