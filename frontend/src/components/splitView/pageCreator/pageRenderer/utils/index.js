import React from 'react'
import './index.css'
import {mathDisplay} from "./mathDisplay";
import parse from "html-react-parser";
import _ from "lodash";

/*

A Para JSON structure is following:
	{
	"text":{
		"textAlign":"",
		"data":""
			},

	"table":{"direction":"v/h",
			"data":[
					   ["this ,"are "],
					   ["table","data"],
					   ["arrays are", "table rows"]
					]
			},
	"list":{"tag":"ol/ul",
			"content":[
				"1.",
				"2.",
				{"tag":"ol/li",
				 "content":[
					"1.1",
					"1.2"]}
				 ]
			}
	}

NOTE:
	1. a list can contain a table:
	{
	...
	"list":{"table":""},
	...
	}

 */
//////////////////////////////////////////////////////////////////

/*

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
			phrase: new RegExp("(<iLink.*?>.*?</iLink>)", "g"),
			id: new RegExp("id = '(.*?)'", "g"),
			content: new RegExp("<iLink.*?>(.*?)</iLink>", "g")
		},
		latex: {
			phrase: new RegExp("(<MathDisplay.*?>.*?</MathDisplay>)", "g"),
			inline: new RegExp("inline", 'g'),
			content: new RegExp("<MathDisplay.*?>(.*?)</MathDisplay>", "g"),
		}
	};

	//Link parser
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






