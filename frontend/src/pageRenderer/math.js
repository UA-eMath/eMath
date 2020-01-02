import React from "react";
import MathJax from "../components/mathDisplay";
import _ from "lodash";

export default function math(props) {
	if (typeof props.inline !== undefined) {
		return (
			<MathJax.Node key={_.uniqueId('MJN_')} inline formula={props.children}/>
		)
	} else {
		return (
			<div
				key={_.uniqueId('MJN_')}
				style={{
					height: '40px',
					display: "flow-root",
					width: "100%",
					overflow: "visible",
				}}
			>
				<MathJax.Node formula={props.children}/>
			</div>
		)
	}
}