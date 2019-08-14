import _ from "lodash";
import React from 'react'
import MathJax from 'react-mathjax'

export default function contentProcessor(paraText, props) {

	return (_.map(paraText, (para) => {

		para = linkMarker(para, props);
		para = mathDisplay(para);

		para = addCaption(para);
		return para.content
	}));


}

// give para caption here; style para here;
function addCaption(para) {

	if(para.caption !== "null" && para.caption !== ''){
		para.content = <p><span style={{fontWeight: "bold"}}>{para.caption}</span>  <span>{para.content}</span> </p>
	}else {
		para.content = <p> <span>{para.content}</span> </p>
	}

	return para
}

//process latex
function mathDisplay(para) {
	//TODO: inline math or block math
	const props = {
		script:
			'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/MathJax.js?config=TeX-MML-AM_CHTML',
		options: {

			extensions: ["tex2jax.js"],
			jax: ["input/TeX", "output/HTML-CSS"],
			"HTML-CSS": {
				styles: {".MathJax_Preview": {visibility: "hidden"}}
			},
			"SVG": {
				styles: {".MathJax_Preview": {visibility: "hidden"}}
			},
			tex2jax: {inlineMath: [["$", "$"], ["\\(", "\\)"]]},
			TeX: {extensions: ["http://sonoisa.github.io/xyjax_ext/xypic.js", "AMSmath.js", "AMSsymbols.js"]}
		}
	};

	let mathExtractor = new RegExp("<MathDisplay.*?>(.*?)</MathDisplay>", "g");
	let inline = new RegExp("inline = '(.*?)'",'g');

	let mathPartWithinline = para.content.match(mathExtractor);
	let mathPart = para.content.split(mathExtractor);

	let j = 0;
	for (let i = 1; i < mathPart.length; i += 2) {

		let isInline = mathPartWithinline[j].split(inline);

		if(isInline.length <= 1){
			mathPart[i] = <MathJax.Provider {...props}>
					<div>
						<MathJax.Node formula={mathPart[i]}/>
					</div>
				</MathJax.Provider>
		}else {
			mathPart[i] = <MathJax.Provider {...props}>
						<MathJax.Node inline formula={mathPart[i]}/>
				</MathJax.Provider>
		}
		j++;
	}
	para.content = mathPart;
	return para
}


// add link
function linkMarker(para, props) {

	let linkExtractor = new RegExp("<iLink.*?>(.*?)</iLink>", "g");
	let idExtractor = new RegExp("id = '(.*?)'", "g");

	//mark link
	let parts_with_id = para.content.match(linkExtractor);
	let parts = para.content.split(linkExtractor);

	//index to loop id array
	let j = 0;

	for (let i = 1; i < parts.length; i += 2) {
		//get Link_to id
		let id = parts_with_id[j].split(idExtractor)[1];

		id = Number(id);
		parts[i] = <a onClick={() => props.onWindowOpen(id)} style={{color: 'red'}}>{parts[i]}</a>;

		j++;
	}
	para.content = parts[0];


	return para
}