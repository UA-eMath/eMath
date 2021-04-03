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
          pageId: action.pageId,
          isPage: action.isPage,
          usage: action.usage,
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
