import MathJax from 'react-mathjax'
import React from 'react'

// give para caption here; style para here;
export function addCaption(para, caption) {

	if (caption !== "null" && caption !== '') {
		para.unshift(<span style={{fontWeight: "bold",paddingRight:"1.00em"}}>{caption}</span>);
	}

	return para
}

//tag processor
export function tagParser(para, props) {

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
			TeX: {extensions: ["[Extra]/annotation.js","[Extra]/xypic.js", "AMSmath.js", "AMSsymbols.js"]}
		}
	};

	let mathPart = text.split(regex.latex.phrase);


	return mathPart.map((mathText, j) => {
		if (j % 2 !== 1) {
			return mathText
		}
		let inline = mathText.match(regex.latex.inline);

		if (inline !== null) {
			return (
				<MathJax.Provider {...MathJaxConfig} >
					<MathJax.Node inline formula={mathText.split(regex.latex.content)[1]}/>
				</MathJax.Provider>)
		} else {
			//["inline = 'true'"]
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


