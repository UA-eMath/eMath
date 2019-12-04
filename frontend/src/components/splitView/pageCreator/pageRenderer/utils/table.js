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
				if (typeof (tableRow) === 'object' && tableRow["type"] === "table") {
					return (
						tableProcessor(tableRow["data"], props)
					)
				} else if (typeof (tableRow) === "object" && tableRow["type"] === "list") {
					const List = tableRow["data"]["tag"];
					return (
						<tr key={rid}>
							<td>
								<div style={{wordWrap:"break-word"}}>
									<List>
										{listProcessor(tableRow["data"], props)}
									</List>
								</div>
							</td>
						</tr>
					)
				}
				return (
					<tr key={rid}>
						{
							tableRow.map((tableData, j) => {
								let id = i.toString() + j.toString();
								if (direction === 'v' && (i === 0)) {
									return (
										<th key={id}>
											<div style={{wordWrap:"break-word"}}>
												{tagParser(tableData, props)}
											</div>
										</th>
									)
								} else if (direction === 'h' && j === 0) {
									return (
										<th key={id}>
											<div style={{wordWrap:"break-word"}}>
												{tagParser(tableData, props)}
											</div>
										</th>
									)
								}

								return (
									<td key={id}>
										<div style={{wordWrap:"break-word"}}>
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