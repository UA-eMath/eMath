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
	} else if (wrapperTagName ==='table') {
		return {
			"data": {
				"tag": wrapperTagName,
				"content": tableDomToJson(doc, [])
			},
			"type": "list"
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
				if (!isNested) {
					rowArray.push(tableData.innerHTML)
				} else if (isNested === "ol" || isNested === "ul") {
					rowArray.push({
						"data": {
							"tag": isNested,
							"content": listDomToJson(tableData, [])
						},
						"type": "list"
					})
				} else if (isNested === 'table') {
					rowArray.push({
						"data": {
							"direction": "",
							"content": tableDomToJson(tableData, [])
						},
						"type": "table"
					})
				} else {
					rowArray.push(tableData.innerHTML)
				}
			}
			contentArray.push(rowArray);
		}
		return contentArray;
	}

	function listDomToJson(dom, contentArray) {
		for (let i = 0; i < dom.childNodes.length; i++) {
			let domChild = dom.childNodes[i];
			let isNested = nodeExistenceChecker(domChild.childNodes);
			console.log(domChild,isNested);

			if (!isNested) {
				contentArray.push(typeof domChild.innerHTML === "undefined" ? "" : domChild.innerHTML)
			} else if (isNested === "ol" || isNested === "ul") {
				contentArray.push({
					"data": {
						"tag": isNested,
						"content": listDomToJson(domChild, [])
					},
					"type": "list"
				})
			} else if (isNested === 'table') {
				contentArray.push({
					"data": {
						"direction": "",
						"content": tableDomToJson(domChild, [])
					},
					"type": "table"
				})
			} else {
				let noneNodeString = "";
				let nestedArray = [];
				for (let j = 0; j < domChild.childNodes.length; j++) {
					console.log(domChild.childNodes[j].nodeName,nestedArray);
					if (!(["OL", "UL", "TABLE"].includes(domChild.childNodes[j].nodeName))) {
						noneNodeString += domChild.childNodes[j].innerHTML;
					} else if (["OL", "UL"].includes(domChild.childNodes[j].nodeName)) {
						noneNodeString += '\n';
						nestedArray.push(noneNodeString);
						noneNodeString = "";
						nestedArray.concat(listDomToJson(domChild.childNodes[j], []))
					} else {
						noneNodeString += '\n';
						nestedArray.push(noneNodeString);
						noneNodeString = "";
						nestedArray.concat(tableDomToJson(domChild.childNodes[j], []))
					}
				}
				contentArray.push(nestedArray)
			}
		}
		return contentArray
	}

	function nodeExistenceChecker(nodeList) {
		for (let i = 0; i < nodeList.length; i++) {
			console.log(nodeList[i].nodeName);
			if (nodeList[i].nodeName === "OL" || nodeList[i].nodeName === "UL") {
				if (i === 0) {
					return nodeList[i].nodeName.toLowerCase();
				} else {
					return "mixData"
				}

			} else if (nodeList[i].nodeName === 'TABLE') {
				if (i === 0) {
					return "table";
				} else {
					return "mixData"
				}
			}
		}
		return false;
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