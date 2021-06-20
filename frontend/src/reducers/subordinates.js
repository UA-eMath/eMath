import _ from "lodash";

const initState_subs = {
  subs: [],
};

const subordinates = (state = initState_subs, action) => {
  switch (action.type) {
    case "ADD_SUBS":
      if (typeof action.content !== "undefined" && action.content !== null) {
        const removeExisted = _.reject(state.subs, function (e) {
          return e.content.id === action.content.id;
        });
        return Object.assign({}, state, {
          subs: removeExisted.concat({
            i: action.id,
            title: action.title,
            content: action.content,
            isPage: action.isPage,
          }),
        });
      }
      return state;

    case "CLOSE_SUBS":
      return Object.assign({}, state, {
        ...state,
        subs: _.reject(state.subs, { i: action.id }),
      });

    default:
      return state;
  }
};

export default subordinates;
