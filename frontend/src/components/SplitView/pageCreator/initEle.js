import React from 'react'
import styles from "../styles/style";
import {Scrollbars} from 'react-custom-scrollbars';
import {Button} from 'react-desktop/windows';
import _ from "lodash";

export default function initElement(el) {
	return (
			<div key={el.i} data-grid={el}
			     style={{...styles.window}}>
				<div style={{...styles.titleBar}}>

					<Button>Pre</Button>

					<span style={{...styles.title}}>
								{this.state.pageTitle}
							</span>

					<Button className='ml-auto'>Next</Button>

				</div>

				<Scrollbars>
					{processContent(this.state.paraText,this.state.links,this.props)}

				</Scrollbars>
			</div>
		)

}

function processContent(paraText,links,props) {
		return (_.map(paraText, (para, key) => {

			if (links[key].length !== 0) {
				let parts = para;

				links[key].map( (el)=> {

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