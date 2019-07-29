import _ from "lodash";
import React from 'react'

export default function contentProcessor(paraText, props) {

	return linkMarker(paraText, props);

}

function linkMarker(paraText, props) {

	let linkExtractor = new RegExp("<iLink.*?>(.*?)</iLink>", "g");
	let idExtractor = new RegExp("id = '(.*?)'", "g");

	return (_.map(paraText, (para) => {
		//mark link
		let parts_with_id = para.content.match(linkExtractor);
		let parts = para.content.split(linkExtractor);

		//index to loop id array
		let j = 0;

		for (let i = 1; i < parts.length; i += 2) {
			//get Link_to id
			let id = parts_with_id[j].split(idExtractor)[1];

			id = Number(id);
			console.log(id);

			parts[i] = <a onClick={props.onWindowOpen} style={{color: 'red'}}>{parts[i]}</a>

			j++;
		}

		return parts
	}))
}