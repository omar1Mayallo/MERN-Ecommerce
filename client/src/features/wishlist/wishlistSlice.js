import {createSlice} from "@reduxjs/toolkit";
import {
  getUserWishlist,
  addToWishlist,
  removeFromWishlist,
} from "./wishlistServices";

const initialState = {
  isMutation: {success: false},
  userWishList: {wishlist: []},
};

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    resetMutationResult: (state) => {
      state.isMutation.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      //_____________________GET_USER_WISHLIST_____________________//
      .addCase(getUserWishlist.pending, (state) => {
        state.userWishList.loading = true;
      })
      .addCase(getUserWishlist.fulfilled, (state, action) => {
        state.userWishList.loading = false;
        state.userWishList.error = false;
        state.userWishList.wishlist = action.payload.data;
      })
      .addCase(getUserWishlist.rejected, (state, action) => {
        state.userWishList.loading = false;
        state.userWishList.error = action.payload;
      })
      //_____________________ADD_TO_WISHLIST_____________________//
      .addCase(addToWishlist.pending, (state) => {
        state.isMutation.loading = true;
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.isMutation.loading = false;
        state.isMutation.success = action.payload.status === 200 && true;
      })
      .addCase(addToWishlist.rejected, (state, action) => {
        state.isMutation.loading = false;
      })
      //_____________________REMOVE_FROM_WISHLIST_____________________//
      .addCase(removeFromWishlist.pending, (state) => {
        state.isMutation.loading = true;
      })
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.isMutation.loading = false;
        state.isMutation.success = action.payload.status === 200 && true;
      })
      .addCase(removeFromWishlist.rejected, (state, action) => {
        state.isMutation.loading = false;
      });
  },
});
export const {resetMutationResult} = wishlistSlice.actions;
export default wishlistSlice.reducer;
