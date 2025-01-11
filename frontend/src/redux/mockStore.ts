// src/components/__tests__/mockStore.ts
export const mockReducer = (state = { user: null }, action: any) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "REGISTER":
      return { ...state, user: action.payload };
    default:
      return state;
  }
};
