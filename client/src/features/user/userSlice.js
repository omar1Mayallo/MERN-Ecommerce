import {createSlice} from "@reduxjs/toolkit";
import pushNotification from "../../common/components/Shared/Notification";
import {register, login, getUserProfile} from "./userServices";

const initialState = {
  isMutation: {success: false},
  loggedStatus: {},
  isLoggedIn: localStorage.getItem("isLoggedIn")
    ? JSON.parse(localStorage.getItem("isLoggedIn"))
    : null,
  userProfile: {user: null},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetMutationResult: (state) => {
      state.isMutation.success = false;
    },
    //_LOGOUT_//
    logout: (state) => {
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("token");
      state.isLoggedIn = null;
      state.userProfile = {user: null};
      pushNotification("Logout Successfully", "success");
      setTimeout(() => {
        window.location.href = "/";
      }, 500);
    },
  },
  extraReducers: (builder) => {
    builder
      //_____________________REGISTER____________________//
      .addCase(register.pending, (state) => {
        state.isMutation.loading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isMutation.loading = false;
        state.isMutation.success = action.payload.status === 201 && true;
      })
      .addCase(register.rejected, (state, action) => {
        state.isMutation.loading = false;
      })
      //_____________________LOGIN____________________//
      .addCase(login.pending, (state) => {
        state.loggedStatus.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loggedStatus.loading = false;
        state.loggedStatus.error = false;
        state.loggedStatus.token = action.payload.token;
        state.userProfile.user = action.payload.data.user;
      })
      .addCase(login.rejected, (state, action) => {
        state.loggedStatus.loading = false;
        state.loggedStatus.error = action.payload;
      })
      //_____________________GET_USER_PROFILE____________________//
      .addCase(getUserProfile.pending, (state) => {
        state.userProfile.loading = true;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.userProfile.loading = false;
        state.userProfile.error = false;
        state.userProfile.user = action.payload.data.doc;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.userProfile.loading = false;
        state.userProfile.error = action.payload;
      });
  },
});
export const {resetMutationResult, logout} = userSlice.actions;
export default userSlice.reducer;
