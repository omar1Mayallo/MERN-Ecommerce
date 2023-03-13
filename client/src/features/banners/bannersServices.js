import {createAsyncThunk} from "@reduxjs/toolkit";
import {useGetData} from "../../common/hooks/api/useGetData";
import {usePostDataWithImg} from "../../common/hooks/api/usePostData";
import {useDeleteData} from "../../common/hooks/api/useDeleteData";
import pushNotification from "../../common/components/Shared/Notification";

//_____________________GET_ALL_BANNERS____________________//
export const getAllBanners = createAsyncThunk(
  "banners/getAllBanners",
  async (_, {rejectWithValue}) => {
    try {
      const res = await useGetData("/banners");
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
//_____________________CREATE_BANNER____________________//
export const createBanner = createAsyncThunk(
  "banners/createBanner",
  async (body, {rejectWithValue}) => {
    try {
      const res = await usePostDataWithImg(`/banners`, body);
      pushNotification("Banner Created Successfully", "success");
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
//_____________________DELETE_BANNER____________________//
export const deleteBanner = createAsyncThunk(
  "banners/deleteBanner",
  async (bannerId, {rejectWithValue}) => {
    try {
      const res = await useDeleteData(`/banners/${bannerId}`);
      pushNotification("Banner Deleted Successfully", "success");
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
