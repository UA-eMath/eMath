import _ from "lodash";
import React from 'react'
import MathJax from 'react-mathjax'

export default function contentProcessor(paraText, props) {
	return (_.map(paraText, (para) => {

		let processingPara = para.content;

		processingPara = tagParser(processingPara, props);
		// processingPara = linkMarker(processingPara, props);
		// processingPara = mathDisplay(processingPara);
		//
		//processingPara = addCaption(processingPara);

		return processingPara
	}));

}

// give para caption here; style para here;
function addCaption(para) {

	if (para.caption !== "null" && para.caption !== '') {
		para.content = <p><span style={{fontWeight: "bold"}}>{para.caption}</span> <span>{para.content}</span></p>
	} else {
		para.content = <p><span>{para.content}</span></p>
	}

	return para
}

//tag processor
function tagParser(para, props) {

	// regexs to match tags in string
	let regex = {
		link: {
			phrase: new RegExp("(<iLink.*?>.*?</iLink>)", "g"),
			id: new RegExp("id = '(.*?)'", "g"),
			content: new RegExp("<iLink.*?>(.*?)</iLink>", "g")
		},
		latex: {
			phrase: new RegExp("(<MathDisplay.*?>.*?</MathDisplay>)", "g"),
			inline: new RegExp("inline = '(.*?)'", 'g'),
			content: new RegExp("<MathDisplay.*?>(.*?)</MathDisplay>", "g"),
		}
	};

	let paragraphs = para.split(regex.link.phrase) || [];


	paragraphs = paragraphs.map((text, i) => {
		let id = (i % 2 !== 0) ? (text.split(regex.link.id)[i]) : null;

		if (id !== null) {

			text = text.split(regex.link.content)[1];

			return (
				<a onClick={() => props.onWindowOpen(id)} style={{color: 'red'}} key={i}>
					{
						mathDisplay(text, regex)
					}
				</a>
			)
		} else {
			return mathDisplay(text, regex)
		}
	});

	return paragraphs
}

//process latex
function mathDisplay(text, regex) {
	//TODO: inline math or block math

	const MathJaxConfig = {
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

	let mathPart = text.split(regex.latex.phrase).filter(w=>w!=='');

	if (mathPart.length === 1) {
		return text
	}
	console.log(mathPart);

	return mathPart.map((mathText, j) => {
		if(j % 2 !== 1){
			return mathText
		}
		console.log(mathText);
		let inline = (j % 2 !== 0) ? (mathText.split(regex.latex.inline)[j]) : null;
		if (inline !== null) {
			return (
				<MathJax.Provider {...MathJaxConfig}>
					<MathJax.Node inline formula={mathText.split(regex.latex.content)[1]}/>
				</MathJax.Provider>)
		} else {
			return (
				<MathJax.Provider {...MathJaxConfig}>
					<div>
						<MathJax.Node formula={mathText.split(regex.latex.content)[1]}/>
					</div>
				</MathJax.Provider>
			)
		}
	})
}
