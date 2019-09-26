import React from 'react'
import './index.css'
import _ from "lodash"
import MathJax from '../../../../mathDisplay'


//process latex
export function mathDisplay(text, regex) {
	// const MathJaxConfig = {
	// 	script:
	// 		'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/MathJax.js?config=TeX-AMS_HTML',
	// 	options: {
	// 		extensions: ["tex2jax.js"],
	// 		jax: ["input/TeX", "output/HTML-CSS"],
	// 		"HTML-CSS": {
	// 			styles: {".MathJax_Preview": {visibility: "hidden"}}
	// 		},
	// 		"SVG": {
	// 			styles: {".MathJax_Preview": {visibility: "hidden"}}
	// 		},
	// 		tex2jax: {inlineMath: [["$", "$"], ["\\(", "\\)"]]},
	// 		TeX: {extensions: ["[Extra]/annotations.js", "[Extra]/xypic.js", "AMSmath.js", "AMSsymbols.js"]}
	// 	}
	// };

	let mathPart = text.split(regex.latex.phrase);

	return mathPart.map((mathText, j) => {
		if (j % 2 !== 1) {
			return mathText
		}
		let inline = mathText.match(regex.latex.inline);
		if (inline !== null) {
			return (
				<MathJax.Node key={_.uniqueId('MJN_')} inline formula={mathText.split(regex.latex.content)[1]}/>
			)

		} else {
			//["inline"]
			return (
				<div key={_.uniqueId('MJN_')}>
					<MathJax.Node formula={mathText.split(regex.latex.content)[1]}/>
				</div>
			)
		}
	})
}