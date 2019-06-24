let windowId = 0;


export const OPEN_NEW_WINDOW = 'OPEN_NEW_WINDOW';
export const MINIMIZE_WINDOW = 'MINIMIZE_WINDOW';
export const CLOSE_WINDOW = 'CLOSE_WINDOW';



export function openNewWindow() {
	return{type: OPEN_NEW_WINDOW}
}

export function minimizeWindow(id) {
	return{type: MINIMIZE_WINDOW, id}
}
export function closeWindow(id) {
	return{type: CLOSE_WINDOW, id}
}
