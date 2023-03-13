import {createSlice} from "@reduxjs/toolkit";
import {
  getTopRatedProducts,
  getTopSalesProducts,
  getTopSoldProducts,
  getNewArrivalsProducts,
  getProductDetails,
  getCategoryProducts,
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "./productsServices";

const initialState = {
  isMutation: {success: false},
  homeProducts: [
    {secHead: "Top Rated", products: []},
    {secHead: "Top Sales", products: []},
    {secHead: "Top Sold", products: []},
    {secHead: "New Arrivals", products: []},
  ],
  productDetails: {},
  allProducts: {products: []},
  categoryProducts: {products: []},
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    resetMutationResult: (state) => {
      state.isMutation.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      //_____________________GET_TOP_RATED_PRODUCTS____________________//
      .addCase(getTopRatedProducts.pending, (state) => {
        state.homeProducts[0].loading = true;
      })
      .addCase(getTopRatedProducts.fulfilled, (state, action) => {
        state.homeProducts[0].loading = false;
        state.homeProducts[0].error = false;
        state.homeProducts[0].products = action.payload.data.docs;
      })
      .addCase(getTopRatedProducts.rejected, (state, action) => {
        state.homeProducts[0].loading = false;
        state.homeProducts[0].error = action.payload;
      })
      //_____________________GET_TOP_SALES_PRODUCTS____________________//
      .addCase(getTopSalesProducts.pending, (state) => {
        state.homeProducts[1].loading = true;
      })
      .addCase(getTopSalesProducts.fulfilled, (state, action) => {
        state.homeProducts[1].loading = false;
        state.homeProducts[1].error = false;
        state.homeProducts[1].products = action.payload.data.docs;
      })
      .addCase(getTopSalesProducts.rejected, (state, action) => {
        state.homeProducts[1].loading = false;
        state.homeProducts[1].error = action.payload;
      })
      //_____________________GET_TOP_SOLD_PRODUCTS____________________//
      .addCase(getTopSoldProducts.pending, (state) => {
        state.homeProducts[2].loading = true;
      })
      .addCase(getTopSoldProducts.fulfilled, (state, action) => {
        state.homeProducts[2].loading = false;
        state.homeProducts[2].error = false;
        state.homeProducts[2].products = action.payload.data.docs;
      })
      .addCase(getTopSoldProducts.rejected, (state, action) => {
        state.homeProducts[2].loading = false;
        state.homeProducts[2].error = action.payload;
      })
      //_____________________GET_NEW_ARRIVALS_PRODUCTS____________________//
      .addCase(getNewArrivalsProducts.pending, (state) => {
        state.homeProducts[3].loading = true;
      })
      .addCase(getNewArrivalsProducts.fulfilled, (state, action) => {
        state.homeProducts[3].loading = false;
        state.homeProducts[3].error = false;
        state.homeProducts[3].products = action.payload.data.docs;
      })
      .addCase(getNewArrivalsProducts.rejected, (state, action) => {
        state.homeProducts[3].loading = false;
        state.homeProducts[3].error = action.payload;
      })
      //_____________________GET_PRODUCT_DETAILS_____________________//
      .addCase(getProductDetails.pending, (state) => {
        state.productDetails.loading = true;
      })
      .addCase(getProductDetails.fulfilled, (state, action) => {
        state.productDetails.loading = false;
        state.productDetails.error = false;
        state.productDetails.product = action.payload.data.doc;
      })
      .addCase(getProductDetails.rejected, (state, action) => {
        state.productDetails.loading = false;
        state.productDetails.error = action.payload;
      })
      //_____________________GET_ALL_PRODUCTS_____________________//
      .addCase(getAllProducts.pending, (state) => {
        state.allProducts.loading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.allProducts.loading = false;
        state.allProducts.error = false;
        state.allProducts.products = action.payload.data.docs;
        state.allProducts.results = action.payload.results;
        state.allProducts.totalNumOfDocs = action.payload.totalNumOfDocs;
        state.allProducts.paginationStatus = action.payload.paginationStatus;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.allProducts.loading = false;
        state.allProducts.error = action.payload;
      })
      //_____________________GET_CATEGORY_PRODUCTS______________________//
      .addCase(getCategoryProducts.pending, (state) => {
        state.categoryProducts.loading = true;
      })
      .addCase(getCategoryProducts.fulfilled, (state, action) => {
        state.categoryProducts.loading = false;
        state.categoryProducts.error = false;
        state.categoryProducts.products = action.payload.data.docs;
      })
      .addCase(getCategoryProducts.rejected, (state, action) => {
        state.categoryProducts.loading = false;
        state.categoryProducts.error = action.payload;
      })
      //_____________________CREATE_PRODUCT______________________//
      .addCase(createProduct.pending, (state) => {
        state.isMutation.loading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isMutation.loading = false;
        state.isMutation.success = action.payload.status === 201 && true;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isMutation.loading = false;
      })
      //_____________________UPDATE_PRODUCT______________________//
      .addCase(updateProduct.pending, (state) => {
        state.isMutation.loading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isMutation.loading = false;
        state.isMutation.success = action.payload.status === 200 && true;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isMutation.loading = false;
      })
      //_____________________DELETE_PRODUCT______________________//
      .addCase(deleteProduct.pending, (state) => {
        state.isMutation.loading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isMutation.loading = false;
        state.isMutation.success = action.payload.status === 204 && true;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isMutation.loading = false;
      });
  },
});
export const {resetMutationResult} = productsSlice.actions;
export default productsSlice.reducer;
