import React from "react";
import _ from "lodash";


export default function iLink(props) {
	return (
		<a className='textLink'
		        onClick={() => props.onWindowOpen(props.id)}
		        style={{color: '#297DB5'}}
		        key={_.uniqueId("iLink")}>
			{props.children}
		</a>
	)

}