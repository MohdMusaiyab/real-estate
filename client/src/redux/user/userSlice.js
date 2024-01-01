import { createSlice } from "@reduxjs/toolkit";
// For the user slice, we will have three actions:
const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    signInComplete: (state) => {
        state.loading = false;
      },
    // userLogout: (state) => {
    //     state.currentUser = null;
    //     state.error = null;
    //     state.loading = false;
    // },
  },
});
export const {signInStart, signInSuccess, signInFailure,signInComplete} = userSlice.actions;
export default userSlice.reducer;