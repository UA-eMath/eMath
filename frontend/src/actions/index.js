
import * as types from '../constants/ActionTypes'



export const openNewWindow =  ({
	type: types.OPEN_NEW_WINDOW
});

export const minimizeWindow = id => ({
	type: types.MINIMIZE_WINDOW,
	id
});

export const closeWindow = id => ({
	type: types.CLOSE_WINDOW,
	id
});
