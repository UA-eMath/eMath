import _ from "lodash";
import React from 'react'
import * as utils from './utils'

export default function contentProcessor(paraText, props) {
	return (_.map(paraText, (para) => {
		console.log(para);
		let processingPara = para.content;

		processingPara = utils.tagParser(processingPara, props);
		processingPara = utils.addCaption(processingPara, para.caption);


		return (
			<div>
				{processingPara}
			</div>
		)
	}));

}
