const initState_authentication = {
  isAuthenticated: false,
  username: null,
  userType: null,
  access: null,
};

const authentication = (state = initState_authentication, action) => {
  switch (action.type) {
    case "LOGIN":
      return Object.assign({}, state, {
        isAuthenticated: true,
        username: action.username,
        userType: action.userType,
        access: action.access,
      });

    case "LOGOUT":
      return Object.assign({}, state, {
        isAuthenticated: false,
        username: null,
        userType: null,
        access: null,
      });

    default:
      return state;
  }
};

export default authentication;
