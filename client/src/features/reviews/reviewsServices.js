import {createAsyncThunk} from "@reduxjs/toolkit";
import pushNotification from "../../common/components/Shared/Notification";
import {useDeleteData} from "../../common/hooks/api/useDeleteData";
import {useGetData} from "../../common/hooks/api/useGetData";
import {usePostData} from "../../common/hooks/api/usePostData";
import {useUpdateData} from "../../common/hooks/api/useUpdateData";

//_____________________GET_PRODUCT_REVIEWS____________________//
export const getProductReviews = createAsyncThunk(
  "reviews/getProductReviews",
  async (productId, {rejectWithValue}) => {
    try {
      const res = await useGetData(
        `/products/${productId}/reviews?sort=+createdAt`
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
//_____________________ADD_NEW_REVIEW____________________//
export const addNewReview = createAsyncThunk(
  "reviews/addNewReview",
  async ({productId, body}, {rejectWithValue}) => {
    try {
      const res = await usePostData(`/products/${productId}/reviews`, body);
      pushNotification("Review Added Successfully", "success");
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
//_____________________DELETE_REVIEW____________________//
export const deleteReview = createAsyncThunk(
  "reviews/deleteReview",
  async (reviewId, {rejectWithValue}) => {
    try {
      const res = await useDeleteData(`/reviews/${reviewId}`);
      pushNotification("Review Deleted Successfully", "success");
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
//_____________________UPDATE_REVIEW____________________//
export const updateReview = createAsyncThunk(
  "reviews/updateReview",
  async ({reviewId, body}, {rejectWithValue}) => {
    try {
      const res = await useUpdateData(`/reviews/${reviewId}`, body);
      pushNotification("Review Updated Successfully", "success");
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
