import React from 'react';
import styles from "../styles/style";
import {Scrollbars} from 'react-custom-scrollbars';
import {NextButton} from '../styles/nextButton';
import {PreButton} from '../styles/preButton';

import getPage from "../../../requests/getPage";
import contentProcessor from './pageRenderer/index'

export default function initElement(el) {

	return (
		<div key={el.i} data-grid={el}
		     style={{...styles.window}}
		>
			<div style={{...styles.titleBar}}>
				<PreButton
					onClick={() => {
						getPrePage(this.state.pageNum,
							(prePageData) => {
								if (prePageData) {
									let num = this.state.pageNum - 1;
									this.setState({
										pageTitle: prePageData[0].para_parent.title,
										para_parent: prePageData[0].para_parent,
										paraText: prePageData,
										pageNum: num
									})
								}
							}
						)
					}}
				/>

				<span style={{...styles.title}}>
								{this.state.pageTitle}
							</span>

				<NextButton
					className='ml-auto'
					onClick={
						() => {
							getNextPage(this.state.pageNum,
								(nextPageData) => {
									let num = this.state.pageNum + 1;
									if (nextPageData) {
										this.setState({
											pageTitle: nextPageData[0].para_parent.title,
											para_parent: nextPageData[0].para_parent,
											paraText: nextPageData,
											pageNum: num
										});
									}
								}
							)
						}
					}/>

			</div>

			<Scrollbars>
				<div
					style={{
						background: '#F7F7EE',
						borderRadius: '2px',
						boxShadow: '0 0 0 1px rgba(0,0,0,0.1), 0 1px 10px rgba(0,0,0,0.35)',
						margin: '1em .9em',
						padding: '.25em 1.25em .1em',
						height: '300vh'
					}}>
					{contentProcessor(this.state.paraText, this.props)}
				</div>
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
	if (pageNum - 1 < 0) {
		return null
	}
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
