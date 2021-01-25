export const initialState = {
  userInfo: null,
};

export const actionTypes = {
  SET_USER: "SET_USER",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        userInfo: action.userInfo,
      };

    default:
      return state;
  }
};

export default reducer;
