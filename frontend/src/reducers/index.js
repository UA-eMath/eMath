import {combineReducers} from 'redux'
import {
	OPEN_NEW_WINDOW,
	MINIMIZE_WINDOW,
	CLOSE_WINDOW
} from '../actions'

let state = {
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
	isMaximized: true,
};

function windows(state = state, action) {
	switch (action.type) {
		case OPEN_NEW_WINDOW:
			return [
				...state,
				{
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
				}
			];
		case CLOSE_WINDOW:
			return [
				...state,
				{
					items: _.reject(this.state.items, {i: i})
				}
			]
	}

}

export default eMathApp = combineReducers({
	windows
})