import {createAsyncThunk} from "@reduxjs/toolkit";
import pushNotification from "../../common/components/Shared/Notification";
import {useDeleteData} from "../../common/hooks/api/useDeleteData";
import {useGetData} from "../../common/hooks/api/useGetData";
import {usePostDataWithImg} from "../../common/hooks/api/usePostData";
import {useUpdateDataWithImg} from "../../common/hooks/api/useUpdateData";

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
//_____________________CREATE_PRODUCT______________________//
export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (body, {rejectWithValue}) => {
    try {
      const res = await usePostDataWithImg(`/products`, body);
      pushNotification("Product Created Successfully", "success");
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
//_____________________UPDATE_PRODUCT______________________//
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({productId, body}, {rejectWithValue}) => {
    try {
      const res = await useUpdateDataWithImg(`/products/${productId}`, body);
      pushNotification("Product Updated Successfully", "success");
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
//_____________________DELETE_PRODUCT______________________//
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (productId, {rejectWithValue}) => {
    try {
      const res = await useDeleteData(`/products/${productId}`);
      pushNotification("Product Deleted Successfully", "success");
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
