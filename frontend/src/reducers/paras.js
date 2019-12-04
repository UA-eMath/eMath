export {}
const pageParas = {
	paras: [],
	status: null,
	uploadingQueue: {},
	title: null,
	id: null,
};

function stringToObj(str, obj) {
	if (obj.type === 'text') {
		return str
	} else if (obj.type === 'list') {
		//escape \ and quotes
		let listArray = str.split(/\\/g).join("\\\\");
		listArray = listArray
			.replace(/"/g, '&quot;')
			.replace(/\t/g, "")
			.replace(/<ol>/g, '["ol",')
			.replace(/<ul>/g, '["ul",')
			.replace(/<li>/g, '"')
			.replace(/<\/li><\/ul>|<\/li>\n<\/ul>|<\/li><\/ol>|<\/li>\n<\/ol>/g, '"]')
			.replace(/<\/li>/g, '",')
			.replace(/<\/ol>|<\/ul>/g, ']')
			.replace(/"[^"]*(?:""[^"]*)*"/g, function (m) {
				return m.replace(/\n/g, '&q@q&');
			})
			.replace(/\n/g, "");

		let parsed_array = JSON.parse(listArray);
		parsed_array.shift();
		console.log(parsed_array);

		function arrayToObj(parsed_array) {
			return parsed_array.map(item => {

				if (Array.isArray(item)) {
					let array_indicator = item.shift();

					if (array_indicator === 'ol' || array_indicator === 'ul') {
						return {
							"data": {
								"tag": array_indicator,
								"content": arrayToObj(item)
							},
							"type": "list"
						}
					} else {
						return {
							"data":{
								"direction" : array_indicator,
								"content" : item
							}
						}
					}

				} else {
					return item;
				}
			});
		}

		return arrayToObj(parsed_array);

	} else if (obj.type === 'table') {
		let tableArray =  str.split(/\\/g).join("\\\\");
		tableArray = tableArray
			.replace(/"/g, '&quot;')
			.replace(/\t/g, "")
			.replace(/\n/g, "")
			.replace(/<table>|<tr>/g,"[")
			.replace(/<td>|<th>/g,"\"")
			.replace(/<\/td><\/tr><\/table>/g,'"]]')
			.replace(/<\/td><\/tr>/g,'"],')
			.replace(/<\/td>/g,'",')
			.replace(/<\/tr>/g,",")
			.replace(/<\/table>/g,"]");

		let parsed_array = JSON.parse(tableArray);

		return parsed_array
	}
	// return str.split(/\\/g).join("\\\\");
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
					target_para.content.data.content = stringToObj(action.para, target_para.content);
					//console.log(target_para.content.data.content);
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