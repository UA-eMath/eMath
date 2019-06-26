import _ from "lodash";

const initState = {
	items: [0].map(function (i, key, list) {
		return {
			i: i.toString(),
			x: 0,
			y: 0,
			w: 6,
			h: 9.5,
			add: i === (list.length - 1).toString(),
			static: true,
		};
	}),
	newCounter: 0,
};


const windows = (state = initState, action) => {
	switch (action.type) {
		case 'OPEN_NEW_WINDOW':
			return Object.assign({},state,{
				items: state.items.concat({
					i: "n" + state.newCounter,
					x: 6,
					y: 0, // puts it at the bottom
					w: 6,
					h: 4,
					static: false,
				}),
				newCounter: state.newCounter+1
			});


		case 'CLOSE_WINDOW':
			return Object.assign({},state,{
				...state,
				items: _.reject(state.items, {i: action.id})
			});

		case 'ON_LAYOUT_CHANGE':
			return state;

		default:
			return state;
	}
};

export default windows;