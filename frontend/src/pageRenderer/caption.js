import React from "react";
import _ from "lodash";


export default function caption(props) {
	
	return(
		<span key = {_.uniqueId("caption_")}
			className={"caption"}>
			{props.value}
		</span>
	)
}
