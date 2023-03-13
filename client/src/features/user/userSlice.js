import {createSlice} from "@reduxjs/toolkit";
import pushNotification from "../../common/components/Shared/Notification";
import {
  register,
  login,
  getUserProfile,
  updateUserProfile,
  updateUserPassword,
  deleteUser,
  updateUserRole,
  getAllUsers,
} from "./userServices";

const initialState = {
  isMutation: {success: false},
  isMutationAdmin: {success: false},
  loggedStatus: {},
  isLoggedIn: localStorage.getItem("isLoggedIn")
    ? JSON.parse(localStorage.getItem("isLoggedIn"))
    : null,
  userProfile: {user: null},
  allUsers: {users: []},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetMutationResult: (state) => {
      state.isMutation.success = false;
    },
    resetMutationAdminResult: (state) => {
      state.isMutationAdmin.success = false;
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
      })
      //_____________________UPDATE_USER_PROFILE____________________//
      .addCase(updateUserProfile.pending, (state) => {
        state.isMutation.loading = true;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.isMutation.loading = false;
        state.isMutation.success = action.payload.status === 200 && true;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.isMutation.loading = false;
      })
      //_____________________UPDATE_USER_PASSWORD____________________//
      .addCase(updateUserPassword.pending, (state) => {
        state.isMutation.loading = true;
      })
      .addCase(updateUserPassword.fulfilled, (state, action) => {
        state.isMutation.loading = false;
        state.isMutation.success = action.payload.status === 200 && true;
      })
      .addCase(updateUserPassword.rejected, (state, action) => {
        state.isMutation.loading = false;
      })
      //_____________________GET_ALL_USERS____________________//
      .addCase(getAllUsers.pending, (state) => {
        state.allUsers.loading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.allUsers.loading = false;
        state.allUsers.error = false;
        state.allUsers.users = action.payload.data.docs;
        state.allUsers.results = action.payload.results;
        state.allUsers.totalNumOfDocs = action.payload.totalNumOfDocs;
        state.allUsers.paginationStatus = action.payload.paginationStatus;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.allUsers.loading = false;
        state.allUsers.error = action.payload;
      })
      //_____________________UPDATE_USER_ROLE____________________//
      .addCase(updateUserRole.pending, (state) => {
        state.isMutationAdmin.loading = true;
      })
      .addCase(updateUserRole.fulfilled, (state, action) => {
        state.isMutationAdmin.loading = false;
        state.isMutationAdmin.success = action.payload.status === 200 && true;
      })
      .addCase(updateUserRole.rejected, (state, action) => {
        state.isMutationAdmin.loading = false;
      })
      //_____________________DELETE_USER____________________//
      .addCase(deleteUser.pending, (state) => {
        state.isMutationAdmin.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isMutationAdmin.loading = false;
        state.isMutationAdmin.success = action.payload.status === 204 && true;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isMutationAdmin.loading = false;
      });
  },
});
export const {resetMutationResult, resetMutationAdminResult, logout} =
  userSlice.actions;
export default userSlice.reducer;
