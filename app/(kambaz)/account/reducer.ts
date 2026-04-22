import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type User = {
  _id: string;
  username: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  dob?: string;
  role: "USER" | "STUDENT" | "TA" | "FACULTY" | "ADMIN";
};

type AccountState = {
  currentUser: User | null;
  sessionLoading: boolean;
};

const initialState: AccountState = {
  currentUser: null,
  sessionLoading: true,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<User | null>) => {
      state.currentUser = action.payload;
    },
    setSessionLoaded: (state) => {
      state.sessionLoading = false;
    },
    signOut: (state) => {
      state.currentUser = null;
    },
  },
});

export const { setCurrentUser, setSessionLoaded, signOut } = accountSlice.actions;
export default accountSlice.reducer;
