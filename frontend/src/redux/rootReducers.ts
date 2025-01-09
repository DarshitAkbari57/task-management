import { combineReducers } from "redux";
import UserReducer from "./user/reducers";
import taskReducer from "./task/reducers";

const rootReducer = combineReducers({
  User: UserReducer,
  Task: taskReducer,
});

export type RootState = ReturnType<typeof rootReducer>; // Infer RootState from the reducer
export default rootReducer;
