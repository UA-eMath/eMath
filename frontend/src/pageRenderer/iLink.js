import React from "react";
import _ from "lodash";


export default function iLink(props) {
	console.log(11);
	return (
		<a className='textLink'
		        onClick={() => props.onWindowOpen(props.id,true)}
		        style={{color: '#297DB5'}}
		        key={_.uniqueId("iLink")}>
			{props.children}
		</a>
	)

}