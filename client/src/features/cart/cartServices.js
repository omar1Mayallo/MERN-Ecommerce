import {createAsyncThunk} from "@reduxjs/toolkit";
import pushNotification from "../../common/components/Shared/Notification";
import {useDeleteData} from "../../common/hooks/api/useDeleteData";
import {useGetDataProtected} from "../../common/hooks/api/useGetData";
import {usePostData} from "../../common/hooks/api/usePostData";
import {useUpdateData} from "../../common/hooks/api/useUpdateData";

//_____________________GET_USER_CART____________________//
export const getUserCart = createAsyncThunk(
  "cart/getUserCart",
  async (_, {rejectWithValue}) => {
    try {
      const res = await useGetDataProtected("/cart");
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
//____________________ADD_TO_CART____________________//
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (body, {rejectWithValue}) => {
    try {
      const res = await usePostData("/cart", body);
      pushNotification("Product Added Successfully To Your Cart", "success");
      return res;
    } catch (error) {
      // console.log(error);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        (error.response && error.response.data && error.response.data.errors) ||
        error.message;
      if (typeof message === "string") {
        pushNotification(message, "error");
      } else {
        message.forEach((el) => {
          pushNotification(el.msg, "error");
        });
      }
      // console.log(message);
      return rejectWithValue(message);
    }
  }
);

//____________________REMOVE_FROM_CART____________________//
export const removeFromCart = createAsyncThunk(
  "reviews/deleteReview",
  async (cartItemId, {rejectWithValue}) => {
    try {
      const res = await useDeleteData(`/cart/${cartItemId}`);
      pushNotification("Cart Item Deleted Successfully", "success");
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
//____________________UPDATE_CART_ITEM_QTY____________________//
export const updateCartItemQty = createAsyncThunk(
  "cart/updateCartItemQty",
  async ({cartItemId, quantity}, {rejectWithValue}) => {
    try {
      const res = await useUpdateData(`/cart/${cartItemId}`, {quantity});
      pushNotification("Cart Item Updated Successfully", "success");
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
//____________________CLEAR_CART____________________//
export const clearCart = createAsyncThunk(
  "cart/clearCart",
  async (_, {rejectWithValue}) => {
    try {
      const res = await useDeleteData(`/cart`);
      pushNotification("Cart Cleared Successfully", "success");
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
//____________________APPLY_COUPON____________________//
export const applyCoupon = createAsyncThunk(
  "cart/applyCoupon",
  async ({productId, couponCode}, {rejectWithValue}) => {
    try {
      const res = await useUpdateData(`/cart/apply-coupon`, {
        productId,
        couponCode,
      });
      pushNotification("Coupon Applied Successfully", "success");
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
