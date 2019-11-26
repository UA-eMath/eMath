export {}
const pageParas = {
	paras: [],
	status: null,
	uploadingQueue: {},
	title:null,
	id:null,
};

const paras = (state = pageParas, action) => {
	let temp_state = [];
	let temp_queue = {};

	switch (action.type) {
		case "LOAD_PARAS":
			return Object.assign({}, state, {
				paras: action.data,
				status: action.status,
				title:action.title,
				id:action.id,
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

				target_para.content.data.content = JSON.parse(action.para);

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