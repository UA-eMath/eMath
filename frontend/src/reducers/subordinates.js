import _ from "lodash";

const initState_subs = {
  subs: [],
};

const subordinates = (state = initState_subs, action) => {
  switch (action.type) {
    case "ADD_SUBS":
      return Object.assign({}, state, {
        subs: state.subs.concat({
          i: action.id,
          title: action.title,
          content: action.content,
          isPage: action.isPage,
        }),
      });

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
