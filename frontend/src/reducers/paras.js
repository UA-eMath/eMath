const pageParas = {
	paras: [],
	status: null
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

			//copy value
			Object.assign(temp_state,state.paras);
			//find and replace
			temp_state[temp_state.findIndex(i => i.id === action.id)].content = JSON.parse(action.para);


			return Object.assign({}, state, {
				paras: temp_state
			});

		default:
			return state
	}


};

export default paras;