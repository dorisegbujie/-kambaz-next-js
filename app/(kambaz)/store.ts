import { configureStore } from "@reduxjs/toolkit";

import coursesReducer from "./courses/reducer";
import accountReducer from "./account/reducer";
import assignmentsReducer from "./courses/assignments/reducer";
import enrollmentsReducer from "./enrollments/reducer";

const store = configureStore({
  reducer: {
    coursesReducer,
    accountReducer,
    assignmentsReducer,
    enrollmentsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;