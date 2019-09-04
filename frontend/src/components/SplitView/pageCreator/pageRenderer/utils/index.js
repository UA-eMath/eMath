import MathJax from 'react-mathjax'
import React from 'react'
import './index.css'
import _ from "lodash"
/*

A Para JSON structure is following:
	{
	"text":"",
	"table":"",
	"list":""
	}

NOTE:
	1. a list can contain a table:
	{
	...
	"list":{"table":""},
	...
	}

 */
//////////////////////////////////////////////////////////////////

/*

Text processor:
	1. add a caption in front of a para
	2. add link
	3. add math display

 */

// give para caption here; style para here;
export function addCaption(para, caption) {

	if (caption !== "null" && caption !== '') {
		para.unshift(<span key={_.uniqueId("caption_")} style={{fontWeight: "bold", paddingRight: "1.00em"}}>{caption}</span>);
	}

	return para
}

//tag processor
export function tagParser(para, props) {
	// props = store.getProps();
	// regexs to match tags in string
	let regex = {
		link: {
			phrase: new RegExp("(<iLink.*?>.*?</iLink>)", "g"),
			id: new RegExp("id = '(.*?)'", "g"),
			content: new RegExp("<iLink.*?>(.*?)</iLink>", "g")
		},
		latex: {
			phrase: new RegExp("(<MathDisplay.*?>.*?</MathDisplay>)", "g"),
			inline: new RegExp("inline", 'g'),
			content: new RegExp("<MathDisplay.*?>(.*?)</MathDisplay>", "g"),
		}
	};
	let paragraphs = para.split(regex.link.phrase);

	paragraphs = paragraphs.map((text, i) => {
		let id = (i % 2 !== 0) ? (text.split(regex.link.id)[i]) : null;

		if (id !== null) {

			text = text.split(regex.link.content)[1];

			return (
				<a onClick={() => props.onWindowOpen(id)} style={{color: 'red'}} key={i}>
					{
						mathDisplay(text, regex)
					}
				</a>
			)
		} else {
			return mathDisplay(text, regex)
		}
	});

	return paragraphs
}

//process latex
export function mathDisplay(text, regex) {
	const MathJaxConfig = {
		script:
			'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/MathJax.js?config=TeX-AMS_HTML',
		options: {
			extensions: ["tex2jax.js"],
			jax: ["input/TeX", "output/HTML-CSS"],
			"HTML-CSS": {
				styles: {".MathJax_Preview": {visibility: "hidden"}}
			},
			"SVG": {
				styles: {".MathJax_Preview": {visibility: "hidden"}}
			},
			tex2jax: {inlineMath: [["$", "$"], ["\\(", "\\)"]]},
			TeX: {extensions: ["[Extra]/annotations.js", "[Extra]/xypic.js", "AMSmath.js", "AMSsymbols.js"]}
		}
	};

	let mathPart = text.split(regex.latex.phrase);


	return mathPart.map((mathText, j) => {
		if (j % 2 !== 1) {
			return mathText
		}
		let inline = mathText.match(regex.latex.inline);

		if (inline !== null) {
			return (
				<MathJax.Provider {...MathJaxConfig} >
					<MathJax.Node inline formula={mathText.split(regex.latex.content)[1]}/>
				</MathJax.Provider>)
		} else {
			//["inline = 'true'"]
			return (
				<MathJax.Provider {...MathJaxConfig}>
					<div>
						<MathJax.Node formula={mathText.split(regex.latex.content)[1]}/>
					</div>
				</MathJax.Provider>
			)
		}
	})
}


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
			}
			]
 */

export function listProcessor(listContent,props) {

	const List = listContent["tag"];

	return (
		<List key={_.uniqueId("List_")}>
			{listContent.content.map(data => {

				if (typeof(data) === "object" && data["tag"]) {
					return (
						<List key={_.uniqueId("List_")}>
							{listProcessor(data,props)}
						</List>
					)

				} else if (typeof (data) === "object" && data["table"]) {

					return (
						<li key={_.uniqueId("Table_")}>
							{tableProcessor(data["table"],props)}
						</li>
					)
				} else if (Array.isArray(data)) {
					return (
						<li key={_.uniqueId("Array_")}>
							{
								data.map(mixData => {
									if (typeof (mixData) === "string") {
										return (
											<p key={_.uniqueId("Array_p_")}>
												{tagParser(mixData,props)}
											</p>
										)
									} else if (typeof(mixData) === "object" && mixData["tag"]) {
										return (
											<List key={_.uniqueId("Array_List_")}>
												{listProcessor(mixData,props)}
											</List>
										)
									} else if (typeof (mixData) === "object" && mixData["table"]) {
										return (
											<div key={_.uniqueId("Array_Table_")}>
												{tableProcessor(mixData["table"],props)}
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
						{tagParser(data,props)}
					</li>
				)
			})}
		</List>
	)
}

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

export function tableProcessor(tableContent,props) {

	const direction = tableContent["direction"];
	let tableData = tableContent["data"];
	return (
		<table>
			<tbody>
			{tableData.map((tableRow, i) => {
				let rid = "row" + i.toString();
				if (typeof(tableRow) === 'object' && tableRow["table"]) {
					return (
						tableProcessor(tableRow["table"],props)
					)
				} else if (typeof(tableRow) === "object" && tableRow["list"]) {
					const List = tableRow["list"]["tag"];
					return (
						<tr key={rid}>
							<td>
								<List>
									{listProcessor(tableRow["list"],props)}
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
											{tagParser(tableData,props)}
										</th>
									)
								} else if (direction === 'h' && j === 0) {
									return (
										<th key={id}>
											{tagParser(tableData,props)}
										</th>
									)
								}

								return (
									<td key={id}>
										{tagParser(tableData,props)}
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


