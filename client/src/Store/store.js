import { configureStore } from "@reduxjs/toolkit";
import skillReducer from "../Features/SkillSlice";
import userReducer from "../Features/UserSlice";
import requestReducer from "../Features/RequestSlice";

export const store = configureStore({
  reducer: { skill: skillReducer, users: userReducer, request: requestReducer },
});
