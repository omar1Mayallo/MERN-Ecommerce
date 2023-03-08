import {configureStore} from "@reduxjs/toolkit";
import logger from "redux-logger";
import rootReducer from "./reducers";

const middlewares = process.env.NODE_ENV !== "production" && logger;

const store = configureStore({
  reducer: rootReducer,
  // preloadedState:{},
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(middlewares),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
