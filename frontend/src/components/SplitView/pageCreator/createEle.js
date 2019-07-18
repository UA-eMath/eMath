import React from 'react'
import styles from "../styles/style";
import {Scrollbars} from 'react-custom-scrollbars';
import TitleBar from '../../TitleBar';

export default function createElement(el) {
	const i = el.add ? "+" : el.i;
	console.log(el.h);

	return (
		<div key={i} data-grid={el}
		     style={{...styles.window}}>
			<TitleBar
				className='windowHeader'
				title={el.i}
				controls
				background={this.props.color}
				onCloseClick={() => {
					this.props.onCloseWindow(el.i)
				}}
				onMinimizeClick={() => {
					this.props.minimizeWindow(el.i)
				}}
			/>

			<Scrollbars>
				{}
			</Scrollbars>
		</div>
	)

}