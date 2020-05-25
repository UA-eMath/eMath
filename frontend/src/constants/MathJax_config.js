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
		TeX: {extensions: ["[Extra]/annotations.js", "[Extra]/xypic.js", "AMSmath.js", "AMSsymbols.js","action.js"]}
	}
};

export default MathJaxConfig