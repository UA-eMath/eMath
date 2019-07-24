import React from 'react'
import styles from "../styles/style";
import {Scrollbars} from 'react-custom-scrollbars';
import {Button} from 'react-desktop/windows';
import _ from "lodash";
import getPage from "../../../requests/getPage";
import getLinks from "../../../requests/getLinks";

export default function initElement(el) {
	return (
		<div key={el.i} data-grid={el}
		     style={{...styles.window}}>
			<div style={{...styles.titleBar}}>

				<Button onClick={
					() => {
						getPrePage(this.state.para_parent.pageNum,
							(prePageData) => {
								let promises = [];
								prePageData.forEach((data) => {
									promises.push(getLinks(data.id))
								});
								Promise.all(promises).then((response) => {
									this.setState({
										links: response
									});
								}).then(
									this.setState({
										pageTitle: prePageData[0].para_parent.title,
										para_parent: prePageData[0].para_parent,
										paraText: prePageData,
									})
								)
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
								let promises = [];
								nextPageData.forEach((data) => {
									promises.push(getLinks(data.id))
								});

								Promise.all(promises).then((response) => {
									this.setState({
										links: response
									});
								}).then(
									this.setState({
										pageTitle: nextPageData[0].para_parent.title,
										para_parent: nextPageData[0].para_parent,
										paraText: nextPageData,
									})
								)
							}
						)
					}
				}>Next</Button>
			</div>

			<Scrollbars>
				{processContent(this.state.paraText, this.state.links, this.props,this.state.pending)}
			</Scrollbars>
		</div>
	)
}

async function getNextPage(pageNum, setData) {
	await getPage({page: pageNum + 1}).then(nextPage => {
		if (!nextPage || nextPage.status !== 200) {
			console.error("FETCH_TAGS_FAILED", nextPage);
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
		else {
			setData(prePage.data)
		}
	})
}

function processContent(paraText, links, props,pending) {
	if(links.length !== paraText.length){
		return null
	}
	return (_.map(paraText, (para, key) => {
		if (links[key].length !== 0) {
			let parts = para;

			links[key].map((el) => {

				let linkPhrase = el.content;
				let re = new RegExp(linkPhrase, 'g');

				parts = parts.content.split(re);
				for (let i = 1; i < parts.length; i += 2) {
					parts[i] = <a onClick={props.onWindowOpen} style={{color: 'red'}}>{linkPhrase}</a>
				}

			});
			return parts;
		}
		else {
			return para.content
		}
	}))
}