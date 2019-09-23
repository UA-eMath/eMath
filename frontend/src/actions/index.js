
import * as types from '../constants/ActionTypes'



export const openNewWindow = (pageId) => ({
	type: types.OPEN_NEW_WINDOW,
	pageId
});


export const closeWindow = id => ({
	type: types.CLOSE_WINDOW,
	id
});

export function onLayoutChange(layout) {
  return {
    type: types.ON_LAYOUT_CHANGE,
	layout: layout,
  };
}

export function minimizeWindow(id,title,pageId) {
		return function (dispatch) {
			dispatch(closeWindow(id));
			dispatch(addSubs(id,title,pageId));
		}
}

export function openSubWindow(id,pageId) {
		return function (dispatch) {
			dispatch(openNewWindow(pageId));
			dispatch(closeSubs(id))
		}
}

export const addSubs = (id,title,pageId)=> ({
	type: types.ADD_SUBS,
	title,
	id,
	pageId
});

export const closeSubs = id => ({
	type: types.CLOSE_SUBS,
	id
});