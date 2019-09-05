
import * as types from '../constants/ActionTypes'



export const openNewWindow = (pageId) => ({
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



export function minimizeWindow(id,title) {
		console.log(title);
		return function (dispatch) {
			dispatch(closeWindow(id));
			dispatch(addSubs(id,title));
		}
}

export function openSubWindow(id) {
		return function (dispatch) {
			dispatch(openNewWindow(id));
			dispatch(closeSubs(id))
		}
}

export const addSubs = (id,title)=> ({
	type: types.ADD_SUBS,
	title,
	id
});

export const closeSubs = id => ({
	type: types.CLOSE_SUBS,
	id
});