
import * as types from '../constants/ActionTypes'



export const openNewWindow = pageId => ({
	type: types.OPEN_NEW_WINDOW,
	pageId
});


export const closeWindow = id => ({
	type: types.CLOSE_WINDOW,
	id
});

export const onLayoutChange =  ({
	type: types.ON_LAYOUT_CHANGE,
});



export function minimizeWindow(id) {
		return function (dispatch,getState) {
			const title = getState().windows.items.find(el=> el.i===id).title;

			dispatch(closeWindow(id));
			dispatch(addSubs(title,id));

		}
}

export function openSubWindow(id) {
		return function (dispatch) {
			dispatch(openNewWindow(id));
			dispatch(closeSubs(id))
		}
}

export const addSubs = (title,id)=> ({
	type: types.ADD_SUBS,
	title,
	id
});

export const closeSubs = id => ({
	type: types.CLOSE_SUBS,
	id
});