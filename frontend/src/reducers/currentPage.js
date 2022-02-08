import _ from "lodash";

const initState_page = {
  title: "Loading page ...",
  page: [],
  pageNum: 1,
  pageId: null,
};

const currentpage = (state = initState_page, action) => {
  switch (action.type) {
    case "CHANGE_PAGE":
      const flatConntent = _.filter(action.content, function (o) {
        return !Array.isArray(o);
      });
      const parent = flatConntent[0].para_parent;
      return Object.assign({}, state, {
        title: parent.title,
        page: action.content,
        pageNum: parent.pageNum,
        pageId: parent.id,
      });

    case "SET_PAGE":
      return Object.assign({}, state, {
        title: action.title,
        page: action.content,
        pageNum: action.pageNum,
        pageId: action.id,
      });

    default:
      return state;
  }
};

export default currentpage;
