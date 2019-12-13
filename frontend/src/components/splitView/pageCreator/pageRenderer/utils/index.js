import React from 'react'
import './index.css'
import {mathDisplay} from "./mathDisplay";
import parse from "html-react-parser";
import _ from "lodash";

/*
A Text:
		{   ...
		"content":{
			"data": {
				"content":"some text",
				"textAlign":"center/left/right"
			},
			"type":"text"
		},
		...
	}
Text processor:
	1. add a caption in front of a para
	2. add link
	3. add math display

 */

//tag processor
export function tagParser(para, props) {
	// props = store.getProps();
	// regexs to match tags in string
	let regex = {
		link: {
			phrase: new RegExp("(<iLink.*?>.*?</iLink>)", "gi"),
			id: new RegExp("id = '(.*?)'", "g"),
			content: new RegExp("<iLink.*?>(.*?)</iLink>", "gi")
		},
		latex: {
			phrase: new RegExp("(<Math.*?>.*?</Math>)", "gi"),
			inline: new RegExp("inline", 'g'),
			content: new RegExp("<Math.*?>(.*?)</Math>", "gi"),
		}
	};

	//Link parser
	//TODO
	if (!para){
		return
	}
	let paragraphs = para.toString().split(regex.link.phrase);

	paragraphs = paragraphs.map((text, i) => {
		let id = (i % 2 !== 0) ? (text.split(regex.link.id)[i]) : null;
		if (id !== null) {

			text = text.split(regex.link.content)[1];

			return (
				<a className='textLink' onClick={() => props.onWindowOpen(id)} style={{color: '#297DB5'}} key={i}>
					{
						mathDisplay(text, regex)
					}
				</a>
			)
		} else {
			return mathDisplay(text, regex)
		}
	});

	return _.flatten(paragraphs).map(t => {
		if (_.isString(t)) {
			return parse(t)
		} else {
			return t
		}
	});

}






