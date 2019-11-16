const pageParas = {
	paras: [],
	status: null,
	uploadingQueue: {}
};

const paras = (state = pageParas, action) => {
	switch (action.type) {
		case "LOAD_PARAS":
			return Object.assign({}, state, {
				paras: action.data,
				status: action.status
			});

		case "LOAD_PARAS_ERROR":
			return Object.assign({}, state, {
				state: action.status
			});

		case "PARA_ONCHANGE":
			let temp_state = [];
			let temp_queue = {};
			//copy value
			Object.assign(temp_state, state.paras);
			Object.assign(temp_queue,state.uploadingQueue);

			//editing
			if (action.id !== null) {
				//find and replace
				temp_state.flat(Infinity)[temp_state.findIndex(i => i.id === action.id)].content.data.content = JSON.parse(action.para);
				if(temp_queue[action.id] === undefined){
					temp_queue[action.id] = {"status":"update"};
				}
			}

			return Object.assign({}, state, {
				paras: temp_state,
				uploadingQueue: temp_queue,
			});

		case "CLEAR_QUEUE":
			return Object.assign({},state,{
				uploadingQueue:{},
			});

		case "POP_QUEUE":
			return Object.assign({},state,{
				...state,
				uploadingQueue : delete state.uploadingQueue[action.id]
			});


		default:
			return state
	}


};

export default paras;