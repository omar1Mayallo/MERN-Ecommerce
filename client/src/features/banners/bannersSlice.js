import {createSlice} from "@reduxjs/toolkit";
import {getAllBanners} from "./bannersServices";

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
      });
  },
});
export const {resetMutationResult} = bannersSlice.actions;
export default bannersSlice.reducer;
