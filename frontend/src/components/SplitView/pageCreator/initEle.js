import React from 'react'
import styles from "../styles/style";
import {Scrollbars} from 'react-custom-scrollbars';
import {Button} from 'react-desktop/windows';
import getPage from "../../../requests/getPage";
import contentProcessor from './pageRenderer/index'
// import MathJax from '../../../components/MathDisplay'
import MathJax from 'react-mathjax'

import ScriptTag from 'react-script-tag';

export default function initElement(el) {
	const latex = 'A\\xymatrix{\n' +
		'(f_1)_*x_1 \\ar[r]_a \\ar[d]_{(f_1)_*b_1} & (f_2)_*x_2 \\ar[d]^{(f_2)_*b_2} \\\\\n' +
		'(f_1)_*x\'_1 \\ar[r]^{a\'} & (f_2)_*x\'_2.\n' +
		'}B';
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


	return (
		<div key={el.i} data-grid={el}
		     style={{...styles.window}}>
			<div style={{...styles.titleBar}}>

				<Button onClick={
					() => {
						getPrePage(this.state.para_parent.pageNum,
							(prePageData) => {
								this.setState({
									pageTitle: prePageData[0].para_parent.title,
									para_parent: prePageData[0].para_parent,
									paraText: prePageData,
								})
							}
						)
					}
				}>Pre</Button>

				<span style={{...styles.title}}>
								{this.state.pageTitle}
							</span>

				<Button className='ml-auto' onClick={
					() => {
						getNextPage(this.state.para_parent.pageNum,
							(nextPageData) => {
								this.setState({
									pageTitle: nextPageData[0].para_parent.title,
									para_parent: nextPageData[0].para_parent,
									paraText: nextPageData,
								});
							}
						)
					}
				}>Next</Button>
			</div>

			<Scrollbars>
				<MathJax.Provider {...props}>
					<div>
						This is an inline math formula: <MathJax.Node inline formula={'a = b'}/>
						And a block one:

						<MathJax.Node formula={latex}/>
					</div>
				</MathJax.Provider>

				{/*{contentProcessor(this.state.paraText, this.props)}*/}
			</Scrollbars>
		</div>
	)
}

async function getNextPage(pageNum, setData) {
	await getPage({page: pageNum + 1}).then(nextPage => {
		if (!nextPage || nextPage.status !== 200) {
			console.error("FETCH_TAGS_FAILED", nextPage);
		}
		else if (nextPage.data.length === 0) {
			return null
		}
		else {
			setData(nextPage.data)
		}
	})
}

async function getPrePage(pageNum, setData) {
	await getPage({page: pageNum - 1}).then(prePage => {
		if (!prePage || prePage.status !== 200) {
			console.error("FETCH_TAGS_FAILED", prePage);
		}
		else if (prePage.data.length === 0) {
			return null
		}
		else {
			setData(prePage.data)
		}
	})
}
