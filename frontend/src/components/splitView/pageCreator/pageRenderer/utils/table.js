import {listProcessor} from "./list";
import {tagParser} from "./index";
import React from 'react'

/*
NOTE: A table can contain a list and a nest table
table processor
	A table object should be look like:
		{   ...
			"content":{
				"data": {
					"direction":"v/h",
					"content":[[],[],[]]
				},
				"type":"table"
			},
			...
		}
direction: v => table head on top row
		   h => table head on left column
 */

export function tableProcessor(tableContent, props) {

	const direction = tableContent["direction"];
	let tableData = tableContent["content"];
	return (
		<table>
			<tbody>
			{tableData.map((tableRow, i) => {
				let rid = "row" + i.toString();

				return (
					<tr key={rid}>
						{
							tableRow.map((tableData, j) => {
								let id = i.toString() + j.toString();

								if (typeof (tableData) === 'object' && tableData["type"] === "table") {
									return (
										tableProcessor(tableData["data"], props)
									)
								} else if (typeof (tableData) === "object" && tableData["type"] === "list") {
									const List = tableData["data"]["tag"];
									return (
										<td key={id}>
											<div style={{wordWrap: "break-word"}}>
												<List>
													{listProcessor(tableData["data"], props)}
												</List>
											</div>
										</td>
									)
								} else if (Array.isArray(tableData)) {
									return (
										<td key={id}>
											{
												tableData.map(mixData => {
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
										</td>
									)
								}

								if (direction === 'v' && (i === 0)) {
									return (
										<th key={id}>
											<div style={{wordWrap: "break-word"}}>
												{tagParser(tableData, props)}
											</div>
										</th>
									)
								} else if (direction === 'h' && j === 0) {
									return (
										<th key={id}>
											<div style={{wordWrap: "break-word"}}>
												{tagParser(tableData, props)}
											</div>
										</th>
									)
								}

								return (
									<td key={id}>
										<div style={{wordWrap: "break-word"}}>
											{tagParser(tableData, props)}
										</div>
									</td>
								)
							})
						}
					</tr>
				)
			})}
			</tbody>
		</table>
	);

}