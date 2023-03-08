import {createSlice} from "@reduxjs/toolkit";
import {createCashOrder, createCardOrder} from "./ordersServices";

const initialState = {isMutation: {success: false}, sessionUrl: null};

export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    resetMutationResult: (state) => {
      state.isMutation.success = false;
    },
    resetSessionUrl: (state) => {
      state.sessionUrl = null;
    },
  },
  extraReducers: (builder) => {
    builder
      //____________________CREATE_CASH_ORDER____________________//
      .addCase(createCashOrder.pending, (state) => {
        state.isMutation.loading = true;
      })
      .addCase(createCashOrder.fulfilled, (state, action) => {
        state.isMutation.loading = false;
        state.isMutation.success = action.payload.status === 201 && true;
      })
      .addCase(createCashOrder.rejected, (state, action) => {
        state.isMutation.loading = false;
      })
      //____________________CREATE_CARD_ORDER____________________//
      .addCase(createCardOrder.pending, (state) => {
        state.isMutation.loading = true;
      })
      .addCase(createCardOrder.fulfilled, (state, action) => {
        state.isMutation.loading = false;
        state.isMutation.success = action.payload.status === 200 && true;
        state.sessionUrl = action.payload.data.session.url;
      })
      .addCase(createCardOrder.rejected, (state, action) => {
        state.isMutation.loading = false;
      });
  },
});
export const {resetMutationResult, resetSessionUrl} = ordersSlice.actions;
export default ordersSlice.reducer;
