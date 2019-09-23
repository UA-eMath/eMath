import React from 'react'
import _ from "lodash"

// give para caption here; style para here;

export function addCaption(para, caption) {

	if (caption !== "null" && caption !== '') {
		para.unshift(<span key={_.uniqueId("caption_")}
		                   style={{fontWeight: "bold", paddingRight: "1.00em"}}>{caption}</span>);
	}

	return para
}