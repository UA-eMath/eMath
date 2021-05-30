import { message } from "antd";
import _ from "lodash";

const initState_windows = {
  items: [0].map(function (i, key, list) {
    return {
      i: "0",
      x: 0,
      y: 0,
      w: 6,
      h: 9,
      add: i === (list.length - 1).toString(),
      static: true,
      pageId: {},
    };
  }),
  newCounter: 0,
};

const windows = (state = initState_windows, action) => {
  switch (action.type) {
    case "OPEN_NEW_WINDOW":
      if (typeof action.pageId !== "undefined" && action.pageId !== null) {
        // Only add page if not opened before
        // TODO: handle init window
        const removeExisted = _.reject(state.items, function (e) {
          return e.pageId.id === action.pageId.id;
        });
        return Object.assign({}, state, {
          items: removeExisted.concat({
            i: "n" + state.newCounter,
            x: 6,
            y: 0, // puts it at the bottom
            w: 6,
            h: 4,
            static: false,
            pageId: action.pageId,
            isPage: action.isPage,
          }),
          newCounter: state.newCounter + 1,
        });
      }
      return state;

    case "CLOSE_WINDOW":
      return Object.assign({}, state, {
        ...state,
        items: _.reject(state.items, { i: action.id }),
      });

    case "ON_LAYOUT_CHANGE":
      return {
        ...state,
        items: action.layout,
      };

    default:
      return state;
  }
};

export default windows;
