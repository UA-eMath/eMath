import React from 'react'
import styles from "../styles/style";
import {Scrollbars} from 'react-custom-scrollbars';
import {Button} from 'react-desktop/windows';
import _ from "lodash";
import axios from 'axios'
import url from '../../../requests/Urls'

export default function initElement(el) {
	return (
		<div key={el.i} data-grid={el}
		     style={{...styles.window}}>
			<div style={{...styles.titleBar}}>

				<Button>Pre</Button>

				<span style={{...styles.title}}>
								Chapter one - Higher Dimensions and the Vector Space ℝn
							</span>

				<Button className='ml-auto'>Next</Button>

			</div>

			<Scrollbars>
				{console.log(this.state.paraText)}
				{
					console.log(linksCollector(this.state.paraText))
				}

			</Scrollbars>
		</div>
	)
}

const linksCollector = (paras) => {
	let promises = [];
	paras.map((data) => {
		promises.push(fetchLinks(data.id))
	});

	Promise.all(promises).then((response)=> {
		console.log(response);
		return promises
	})
};

function fetchLinks(ids) {
	let Url = url.domain + ':' + url.port + "/Link/Internal/?id=" + ids;

	return new Promise(resolve => {
		axios.get(Url, {
			headers: {
				"Content-Type": "application/json"
			},
		})
			.then(function (response) {
				resolve(response.data);
			}).catch((error) => console.error(error));
	});
}