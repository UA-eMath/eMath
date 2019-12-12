import {tagParser} from "./index";
import React from 'react'
import './index.css'
import _ from "lodash"
import {tableProcessor} from "./table";

/*
NOTE: A list can contain a table and nested list.
List processor
	A list object should be look like:
		{   ...
			"content":{
				"data": {
					"tag":"ol/ul",
					"content":[]
				},
				"type":"list"
			},
			...
	}
 */

export function listProcessor(listContent, props) {

	const List = listContent["tag"];

	return (
		<List>
			{listContent["content"].map(data => {
				if (typeof (data) === "object" && data["type"] === "list") {
					return (
						<li key={_.uniqueId("List_")}>
							<List >
								{listProcessor(data["data"], props)}
							</List>
						</li>
					)

				} else if (typeof (data) === "object" && data["type"] === "table") {
					return (
						<li key={_.uniqueId("Table_")}>
							{tableProcessor(data["data"], props)}
						</li>
					)
				} else if (Array.isArray(data)) {
					return (
						<li key={_.uniqueId("Array_")}>
							{
								data.map(mixData => {
									if (typeof (mixData) === "string") {
										return (tagParser(mixData, props))
									} else if (typeof (mixData) === "object" && mixData["type"] === "list") {
										return (listProcessor(mixData["data"], props))
									} else if (typeof (mixData) === "object" && mixData["type"] === "table") {
										return (tableProcessor(mixData["data"], props))
									}
									return null
								})
							}
						</li>
					)
				}
				return (
					<li key={_.uniqueId("Li_")}>
						{tagParser(data, props)}
					</li>
				)
			})}
		</List>
	)
}