import * as types from "../constants/ActionTypes";
import getPage from "../requests/getPage";

export const openNewWindow = (pageId, isPage, usage) => ({
  type: types.OPEN_NEW_WINDOW,
  pageId,
  isPage,
  usage,
});

export const closeWindow = (id) => ({
  type: types.CLOSE_WINDOW,
  id,
});

export function onLayoutChange(layout) {
  return {
    type: types.ON_LAYOUT_CHANGE,
    layout: layout,
  };
}

export function minimizeWindow(id, title, pageId, isPage) {
  return function (dispatch) {
    dispatch(closeWindow(id));
    dispatch(addSubs(id, title, pageId, isPage));
  };
}

export function openSubWindow(id, pageId, isPage,usage) {
  return function (dispatch) {
    dispatch(openNewWindow(pageId, isPage,usage));
    dispatch(closeSubs(id));
  };
}

export const addSubs = (id, title, pageId, isPage) => ({
  type: types.ADD_SUBS,
  title,
  id,
  pageId,
  isPage,
});

export const closeSubs = (id) => ({
  type: types.CLOSE_SUBS,
  id,
});

// Para editor actions
export const clearQueue = () => ({
  type: types.CLEAR_QUEUE,
});

export const popQueue = (id) => ({
  type: types.POP_QUEUE,
  id: id,
});

export const paraOnChange = (para, id) => ({
  type: types.PARA_ONCHANGE,
  para: para,
  id: id,
});

export const loadPage = (data, status, title, id) => ({
  type: types.LOAD_PARAS,
  data: data,
  status: status,
  title: title,
  id: id,
});

export const loadPageError = (error) => ({
  type: types.LOAD_PARAS_ERROR,
  error: error,
});

export function fetchPage(id, title) {
  return function (dispatch) {
    return getPage({ id: id }).then(
      (data) => dispatch(loadPage(data.data, data.status, title, id)),
      (error) => dispatch(loadPageError(error))
    );
  };
}
