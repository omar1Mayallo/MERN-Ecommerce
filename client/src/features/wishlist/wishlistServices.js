import {createAsyncThunk} from "@reduxjs/toolkit";
import {useGetDataProtected} from "../../common/hooks/api/useGetData";
import {usePostData} from "../../common/hooks/api/usePostData";
import {useDeleteData} from "../../common/hooks/api/useDeleteData";
import pushNotification from "../../common/components/Shared/Notification";

//_____________________GET_USER_WISHLIST_____________________//
export const getUserWishlist = createAsyncThunk(
  "wishlist/getUserWishlist",
  async (_, {rejectWithValue}) => {
    try {
      const res = await useGetDataProtected("/wishlist");
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

//_____________________ADD_TO_WISHLIST_____________________//
export const addToWishlist = createAsyncThunk(
  "wishlist/addToWishlist",
  async (productId, {rejectWithValue}) => {
    try {
      const res = await usePostData("/wishlist", {productId});
      pushNotification(
        "Product Added Successfully To Your Wishlist",
        "success"
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
//_____________________REMOVE_FROM_WISHLIST_____________________//
export const removeFromWishlist = createAsyncThunk(
  "wishlist/removeFromWishlist",
  async (productId, {rejectWithValue}) => {
    try {
      const res = await useDeleteData(`/wishlist/${productId}`);
      pushNotification(
        "Product Removed Successfully From Your Wishlist",
        "success"
      );
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
