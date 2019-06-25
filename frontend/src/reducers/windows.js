import _ from "lodash";

const windows = (state = {}, action) => {
	switch (action.type) {
		case 'OPEN_NEW_WINDOW':
			return {
				...state,
				items: state.items.concat({
					i: "n" + this.state.newCounter,
					x: 6,
					y: 0, // puts it at the bottom
					w: 6,
					h: 4,
					static: false,
				}),
				// Increment the counter to ensure key is always unique.
				newCounter: this.state.newCounter + 1
			};


		case 'CLOSE_WINDOW':
			return [
				...state,
				{
					items: _.reject(this.state.items, {i: action.id})
				}
			];
		default:
			return state;
	}
};

export default windows;