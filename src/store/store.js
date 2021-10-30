import { configureStore } from "@reduxjs/toolkit";
import photosReducer from "./photosReducer";
import appReducer from "./appReducer";

export const store = configureStore({
  reducer: {
    photos: photosReducer,
    app: appReducer,
  },
});
