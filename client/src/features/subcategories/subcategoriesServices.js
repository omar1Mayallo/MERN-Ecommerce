import {createAsyncThunk} from "@reduxjs/toolkit";
import pushNotification from "../../common/components/Shared/Notification";
import {useDeleteData} from "../../common/hooks/api/useDeleteData";
import {useGetDataProtected} from "../../common/hooks/api/useGetData";
import {usePostData} from "../../common/hooks/api/usePostData";
import {useUpdateData} from "../../common/hooks/api/useUpdateData";

//_____________________CREATE_SUBCATEGORY____________________//
export const createSubcategory = createAsyncThunk(
  "subcategories/createSubcategory",
  async (body, {rejectWithValue}) => {
    try {
      const res = await usePostData("/subcategories", body);
      pushNotification("Subcategory Created Successfully", "success");
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
//_____________________UPDATE_SUBCATEGORY____________________//
export const updateSubcategory = createAsyncThunk(
  "subcategories/updateSubcategory",
  async ({subcategoryId, body}, {rejectWithValue}) => {
    try {
      const res = await useUpdateData(`/subcategories/${subcategoryId}`, body);
      pushNotification("Subcategory Updated Successfully", "success");
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
//_____________________DELETE_SUBCATEGORY____________________//
export const deleteSubcategory = createAsyncThunk(
  "subcategories/deleteSubcategory",
  async (subcategoryId, {rejectWithValue}) => {
    try {
      const res = await useDeleteData(`/subcategories/${subcategoryId}`);
      pushNotification("Subcategory Deleted Successfully", "success");
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
//_____________________GET_ALL_SUBCATEGORIES____________________//
export const getAllSubcategories = createAsyncThunk(
  "subcategories/getAllSubcategories",
  async ({limit, page}, {rejectWithValue}) => {
    try {
      const res = await useGetDataProtected(
        `/subcategories${limit ? `?limit=${limit}` : ""}${
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
//_____GET_ALL_SUBCATEGORIES_WHICH_BELONG_TO_CERTAIN_CATEGORY_____//
export const getAllSubcategoriesBelongToCertainCategory = createAsyncThunk(
  "subcategories/getAllSubcategoriesBelongToCertainCategory",
  async (categoryId, {rejectWithValue}) => {
    try {
      const res = await useGetDataProtected(
        `/categories/${categoryId}/subcategories`
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
