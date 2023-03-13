import {createSlice} from "@reduxjs/toolkit";
import {
  createCashOrder,
  createCardOrder,
  getAllOrders,
  getOrderDetails,
  updateOrderToPaid,
  updateOrderToDelivered,
  deleteOrder,
} from "./ordersServices";

const initialState = {
  isMutation: {success: false},
  sessionUrl: null,
  //@NOTE: For Users Only user orders will return from the server, but for Admins all orders will return
  allOrders: {orders: []},
  orderDetails: {},
};

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
      })
      //____________________GET_ORDER_DETAILS____________________//
      .addCase(getOrderDetails.pending, (state) => {
        state.orderDetails.loading = true;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.orderDetails.loading = false;
        state.orderDetails.error = false;
        state.orderDetails.order = action.payload.data.doc;
      })
      .addCase(getOrderDetails.rejected, (state, action) => {
        state.orderDetails.loading = false;
        state.orderDetails.error = action.payload;
      })
      //____________________GET_ALL_ORDERS____________________//
      .addCase(getAllOrders.pending, (state) => {
        state.allOrders.loading = true;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.allOrders.loading = false;
        state.allOrders.error = false;
        state.allOrders.orders = action.payload.data.docs;
        state.allOrders.results = action.payload.results;
        state.allOrders.totalNumOfDocs = action.payload.totalNumOfDocs;
        state.allOrders.paginationStatus = action.payload.paginationStatus;
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.allOrders.loading = false;
        state.allOrders.error = action.payload;
      })
      //_____________________UPDATE_ORDER_TO_PAID____________________//
      .addCase(updateOrderToPaid.pending, (state) => {
        state.isMutation.loading = true;
      })
      .addCase(updateOrderToPaid.fulfilled, (state, action) => {
        state.isMutation.loading = false;
        state.isMutation.success = action.payload.status === 200 && true;
      })
      .addCase(updateOrderToPaid.rejected, (state, action) => {
        state.isMutation.loading = false;
      })
      //_____________________UPDATE_ORDER_TO_DELIVERED____________________//
      .addCase(updateOrderToDelivered.pending, (state) => {
        state.isMutation.loading = true;
      })
      .addCase(updateOrderToDelivered.fulfilled, (state, action) => {
        state.isMutation.loading = false;
        state.isMutation.success = action.payload.status === 200 && true;
      })
      .addCase(updateOrderToDelivered.rejected, (state, action) => {
        state.isMutation.loading = false;
      })
      //_____________________DELETE_ORDER____________________//
      .addCase(deleteOrder.pending, (state) => {
        state.isMutation.loading = true;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.isMutation.loading = false;
        state.isMutation.success = action.payload.status === 204 && true;
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.isMutation.loading = false;
      });
  },
});
export const {resetMutationResult, resetSessionUrl} = ordersSlice.actions;
export default ordersSlice.reducer;
