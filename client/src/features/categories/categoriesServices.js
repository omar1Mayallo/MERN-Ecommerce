import {createAsyncThunk} from "@reduxjs/toolkit";
import {useGetData} from "../../common/hooks/api/useGetData";
//_____________________GET_ALL_CATEGORIES____________________//
export const getAllCategories = createAsyncThunk(
  "categories/getAllCategories",
  async (_, {rejectWithValue}) => {
    try {
      const res = await useGetData("/categories");
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
//_____________________GET_CATEGORY_DETAILS____________________//
export const getCategoryDetails = createAsyncThunk(
  "categories/getCategoryDetails",
  async (categoryId, {rejectWithValue}) => {
    try {
      const res = await useGetData(`/categories/${categoryId}`);
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
