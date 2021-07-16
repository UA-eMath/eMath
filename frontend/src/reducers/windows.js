import _ from "lodash";

const initState_windows = {
  items: [0].map(function (i, key, list) {
    return {
      i: "0",
      x: 0,
      y: 0,
      w: 6,
      h: 1,
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
        const repeatWindows = _.filter(state.items, function (e) {
          return e.content.id === action.content.id;
        });

        if (repeatWindows.length === 0) {
          const newWindow = {
            i: "n" + state.newCounter,
            x: 6,
            y: 0,
            w: 6,
            h: 1,
            static: false,
            title: action.content.title,
            content: action.content,
            isPage: action.isPage,
          };
          const initWindow = state.items.splice(0, 1);
          return Object.assign({}, state, {
            items: initWindow.concat(newWindow),
            newCounter: state.newCounter + 1,
          });
        }
      }
      return state;

    case "CLOSE_WINDOW":
      if (action.id) {
        return {
          ...state,
          items: _.reject(state.items, { i: action.id }),
        };
      } else {
        return { ...state, items: state.items.splice(0, 1) };
      }

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
