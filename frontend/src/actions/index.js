let windowId = 0;


export const OPEN_NEW_WINDOW = 'OPEN_NEW_WINDOW';
export const MINIMIZE_WINDOW = 'MINIMIZE_WINDOW';
export const ADD_TO_SUBORDINATE = 'ADD_TO_SUBORDINATE';



export function minimizeWindow() {
	return{type: MINIMIZE_WINDOW}
}

