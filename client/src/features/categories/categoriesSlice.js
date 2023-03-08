import {createSlice} from "@reduxjs/toolkit";
import {getAllCategories, getCategoryDetails} from "./categoriesServices";
const initialState = {
  isMutation: {success: false},
  allCategories: {categories: []},
  categoryDetails: {},
};

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    resetMutationResult: (state) => {
      state.isMutation.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      //_____________________GET_ALL_CATEGORIES____________________//
      .addCase(getAllCategories.pending, (state) => {
        state.allCategories.loading = true;
      })
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.allCategories.loading = false;
        state.allCategories.error = false;
        state.allCategories.categories = action.payload.data.docs;
        state.allCategories.results = action.payload.results;
        state.allCategories.totalNumOfDocs = action.payload.totalNumOfDocs;
        state.allCategories.paginationStatus = action.payload.paginationStatus;
      })
      .addCase(getAllCategories.rejected, (state, action) => {
        state.allCategories.loading = false;
        state.allCategories.error = action.payload;
      })
      //_____________________GET_CATEGORY_DETAILS____________________//
      .addCase(getCategoryDetails.pending, (state) => {
        state.categoryDetails.loading = true;
      })
      .addCase(getCategoryDetails.fulfilled, (state, action) => {
        state.categoryDetails.loading = false;
        state.categoryDetails.error = false;
        state.categoryDetails.category = action.payload.data.doc;
      })
      .addCase(getCategoryDetails.rejected, (state, action) => {
        state.categoryDetails.loading = false;
        state.categoryDetails.error = action.payload;
      });
  },
});
export const {resetMutationResult} = categoriesSlice.actions;
export default categoriesSlice.reducer;
