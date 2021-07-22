import * as types from "../constants/ActionTypes";
import getPage from "../requests/getPage";

export const openNewWindow = (content, isPage) => ({
  type: types.OPEN_NEW_WINDOW,
  content,
  isPage,
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

export function minimizeWindow(id, title, content, isPage) {
  return function (dispatch) {
    dispatch(closeWindow(id));
    dispatch(addSubs(id, title, content, isPage));
  };
}

export function openSubWindow(id, content, isPage) {
  return function (dispatch) {
    dispatch(openNewWindow(content, isPage));
    dispatch(closeSubs(id));
  };
}

export const addSubs = (id, title, content, isPage) => ({
  type: types.ADD_SUBS,
  title,
  id,
  content,
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
    return getPage({ id: id })
      .then((data) => {
        dispatch(loadPage(data.data, data.status, title, id));
      })
      .catch((error) => dispatch(loadPageError(error)));
  };
}

export const changePage = (content) => ({
  type: types.CHANGE_PAGE,
  content,
});

export const setPage = (id, title, content, pageNum) => ({
  type: types.SET_PAGE,
  id,
  title,
  content,
  pageNum,
});

export function getPageToChange(id) {
  return function (dispatch) {
    return getPage({ id: id })
      .then((data) => {
        dispatch(changePage(data.data));
      })
      .catch((error) => dispatch(loadPageError(error)));
  };
}

// Authentication
export const login = (username, userType, access) => ({
  type: types.LOGIN,
  username,
  userType,
  access,
});

export const logout = () => ({
  type: types.LOGOUT,
});
