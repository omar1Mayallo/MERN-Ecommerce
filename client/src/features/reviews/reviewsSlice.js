import {createSlice} from "@reduxjs/toolkit";
import {
  getProductReviews,
  addNewReview,
  deleteReview,
  updateReview,
} from "./reviewsServices";

const initialState = {
  isMutation: {success: false},
  productReviews: {reviews: []},
};

export const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    resetMutationResult: (state) => {
      state.isMutation.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      //_____________________GET_PRODUCT_REVIEWS____________________//
      .addCase(getProductReviews.pending, (state) => {
        state.productReviews.loading = true;
      })
      .addCase(getProductReviews.fulfilled, (state, action) => {
        state.productReviews.loading = false;
        state.productReviews.error = false;
        state.productReviews.reviews = action.payload.data.docs;
      })
      .addCase(getProductReviews.rejected, (state, action) => {
        state.productReviews.loading = false;
        state.productReviews.error = action.payload;
      })
      //_____________________ADD_NEW_REVIEW____________________//
      .addCase(addNewReview.pending, (state) => {
        state.isMutation.loading = true;
      })
      .addCase(addNewReview.fulfilled, (state, action) => {
        state.isMutation.loading = false;
        state.isMutation.success = action.payload.status === 201 && true;
      })
      .addCase(addNewReview.rejected, (state, action) => {
        state.isMutation.loading = false;
      })
      //_____________________DELETE_REVIEW____________________//
      .addCase(deleteReview.pending, (state) => {
        state.isMutation.loading = true;
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.isMutation.loading = false;
        state.isMutation.success = action.payload.status === 204 && true;
      })
      .addCase(deleteReview.rejected, (state, action) => {
        state.isMutation.loading = false;
      })
      //_____________________UPDATE_REVIEW____________________//
      .addCase(updateReview.pending, (state) => {
        state.isMutation.loading = true;
      })
      .addCase(updateReview.fulfilled, (state, action) => {
        state.isMutation.loading = false;
        state.isMutation.success = action.payload.status === 200 && true;
      })
      .addCase(updateReview.rejected, (state, action) => {
        state.isMutation.loading = false;
      });
  },
});
export const {resetMutationResult} = reviewsSlice.actions;
export default reviewsSlice.reducer;
