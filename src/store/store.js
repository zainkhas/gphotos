import { configureStore } from "@reduxjs/toolkit";
import photosReducer from "./photosReducer";
import appReducer from "./appReducer";
import facesReducer from "./facesReducer";

export const store = configureStore({
  reducer: {
    faces: facesReducer,
    photos: photosReducer,
    app: appReducer,
  },
});
