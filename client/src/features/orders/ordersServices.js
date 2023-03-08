import {createAsyncThunk} from "@reduxjs/toolkit";
import pushNotification from "../../common/components/Shared/Notification";
import {useDeleteData} from "../../common/hooks/api/useDeleteData";
import {useGetData} from "../../common/hooks/api/useGetData";
import {usePostData} from "../../common/hooks/api/usePostData";
import {useUpdateData} from "../../common/hooks/api/useUpdateData";

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
