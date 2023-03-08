import {createAsyncThunk} from "@reduxjs/toolkit";
import pushNotification from "../../common/components/Shared/Notification";
import {usePostData} from "../../common/hooks/api/usePostData";
import {useGetDataProtected} from "../../common/hooks/api/useGetData";

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
