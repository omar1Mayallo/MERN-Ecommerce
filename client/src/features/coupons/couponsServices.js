import {createAsyncThunk} from "@reduxjs/toolkit";
import pushNotification from "../../common/components/Shared/Notification";
import {useDeleteData} from "../../common/hooks/api/useDeleteData";
import {useGetDataProtected} from "../../common/hooks/api/useGetData";
import {usePostData} from "../../common/hooks/api/usePostData";
import {useUpdateData} from "../../common/hooks/api/useUpdateData";

//_____________________CREATE_COUPON____________________//
export const createCoupon = createAsyncThunk(
  "coupons/createCoupon",
  async (body, {rejectWithValue}) => {
    try {
      const res = await usePostData("/coupons", body);
      pushNotification("Coupon Created Successfully", "success");
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
//_____________________UPDATE_COUPON____________________//
export const updateCoupon = createAsyncThunk(
  "coupons/updateCoupon",
  async ({couponId, body}, {rejectWithValue}) => {
    try {
      const res = await useUpdateData(`/coupons/${couponId}`, body);
      pushNotification("Coupon Updated Successfully", "success");
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
//_____________________DELETE_COUPON____________________//
export const deleteCoupon = createAsyncThunk(
  "coupons/deleteCoupon",
  async (couponId, {rejectWithValue}) => {
    try {
      const res = await useDeleteData(`/coupons/${couponId}`);
      pushNotification("Coupon Deleted Successfully", "success");
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
//_____________________GET_ALL_COUPONS____________________//
export const getAllCoupons = createAsyncThunk(
  "coupons/getAllCoupons",
  async ({limit, page}, {rejectWithValue}) => {
    try {
      const res = await useGetDataProtected(
        `/coupons${limit ? `?limit=${limit}` : ""}${
          page ? `&page=${page}` : ""
        }`
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
