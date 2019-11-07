import React from 'react'
/*
Link Groups:
		{   ...
		"content":{
			"data": "<iLink>..</iLink><iLink>..</iLink>",
			"type":"linkGroup"
		},
		...
	}
Text processor:
	1. add a caption in front of a para
	2. add link
	3. add math display

 */
export function linkGroup(links, props) {

	let regex = {
		link: {
			phrase: new RegExp("(<iLink.*?>.*?</iLink>)", "g"),
			id: new RegExp("id = '(.*?)'", "g"),
			content: new RegExp("<iLink.*?>(.*?)</iLink>", "g")
		},
	};

	let link_array = links.toString().split(regex.link.phrase);

	link_array = link_array.map((tag, i) => {
		let id = (i % 2 !== 0) ? (tag.split(regex.link.id)[i]) : null;
		if (id !== null) {
			tag = tag.split(regex.link.content)[1];
			return (
				<div
					style={{
						border: "1px solid Gray",
						float:"left",
						marginLeft:"5px",
						padding:"0px 8px"
					}}>
					<a className='textLink'
					   onClick={() => props.onWindowOpen(id)}
					   style={{color: '#297DB5'}}
					   key={i}>
						{tag}
					</a>
				</div>
			)
		}else {
		}
	});

	return link_array

}