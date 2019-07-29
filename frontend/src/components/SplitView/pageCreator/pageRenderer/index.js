import _ from "lodash";
import React from 'react'

export default function contentProcessor(paraText, props) {

	return linkMarker(paraText, props);

}

function linkMarker(paraText, props) {

	let linkExtractor = new RegExp("<iLink.*?>(.*?)<\/iLink>", "g");
	let idExtractor = new RegExp("id = '(.*?)'", "g");

	return (_.map(paraText, (para) => {
		//mark link
		let parts = para;
		parts = parts.content.split(linkExtractor);
		for (let i = 1; i < parts.length; i += 2) {
			//get Link to id
			let id = parts[i].match(idExtractor);
			if (id) {
				id = id.map((val) => {
					val.replace("id = ", "")
				});
			}

			id = parseInt(id);
			parts[i] = <a onClick={props.onWindowOpen} style={{color: 'red'}}>{parts[i]}</a>
		}
		console.log(parts);

		return parts
	}))
}