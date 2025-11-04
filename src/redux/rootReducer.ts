// ** Packages **
import { combineReducers } from "@reduxjs/toolkit";

// ** Redux Slices **
import { reducer as authReducer } from "../modules/Auth/store/authSlice";

const combineReducer = combineReducers({
  auth: authReducer,
});

const rootReducer = (state: any, action: any) => {
  // Clear all data in redux store to initial.
  if (action.type === "LOGOUT") state = undefined;
  return combineReducer(state, action);
};

export default rootReducer;
