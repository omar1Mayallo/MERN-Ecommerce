import {createAsyncThunk} from "@reduxjs/toolkit";
import pushNotification from "../../common/components/Shared/Notification";
import {usePostData} from "../../common/hooks/api/usePostData";
import {useGetDataProtected} from "../../common/hooks/api/useGetData";
import {
  useUpdateData,
  useUpdateDataWithImg,
} from "../../common/hooks/api/useUpdateData";
import {logout} from "./userSlice";
import {useDeleteData} from "../../common/hooks/api/useDeleteData";

//_____________________REGISTER____________________//
export const register = createAsyncThunk(
  "user/register",
  async (body, {rejectWithValue}) => {
    try {
      const res = await usePostData("/auth/register", body);
      pushNotification("Registered Successfully", "success");
      // console.log(res);
      return res;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        (error.response && error.response.data && error.response.data.errors) ||
        error.message;
      // console.log(typeof message);
      if (typeof message === "string") {
        pushNotification(message, "error");
      } else {
        message.forEach((el) => {
          pushNotification(el.msg, "error");
        });
      }
      return rejectWithValue(message);
    }
  }
);
//_____________________LOGIN____________________//
export const login = createAsyncThunk(
  "user/login",
  async (body, {rejectWithValue}) => {
    try {
      const {data} = await usePostData("/auth/login", body);
      pushNotification("Login Successfully", "success");
      return data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        (error.response && error.response.data && error.response.data.errors) ||
        error.message;
      // console.log(typeof message);
      if (typeof message === "string") {
        pushNotification(message, "error");
      } else {
        message.forEach((el) => {
          pushNotification(el.msg, "error");
        });
      }
      return rejectWithValue(message);
    }
  }
);
//_____________________GET_USER_PROFILE____________________//
export const getUserProfile = createAsyncThunk(
  "user/getUserProfile",
  async (_, {rejectWithValue}) => {
    try {
      const res = await useGetDataProtected("/users/my-profile");
      return res;
    } catch (error) {
      // console.log(error);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        (error.response && error.response.data && error.response.data.errors) ||
        error.message;
      // console.log(message);
      return rejectWithValue(message);
    }
  }
);
//_____________________UPDATE_USER_PROFILE____________________//
export const updateUserProfile = createAsyncThunk(
  "user/updateUserProfile",
  async (body, {rejectWithValue}) => {
    try {
      const res = await useUpdateDataWithImg(`/users/my-profile`, body);
      pushNotification("Profile Updated Successfully", "success");
      // console.log(res);
      return res;
    } catch (error) {
      // console.log("ERROR" + error);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        (error.response && error.response.data && error.response.data.errors) ||
        error.message;
      // console.log(message);
      if (typeof message === "string") {
        pushNotification(message, "error");
      } else {
        message.forEach((el) => {
          pushNotification(el.msg, "error");
        });
      }
      return rejectWithValue(message);
    }
  }
);
//_____________________UPDATE_USER_PASSWORD____________________//
export const updateUserPassword = createAsyncThunk(
  "user/updateUserPassword",
  async (body, {rejectWithValue, dispatch}) => {
    try {
      const res = await useUpdateData(`/users/my-password`, body);
      pushNotification(
        "Password Updated Successfully, Please login again",
        "success"
      );
      if (res.status === 200) {
        setTimeout(() => {
          dispatch(logout());
        }, 2000);
      }

      return res;
    } catch (error) {
      // console.log("ERROR" + error);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        (error.response && error.response.data && error.response.data.errors) ||
        error.message;
      // console.log(message);
      if (typeof message === "string") {
        pushNotification(message, "error");
      } else {
        message.forEach((el) => {
          pushNotification(el.msg, "error");
        });
      }
      return rejectWithValue(message);
    }
  }
);
//_____________________GET_ALL_USERS____________________//
export const getAllUsers = createAsyncThunk(
  "user/getAllUsers",
  async ({limit, page}, {rejectWithValue}) => {
    try {
      const res = await useGetDataProtected(
        `/users${limit ? `?limit=${limit}` : ""}${
          page ? `&page=${page}` : ""
        }&sort=role`
      );
      return res;
    } catch (error) {
      // console.log(error);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        (error.response && error.response.data && error.response.data.errors) ||
        error.message;
      // console.log(message);
      return rejectWithValue(message);
    }
  }
);
//_____________________UPDATE_USER_ROLE____________________//
export const updateUserRole = createAsyncThunk(
  "user/updateUserRole",
  async ({userId, role}, {rejectWithValue}) => {
    try {
      const res = await useUpdateData(`/users/${userId}`, {role});
      pushNotification("User Role Updated Successfully", "success");
      // console.log(res);
      return res;
    } catch (error) {
      // console.log("ERROR" + error);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        (error.response && error.response.data && error.response.data.errors) ||
        error.message;
      // console.log(message);
      if (typeof message === "string") {
        pushNotification(message, "error");
      } else {
        message.forEach((el) => {
          pushNotification(el.msg, "error");
        });
      }
      return rejectWithValue(message);
    }
  }
);
//_____________________DELETE_USER____________________//
export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (userId, {rejectWithValue}) => {
    try {
      const res = await useDeleteData(`/users/${userId}`);
      pushNotification("User Deleted Successfully", "success");
      // console.log(res);
      return res;
    } catch (error) {
      // console.log("ERROR" + error);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        (error.response && error.response.data && error.response.data.errors) ||
        error.message;
      // console.log(message);
      if (typeof message === "string") {
        pushNotification(message, "error");
      } else {
        message.forEach((el) => {
          pushNotification(el.msg, "error");
        });
      }
      return rejectWithValue(message);
    }
  }
);
