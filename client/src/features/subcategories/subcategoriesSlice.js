import {
  createSubcategory,
  updateSubcategory,
  deleteSubcategory,
  getAllSubcategories,
  getAllSubcategoriesBelongToCertainCategory,
} from "./subcategoriesServices";
import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  allSubcategories: {subcategories: []},
  nestedSubcategories: {subcategories: []},
  isMutation: {success: false},
};

export const subcategoriesSlice = createSlice({
  name: "subcategories",
  initialState,
  reducers: {
    resetMutationResult: (state) => {
      state.isMutation.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      //_____________________GET_ALL_SUBCATEGORIES____________________//
      .addCase(getAllSubcategories.pending, (state) => {
        state.allSubcategories.loading = true;
      })
      .addCase(getAllSubcategories.fulfilled, (state, action) => {
        state.allSubcategories.loading = false;
        state.allSubcategories.error = false;
        state.allSubcategories.subcategories = action.payload.data.docs;
        state.allSubcategories.results = action.payload.results;
        state.allSubcategories.totalNumOfDocs = action.payload.totalNumOfDocs;
        state.allSubcategories.paginationStatus =
          action.payload.paginationStatus;
      })
      .addCase(getAllSubcategories.rejected, (state, action) => {
        state.allSubcategories.loading = false;
        state.allSubcategories.error = action.payload;
      })
      //_____GET_ALL_SUBCATEGORIES_WHICH_BELONG_TO_CERTAIN_CATEGORY_____//
      .addCase(getAllSubcategoriesBelongToCertainCategory.pending, (state) => {
        state.nestedSubcategories.loading = true;
      })
      .addCase(
        getAllSubcategoriesBelongToCertainCategory.fulfilled,
        (state, action) => {
          state.nestedSubcategories.loading = false;
          state.nestedSubcategories.error = false;
          state.nestedSubcategories.subcategories = action.payload.data.docs;
          state.nestedSubcategories.results = action.payload.results;
          state.nestedSubcategories.totalNumOfDocs =
            action.payload.totalNumOfDocs;
          state.nestedSubcategories.paginationStatus =
            action.payload.paginationStatus;
        }
      )
      .addCase(
        getAllSubcategoriesBelongToCertainCategory.rejected,
        (state, action) => {
          state.nestedSubcategories.loading = false;
          state.nestedSubcategories.error = action.payload;
        }
      )
      //_____________________CREATE_SUBCATEGORY____________________//
      .addCase(createSubcategory.pending, (state) => {
        state.isMutation.loading = true;
      })
      .addCase(createSubcategory.fulfilled, (state, action) => {
        state.isMutation.loading = false;
        state.isMutation.success = action.payload.status === 201 && true;
      })
      .addCase(createSubcategory.rejected, (state, action) => {
        state.isMutation.loading = false;
      })
      //_____________________UPDATE_SUBCATEGORY____________________//
      .addCase(updateSubcategory.pending, (state) => {
        state.isMutation.loading = true;
      })
      .addCase(updateSubcategory.fulfilled, (state, action) => {
        state.isMutation.loading = false;
        state.isMutation.success = action.payload.status === 200 && true;
      })
      .addCase(updateSubcategory.rejected, (state, action) => {
        state.isMutation.loading = false;
      })
      //_____________________DELETE_SUBCATEGORY____________________//
      .addCase(deleteSubcategory.pending, (state) => {
        state.isMutation.loading = true;
      })
      .addCase(deleteSubcategory.fulfilled, (state, action) => {
        state.isMutation.loading = false;
        state.isMutation.success = action.payload.status === 204 && true;
      })
      .addCase(deleteSubcategory.rejected, (state, action) => {
        state.isMutation.loading = false;
      });
  },
});
export const {resetMutationResult} = subcategoriesSlice.actions;
export default subcategoriesSlice.reducer;
