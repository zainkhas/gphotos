import { configureStore } from "@reduxjs/toolkit";
import photosReducer from "./photosReducer";
import appReducer from "./appReducer";
import facesReducer from "./facesReducer";
import storage from "redux-persist/lib/storage";

import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const persistFacesConfig = {
  key: "faces",
  version: 1,
  storage,
};

export const store = configureStore({
  reducer: {
    faces: persistReducer(persistFacesConfig, facesReducer),
    photos: photosReducer,
    app: appReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
