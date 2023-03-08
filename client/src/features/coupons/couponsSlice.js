import {createSlice} from "@reduxjs/toolkit";

const initialState = {isMutation: {success: false}};

export const couponsSlice = createSlice({
  name: "coupons",
  initialState,
  reducers: {
    resetMutationResult: (state) => {
      state.isMutation.success = false;
    },
  },
  extraReducers: (builder) => {},
});
export const {resetMutationResult} = couponsSlice.actions;
export default couponsSlice.reducer;
