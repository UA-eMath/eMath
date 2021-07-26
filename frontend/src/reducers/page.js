const page = (state = { id: null, title: null, status: null }, action) => {
  switch (action.type) {
    case "LOAD_PARAS_SUCCESS":
      return {
        ...state,
        status: action.status,
        title: action.title,
        id: action.id,
      };

    case "LOAD_PARAS_ERROR":
      return {
        ...state,
        state: action.status,
      };

    default:
      return state;
  }
};

export default page;
