import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as db from "../../database";

export type Assignment = {
  _id: string;
  title: string;
  course: string;
  available: string;
  due: string;
  points: number;
  description: string;
};

type AssignmentsState = {
  assignments: Assignment[];
};

const initialState: AssignmentsState = {
  assignments: (db.assignments as Assignment[]) || [],
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    addAssignment: (state, action: PayloadAction<Omit<Assignment, "_id">>) => {
      state.assignments.push({ _id: Date.now().toString(), ...action.payload });
    },

    deleteAssignment: (state, action: PayloadAction<string>) => {
      state.assignments = state.assignments.filter((a) => a._id !== action.payload);
    },

    updateAssignment: (state, action: PayloadAction<Assignment>) => {
      state.assignments = state.assignments.map((a) =>
        a._id === action.payload._id ? action.payload : a
      );
    },
  },
});

export const { addAssignment, deleteAssignment, updateAssignment } =
  assignmentsSlice.actions;

export default assignmentsSlice.reducer;