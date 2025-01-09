import * as actionTypes from "../ActionTypes";

const initialState = {
  exampleData: [],
  users: [],
  allUsers: [],
};

const UserReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case actionTypes.TEST_INIT:
      return {
        ...state,
      };
    case actionTypes.TEST_SUCCESS:
      return {
        ...state,
        exampleData: action.payload,
      };
    case actionTypes.TEST_FAIL:
      return {
        ...state,
        error: "",
      };
    case actionTypes.AUTH_INIT:
      return {
        ...state,
      };
    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        users: action.payload,
      };
    case actionTypes.AUTH_FAIL:
      return {
        ...state,
        error: "",
      };
    case actionTypes.GET_ALL_USER_INIT:
      return {
        ...state,
      };
    case actionTypes.GET_ALL_USER_SUCCESS:
      return {
        ...state,
        allUsers: action.payload,
      };
    case actionTypes.GET_ALL_USER_FAIL:
      return {
        ...state,
        error: "",
      };

    default:
      return state;
  }
};

export default UserReducer;
