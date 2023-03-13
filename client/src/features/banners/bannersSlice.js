import {createSlice} from "@reduxjs/toolkit";
import {getAllBanners, createBanner, deleteBanner} from "./bannersServices";

const initialState = {allBanners: {banners: []}, isMutation: {success: false}};

export const bannersSlice = createSlice({
  name: "banners",
  initialState,
  reducers: {
    resetMutationResult: (state) => {
      state.isMutation.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      //_____________________GET_ALL_BANNERS____________________//
      .addCase(getAllBanners.pending, (state) => {
        state.allBanners.loading = true;
      })
      .addCase(getAllBanners.fulfilled, (state, action) => {
        state.allBanners.loading = false;
        state.allBanners.error = false;
        state.allBanners.banners = action.payload.data.docs;
        state.allBanners.results = action.payload.results;
        state.allBanners.totalNumOfDocs = action.payload.totalNumOfDocs;
        state.allBanners.paginationStatus = action.payload.paginationStatus;
      })
      .addCase(getAllBanners.rejected, (state, action) => {
        state.allBanners.loading = false;
        state.allBanners.error = action.payload;
      })
      //_____________________CREATE_BANNER____________________//
      .addCase(createBanner.pending, (state) => {
        state.isMutation.loading = true;
      })
      .addCase(createBanner.fulfilled, (state, action) => {
        state.isMutation.loading = false;
        state.isMutation.success = action.payload.status === 201 && true;
      })
      .addCase(createBanner.rejected, (state, action) => {
        state.isMutation.loading = false;
      })
      //_____________________DELETE_BANNER____________________//
      .addCase(deleteBanner.pending, (state) => {
        state.isMutation.loading = true;
      })
      .addCase(deleteBanner.fulfilled, (state, action) => {
        state.isMutation.loading = false;
        state.isMutation.success = action.payload.status === 204 && true;
      })
      .addCase(deleteBanner.rejected, (state, action) => {
        state.isMutation.loading = false;
      });
  },
});
export const {resetMutationResult} = bannersSlice.actions;
export default bannersSlice.reducer;
