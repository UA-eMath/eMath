import React from 'react'
import getToc from "../../../requests/getToc";

export default function fetchTocTree(id,next) {
	getToc({id:id}).then(
		data => {
			if (!data || data.status !== 200) {
				console.error("FETCH_TAGS_FAILED", data);
			}
			else {
				next(data.data.children)
			}
		}
	)

}