import {createAsyncThunk} from "@reduxjs/toolkit";
import {useGetData} from "../../common/hooks/api/useGetData";
//_____________________GET_ALL_BANNERS____________________//
export const getAllBanners = createAsyncThunk(
  "banners/getAllBanners",
  async (_, {rejectWithValue}) => {
    try {
      const res = await useGetData("/banners");
      return res;
    } catch (error) {
      // console.log(error);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        (error.response && error.response.data && error.response.data.errors) ||
        error.message;
      // console.log(message);
      return rejectWithValue(message);
    }
  }
);
