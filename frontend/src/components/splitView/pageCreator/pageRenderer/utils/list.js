import {tagParser} from "./index";
import React from 'react'
import './index.css'
import _ from "lodash"
import {tableProcessor} from "./table";

/*

List processor
	A list object should be look like:
	"list":{"tag":"ol/ul",
			"content":[
				"1.",
				"2.",
				{"tag":"ol/li",
				 "content":[
					"1.1",
					"1.2"]}
				 ]
			}
 */

export function listProcessor(listContent, props) {

	const List = listContent["tag"];

	return (
		<List>
			{listContent.content.map(data => {
				if (typeof(data) === "object" && data["tag"]) {
					return (
						<List key={_.uniqueId("List_")}>
							{listProcessor(data, props)}
						</List>
					)

				} else if (typeof (data) === "object" && data["table"]) {

					return (
						<li key={_.uniqueId("Table_")}>
							{tableProcessor(data["table"], props)}
						</li>
					)
				} else if (Array.isArray(data)) {
					return (
						<li key={_.uniqueId("Array_")}>
							{
								data.map(mixData => {
									if (typeof (mixData) === "string") {
										return (
											<div key={_.uniqueId("Array_p_")}>
												{tagParser(mixData, props)}
											</div>
										)
									} else if (typeof(mixData) === "object" && mixData["tag"]) {
										return (
											<List key={_.uniqueId("Array_List_")}>
												{listProcessor(mixData, props)}
											</List>
										)
									} else if (typeof (mixData) === "object" && mixData["table"]) {
										return (
											<div key={_.uniqueId("Array_Table_")}>
												{tableProcessor(mixData["table"], props)}
											</div>
										)
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