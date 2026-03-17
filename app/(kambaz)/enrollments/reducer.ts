import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as db from "../database";

export type Enrollment = {
  _id: string;
  user: string;
  course: string;
};

type EnrollmentsState = {
  enrollments: Enrollment[];
};

const initialState: EnrollmentsState = {
  enrollments: (db.enrollments as Enrollment[]) || [],
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    enroll: (state, action: PayloadAction<{ user: string; course: string }>) => {
      const already = state.enrollments.some(
        (e) => e.user === action.payload.user && e.course === action.payload.course
      );
      if (already) return;

      state.enrollments.push({
        _id: Date.now().toString(),
        user: action.payload.user,
        course: action.payload.course,
      });
    },

    unenroll: (
      state,
      action: PayloadAction<{ user: string; course: string }>
    ) => {
      state.enrollments = state.enrollments.filter(
        (e) => !(e.user === action.payload.user && e.course === action.payload.course)
      );
    },
  },
});

export const { enroll, unenroll } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;