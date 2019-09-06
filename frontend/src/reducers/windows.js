import _ from "lodash";

const initState_windows = {
	items: [0].map(function (i, key, list) {
		return {
			i: "0",
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


const windows = (state = initState_windows, action) => {
	switch (action.type) {
		case 'OPEN_NEW_WINDOW':
			if (typeof action.pageId !== "undefined") {
				return Object.assign({}, state, {
					items: state.items.concat({
						i: "n" + state.newCounter,
						x: 6,
						y: 0, // puts it at the bottom
						w: 6,
						h: 4,
						static: false,
						pageId : action.pageId
					}),
					newCounter: state.newCounter + 1
				});
			}
			else {
				return state;
			}


		case 'CLOSE_WINDOW':
			return Object.assign({}, state, {
				...state,
				items: _.reject(state.items, {i: action.id})
			});

		case 'ON_LAYOUT_CHANGE':
			// MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
			return state;


		default:
			return state;
	}
};


export default windows;