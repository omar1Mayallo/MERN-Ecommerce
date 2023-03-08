import {createAsyncThunk} from "@reduxjs/toolkit";
import {useGetData} from "../../common/hooks/api/useGetData";

//_____________________GET_TOP_RATED_PRODUCTS____________________//
export const getTopRatedProducts = createAsyncThunk(
  "products/getTopRatedProducts",
  async (_, {rejectWithValue}) => {
    try {
      const res = await useGetData("/products/top-rated");
      return res;
    } catch (error) {
      // console.log(error);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message;
      // console.log(message);
      return rejectWithValue(message);
    }
  }
);
//_____________________GET_TOP_SALES_PRODUCTS____________________//
export const getTopSalesProducts = createAsyncThunk(
  "products/getTopSalesProducts",
  async (_, {rejectWithValue}) => {
    try {
      const res = await useGetData("/products/top-sales");
      return res;
    } catch (error) {
      // console.log(error);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message;
      // console.log(message);
      return rejectWithValue(message);
    }
  }
);
//_____________________GET_TOP_SOLD_PRODUCTS____________________//
export const getTopSoldProducts = createAsyncThunk(
  "products/getTopSoldProducts",
  async (_, {rejectWithValue}) => {
    try {
      const res = await useGetData("/products/top-sold");
      return res;
    } catch (error) {
      // console.log(error);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message;
      // console.log(message);
      return rejectWithValue(message);
    }
  }
);
//_____________________GET_NEW_ARRIVALS_PRODUCTS____________________//
export const getNewArrivalsProducts = createAsyncThunk(
  "products/getNewArrivalsProducts",
  async (_, {rejectWithValue}) => {
    try {
      const res = await useGetData("/products/new-arrivals");
      return res;
    } catch (error) {
      // console.log(error);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message;
      // console.log(message);
      return rejectWithValue(message);
    }
  }
);
//_____________________GET_PRODUCT_DETAILS_____________________//
export const getProductDetails = createAsyncThunk(
  "products/getProductDetails",
  async (productId, {rejectWithValue}) => {
    try {
      const res = await useGetData(`/products/${productId}`);
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
//_____________________GET_ALL_PRODUCTS_____________________//
export const getAllProducts = createAsyncThunk(
  "products/getAllProducts",
  async (queryParams = "", {rejectWithValue}) => {
    try {
      const res = await useGetData(`/products?${queryParams}`);
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
//_____________________GET_CATEGORY_PRODUCTS______________________//
export const getCategoryProducts = createAsyncThunk(
  "products/getCategoryProducts",
  async ({categoryId, limit}, {rejectWithValue}) => {
    try {
      const res = await useGetData(
        `/products/?category=${categoryId}${limit ? `&limit=${limit}` : ""}`
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
