import {createAsyncThunk} from "@reduxjs/toolkit";
import pushNotification from "../../common/components/Shared/Notification";
import {useGetDataProtected} from "../../common/hooks/api/useGetData";
import {usePostData} from "../../common/hooks/api/usePostData";
import {useUpdateData} from "../../common/hooks/api/useUpdateData";
import {useDeleteData} from "../../common/hooks/api/useDeleteData";

//____________________CREATE_CASH_ORDER____________________//
export const createCashOrder = createAsyncThunk(
  "orders/createCashOrder",
  async ({cartId, body}, {rejectWithValue}) => {
    try {
      const res = await usePostData(`/orders/${cartId}`, body);
      pushNotification("Order Created Successfully", "success");
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
//____________________CREATE_CARD_ORDER____________________//
export const createCardOrder = createAsyncThunk(
  "orders/createCardOrder",
  async (body, {rejectWithValue}) => {
    try {
      const res = await usePostData(`/orders/checkout-session`, body);
      console.log(res);
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
//____________________GET_ALL_ORDERS____________________//
export const getAllOrders = createAsyncThunk(
  "orders/getAllOrders",
  async (_, {rejectWithValue}) => {
    try {
      const res = await useGetDataProtected("/orders");
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
//____________________GET_ORDER_DETAILS____________________//
export const getOrderDetails = createAsyncThunk(
  "orders/getOrderDetails",
  async (orderId, {rejectWithValue}) => {
    try {
      const res = await useGetDataProtected(`/orders/${orderId}`);
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
