import {listProcessor} from "./list";
import {tagParser} from "./index";
import React from 'react'

/*

table processor
	A table object should be look like:
	"table":{"direction":"v/h",
			"data":[
					   ["this ,"are "],
					   ["table","data"],
					   ["arrays are", "table rows"]
					]
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
				if (typeof(tableRow) === 'object' && tableRow["type"]==="table") {
					return (
						tableProcessor(tableRow["data"], props)
					)
				} else if (typeof(tableRow) === "object" && tableRow["type"]==="list") {
					const List = tableRow["data"]["tag"];
					return (
						<tr key={rid}>
							<td>
								<List>
									{listProcessor(tableRow["data"], props)}
								</List>
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
											{tagParser(tableData, props)}
										</th>
									)
								} else if (direction === 'h' && j === 0) {
									return (
										<th key={id}>
											{tagParser(tableData, props)}
										</th>
									)
								}

								return (
									<td key={id}>
										{tagParser(tableData, props)}
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