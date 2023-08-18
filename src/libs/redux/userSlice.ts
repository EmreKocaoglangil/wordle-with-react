import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

// Define a type for the slice state
interface UserState {
  isAuth: boolean;
  username?: string;
  avatar?: string;
}

// Define the initial state using that type
const initialState: UserState = {
  isAuth: false,
};

export const userSlice = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserState>) => ({
      ...action.payload,
      isAuth: true,
    }),
    logout: () => ({
      isAuth: false,
    }),
  },
});

export const { login, logout } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.user;

export const userReducer = userSlice.reducer;
