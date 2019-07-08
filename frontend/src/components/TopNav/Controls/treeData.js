import React from 'react'
import getToc from "../../../requests/getToc";

export default function fetchTocTree(next) {
	getToc().then(
		data => {
			if (!data || data.status !== 200) {
				console.error("FETCH_TAGS_FAILED", data);
			}
			else {
				next(data.data)
			}
		}
	)

}

//
// export default {
// 	treeData: [
// 		{
// 			title: 'Introduction',
// 			key: '0',
// 			children: []
// 		},
// 		{
// 			title: 'The Vector Space ℝn',
// 			key: '1',
// 			children: [
// 				{
// 					title: 'Higher Dimensions and the Vector Space ℝn',
// 					key: '2',
// 					children: [
// 						{
// 							title: 'Points and Coordinates',
// 							key: '3',
// 							children: []
// 						},
// 						{
// 							title: 'Cartesian Products of Subsets of n-Space',
// 							key: '4',
// 							children: []
// 						},
// 						{
// 							title: 'Equations in Several Variables',
// 							key: '5',
// 							children: []
// 						}
// 					]
// 				},
// 				{
// 					title: 'The Dot Product',
// 					key: '6',
// 					children: [
// 						{
// 							title: 'The Norm of a Vector',
// 							key: '7',
// 							children: []
// 						}
// 					]
// 				}
// 			]
// 		}
// 	]
// }