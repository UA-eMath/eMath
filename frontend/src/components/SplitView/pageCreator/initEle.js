import React from 'react'
import styles from "../styles/style";
import {Scrollbars} from 'react-custom-scrollbars';
import {Button} from 'react-desktop/windows';
import getPage from "../../../requests/getPage";
import contentProcessor from './pageRenderer/index'

import ScriptTag from 'react-script-tag';

export default function initElement(el) {
	// const latex = '\\xymatrix@!{\n' +
	// 	'              && a \\ar[r] \\ar[d]   & b \\ar[r] \\ar[d]   & c \\ar[d]\n' +
	// 	'                    \\ar`r[d]`[l]`^d[lll]|!{[];[d]}\\hole|!{[l];[dl]}\\hole|!{[ll];[dll]}\\hole\n' +
	// 	'                    `[dddll]|!{[ddllll];[ddll]}\\hole [dddll]\n' +
	// 	'                                                                       &   \\\\\n' +
	// 	'              && A  \\ar[r]^{f} \\ar[d]      & B \\ar[d]  \\ar[r]^{g}      & C \\ar[r]  \\ar[d]  & 0 \\\\\n' +
	// 	'    0 \\ar[rr] && X \\ar[d] \\ar[r]_{u}   & Y \\ar[d] \\ar[r]_{v}   & Z \\ar[d]        &   \\\\\n' +
	// 	'              && x \\ar[r] & y \\ar[r] & z &   \\\\\n' +
	// 	'    % vertical arrows\n' +
	// 	'    \\ar"1,3";"2,3"   \\ar"1,4";"2,4"   \\ar"1,5";"2,5"\n' +
	// 	'    \\ar"2,3";"3,3"^a \\ar"2,4";"3,4"^b \\ar"2,5";"3,5"^c\n' +
	// 	'    \\ar"3,3";"4,3"   \\ar"3,4";"4,4"   \\ar"3,5";"4,5"\n' +
	// 	'  }';




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
				{contentProcessor(this.state.paraText, this.props)}
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
