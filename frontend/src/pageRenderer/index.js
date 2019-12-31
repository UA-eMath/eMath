import _ from "lodash";
import React from 'react'
import XMLToReact from '@condenast/xml-to-react';

export default function paraRenderer(para, props) {

	const xmlToReact = new XMLToReact({
		/* converters */
		ul: (attrs) => ({type: 'ul', props: attrs}),
		ol: (attrs) => ({type: 'ol', props: attrs}),
		li: (attrs) => ({type: 'li', props: attrs}),
		b: (attrs) => ({type: 'b', props: attrs}),
		a: (attrs) => ({type: 'a', props: attrs}),



	});


	let reactTree = xmlToReact.convert(para);

	return (
		<div key={_.uniqueId("div_")}>
			{reactTree}
		</div>
	)


}
