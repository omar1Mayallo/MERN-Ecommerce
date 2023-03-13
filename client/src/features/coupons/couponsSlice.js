import {createSlice} from "@reduxjs/toolkit";
import {
  createCoupon,
  updateCoupon,
  deleteCoupon,
  getAllCoupons,
} from "./couponsServices";

const initialState = {allCoupons: {coupons: []}, isMutation: {success: false}};

export const couponsSlice = createSlice({
  name: "coupons",
  initialState,
  reducers: {
    resetMutationResult: (state) => {
      state.isMutation.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      //_____________________GET_ALL_COUPONS____________________//
      .addCase(getAllCoupons.pending, (state) => {
        state.allCoupons.loading = true;
      })
      .addCase(getAllCoupons.fulfilled, (state, action) => {
        state.allCoupons.loading = false;
        state.allCoupons.error = false;
        state.allCoupons.coupons = action.payload.data.docs;
        state.allCoupons.results = action.payload.results;
        state.allCoupons.totalNumOfDocs = action.payload.totalNumOfDocs;
        state.allCoupons.paginationStatus = action.payload.paginationStatus;
      })
      .addCase(getAllCoupons.rejected, (state, action) => {
        state.allCoupons.loading = false;
        state.allCoupons.error = action.payload;
      })
      //_____________________CREATE_COUPON____________________//
      .addCase(createCoupon.pending, (state) => {
        state.isMutation.loading = true;
      })
      .addCase(createCoupon.fulfilled, (state, action) => {
        state.isMutation.loading = false;
        state.isMutation.success = action.payload.status === 201 && true;
      })
      .addCase(createCoupon.rejected, (state, action) => {
        state.isMutation.loading = false;
      })
      //_____________________UPDATE_COUPON____________________//
      .addCase(updateCoupon.pending, (state) => {
        state.isMutation.loading = true;
      })
      .addCase(updateCoupon.fulfilled, (state, action) => {
        state.isMutation.loading = false;
        state.isMutation.success = action.payload.status === 200 && true;
      })
      .addCase(updateCoupon.rejected, (state, action) => {
        state.isMutation.loading = false;
      })
      //_____________________DELETE_COUPON____________________//
      .addCase(deleteCoupon.pending, (state) => {
        state.isMutation.loading = true;
      })
      .addCase(deleteCoupon.fulfilled, (state, action) => {
        state.isMutation.loading = false;
        state.isMutation.success = action.payload.status === 204 && true;
      })
      .addCase(deleteCoupon.rejected, (state, action) => {
        state.isMutation.loading = false;
      });
  },
});
export const {resetMutationResult} = couponsSlice.actions;
export default couponsSlice.reducer;
