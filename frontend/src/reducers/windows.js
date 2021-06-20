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
      content: {},
    };
  }),
  newCounter: 0,
};

const windows = (state = initState_windows, action) => {
  switch (action.type) {
    case "OPEN_NEW_WINDOW":
      if (typeof action.content !== "undefined" && action.content !== null) {
        // Only add page if not opened before
        // TODO: handle init window
        const removeExisted = _.reject(state.items, function (e) {
          return e.content.id === action.content.id;
        });

        const newWindow = {
          i: "n" + state.newCounter,
          x: 6,
          y: 0,
          w: 6,
          h: 9,
          static: false,
          title: action.content.title,
          content: action.content,
          isPage: action.isPage,
        };
        return Object.assign({}, state, {
          items: removeExisted.concat(newWindow),
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
