import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  shippingAddress: localStorage.getItem("shippingAddress")
    ? JSON.parse(localStorage.getItem("shippingAddress"))
    : null,
};

export const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    createShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
    },
  },
});
export const {createShippingAddress} = addressSlice.actions;
export default addressSlice.reducer;
