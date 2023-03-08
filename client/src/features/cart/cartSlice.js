import {createSlice} from "@reduxjs/toolkit";
import {
  getUserCart,
  addToCart,
  removeFromCart,
  updateCartItemQty,
  clearCart,
  applyCoupon,
} from "./cartServices";
const initialState = {isMutation: {success: false}, userCart: {cart: {}}};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    resetMutationResult: (state) => {
      state.isMutation.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      //_____________________GET_USER_CART____________________//
      .addCase(getUserCart.pending, (state) => {
        state.userCart.loading = true;
      })
      .addCase(getUserCart.fulfilled, (state, action) => {
        state.userCart.loading = false;
        state.userCart.error = false;
        state.userCart.cart = action.payload.data;
      })
      .addCase(getUserCart.rejected, (state, action) => {
        state.userCart.loading = false;
        state.userCart.error = action.payload;
      })
      //____________________ADD_TO_CART____________________//
      .addCase(addToCart.pending, (state) => {
        state.isMutation.loading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isMutation.loading = false;
        state.isMutation.success = action.payload.status === 200 && true;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isMutation.loading = false;
      })
      //____________________REMOVE_FROM_CART____________________//
      .addCase(removeFromCart.pending, (state) => {
        state.isMutation.loading = true;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.isMutation.loading = false;
        state.isMutation.success = action.payload.status === 200 && true;
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.isMutation.loading = false;
      })
      //____________________UPDATE_CART_ITEM_QTY____________________//
      .addCase(updateCartItemQty.pending, (state) => {
        state.isMutation.loading = true;
      })
      .addCase(updateCartItemQty.fulfilled, (state, action) => {
        state.isMutation.loading = false;
        state.isMutation.success = action.payload.status === 200 && true;
      })
      .addCase(updateCartItemQty.rejected, (state, action) => {
        state.isMutation.loading = false;
      })
      //____________________CLEAR_CART____________________//
      .addCase(clearCart.pending, (state) => {
        state.isMutation.loading = true;
      })
      .addCase(clearCart.fulfilled, (state, action) => {
        state.isMutation.loading = false;
        state.isMutation.success = action.payload.status === 204 && true;
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.isMutation.loading = false;
      })
      //____________________APPLY_COUPON____________________//
      .addCase(applyCoupon.pending, (state) => {
        state.isMutation.loading = true;
      })
      .addCase(applyCoupon.fulfilled, (state, action) => {
        state.isMutation.loading = false;
        state.isMutation.success = action.payload.status === 200 && true;
      })
      .addCase(applyCoupon.rejected, (state, action) => {
        state.isMutation.loading = false;
      });
  },
});
export const {resetMutationResult} = cartSlice.actions;
export default cartSlice.reducer;
