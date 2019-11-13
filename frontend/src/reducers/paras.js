const pageParas = {
	paras : [],
	status: null
};

const paras = (state = pageParas, action)=>{
	switch (action.type) {
		case "LOAD_PARAS":
			return Object.assign({},state,{
				paras:action.data,
				status:action.status
			});
		case "LOAD_PARAS_ERROR":
			return Object.assign({},state,{
				state:action.status
			});


		default:
			return state
	}


};

export default paras;