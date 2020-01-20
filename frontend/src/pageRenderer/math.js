import React from "react";
import {Node, Context} from "react-mathjax2"
import _ from "lodash";
import MathJaxConfig from "../constants/MathJax_config";

export default function math(props) {
	let node;

	if (props.inline === "true") {
		node = <Node key={_.uniqueId('MJN_')} inline>
			{props.children}
		</Node>

	} else {
		node = <div key={_.uniqueId('MJN_')}>
			<Node>
				{props.children}
			</Node>
		</div>;
	}

	return (
		<span>
		<Context
			input='tex'
			onLoad={() => console.log("Loaded MathJax script!")}
			onError={(MathJax, error) => {
				console.warn(error);
				console.log("Encountered a MathJax error, re-attempting a typeset!");
				MathJax.Hub.Queue(
					MathJax.Hub.Typeset()
				);
			}}
			script={MathJaxConfig.script}
			option={MathJaxConfig.options}
		>
			{node}
		</Context>
			</span>
	)


}