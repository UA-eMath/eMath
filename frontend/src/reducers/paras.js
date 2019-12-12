export {}
const pageParas = {
	paras: [],
	status: null,
	uploadingQueue: {},
	title: null,
	id: null,
};

function stringToObj(str) {
	let listArray = str.split(/\\/g).join("\\");
	listArray = listArray
		.replace(/"/g, '&quot;')
		.replace(/\t/g, "")
		.replace(/\n/g, "");

	let parser = new DOMParser();

	//TODO error handling
	//ol/ul, table, #text

	let doc = parser.parseFromString(listArray, "text/html").getElementsByTagName("body")[0].childNodes[0];
	let wrapperTagName = doc.nodeName.toLowerCase();

	if (['ol', 'ul'].includes(wrapperTagName)) {
		return {
			"data": {
				"tag": wrapperTagName,
				"content": listDomToJson(doc, [])
			},
			"type": "list"
		}
	} else if (wrapperTagName === 'table') {
		return {
			"data": {
				"direction": "",
				"content": tableDomToJson(doc, [])
			},
			"type": "table"
		}
	} else {
		return {
			"data": {
				"textAlign": "",
				"content": listArray
			},
			"type": "text"
		}
	}

	function tableDomToJson(dom, contentArray) {
		for (let i = 0; i < dom.childNodes[0].childNodes.length; i++) {
			//tr
			let tableRow = dom.childNodes[0].childNodes[i];
			let rowArray = [];
			for (let j = 0; j < tableRow.childNodes.length; j++) {
				let tableData = tableRow.childNodes[j];
				let isNested = nodeExistenceChecker(tableData);

				console.log(tableData, isNested);
				if (isNested === "ol" || isNested === "ul") {
					rowArray.push({
						"data": {
							"tag": isNested,
							"content": listDomToJson(["ol", "ul"].includes(tableData)?tableData:tableData.childNodes[0], [])
						},
						"type": "list"
					})
				} else if (isNested === 'table') {
					rowArray.push({
						"data": {
							"direction": "",
							"content": tableDomToJson(["table"].includes(tableData)?tableData:tableData.childNodes[0], [])
						},
						"type": "table"
					})
				} else if (!isNested) {
					rowArray.push(tableData.textContent)
				} else {
					rowArray.push(listDomToJson(tableData, []))
				}
			}
			contentArray.push(rowArray);
		}
		return contentArray;
	}

{/*	<ol>*/}
{/*<li>awdawd<ul><li>dwadaw</li></ul></li>*/}
{/*<li><ul><li>dwadaw</li></ul></li>*/}
{/*</ol>*/}

	function listDomToJson(dom, contentArray) {
		for (let i = 0; i < dom.childNodes.length; i++) {
			//li
			let domChild = dom.childNodes[i];
			let isNested = nodeExistenceChecker(domChild);
			console.log(domChild,isNested);

			if (["ol", "ul"].includes(isNested)) {
				console.log(["ol", "ul"].includes(domChild)?domChild:domChild.childNodes[0]);
				contentArray.push({
					"data": {
						"tag": isNested,
						"content": listDomToJson(["ol", "ul"].includes(domChild)?domChild:domChild.childNodes[0], [])
					},
					"type": "list"
				})
			} else if (['table'].includes(isNested)) {
				contentArray.push({
					"data": {
						"direction": "",
						"content": tableDomToJson(["table"].includes(domChild)?domChild:domChild.childNodes[0], [])
					},
					"type": "table"
				})
			} else if (!isNested) {
				contentArray.push(domChild.textContent)
			}
			else if (typeof isNested === "undefined") {
				console.dir(domChild);
				contentArray.push(domChild.outerHTML)
			} else {
				//mixdata
				contentArray.push(listDomToJson(domChild, []))
			}
		}

		return contentArray
	}

	function nodeExistenceChecker(node) {
		if (["ol", "ul","table"].includes(node.nodeName.toLowerCase())) {
			return node.nodeName.toLowerCase()
		}
		if (node.childNodes.length === 1) {
			let nestedNodeName = node.childNodes[0].nodeName.toLowerCase();
			if (["ol", "ul", "table"].includes(nestedNodeName)) {
				return nestedNodeName
			}
		} else if (node.childNodes.length === 0) {
			//text
			return false
		} else {
			return "mixData"
		}
	}
}

const paras = (state = pageParas, action) => {
	let temp_state = [];
	let temp_queue = {};

	switch (action.type) {
		case "LOAD_PARAS":
			return Object.assign({}, state, {
				paras: action.data,
				status: action.status,
				title: action.title,
				id: action.id,
			});

		case "LOAD_PARAS_ERROR":
			return Object.assign({}, state, {
				state: action.status
			});

		case "PARA_ONCHANGE":

			//copy value
			Object.assign(temp_state, state.paras);
			Object.assign(temp_queue, state.uploadingQueue);

			//editing
			if (action.id !== null) {
				//find and replace
				let flat_state = temp_state.flat(Infinity);
				let target_para = flat_state[flat_state.findIndex(i => i.id === action.id)];

				try {
					target_para.content = stringToObj(action.para);
					console.log(target_para.content);
				} catch (e) {
					console.log(e);
				}

				//update uploading queue
				if (temp_queue[action.id] === undefined) {
					temp_queue[action.id] = {
						"status": "update",
						"content": target_para.content,
						"caption": target_para.caption,
					};
				} else {
					temp_queue[action.id]["data"] = target_para.content
				}
			}

			return Object.assign({}, state, {
				paras: temp_state,
				uploadingQueue: temp_queue,
			});

		case "CLEAR_QUEUE":
			return Object.assign({}, state, {
				uploadingQueue: {},
			});

		case "POP_QUEUE":

			Object.assign(temp_queue, state.uploadingQueue);

			delete temp_queue[action.id];

			return Object.assign({}, state, {
				uploadingQueue: temp_queue
			});


		default:
			return state
	}


};

export default paras;