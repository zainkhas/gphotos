import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  photos: [],
  trashed: [],
};

export const counterSlice = createSlice({
  name: "photos",
  initialState,
  reducers: {
    updatePhotos: (state, action) => {
      state.photos = action.payload;
    },
    updateTrashedPhotos: (state, action) => {
      state.trashed = action.payload;
    },
    trash: (state, action) => {
      state.trashed = [...state.trashed, state.photos[action.payload]];
      state.photos = [
        ...state.photos.slice(0, action.payload),
        ...state.photos.slice(action.payload + 1),
      ];
    },
  },
});

export const { updatePhotos, trash, updateTrashedPhotos } =
  counterSlice.actions;

export default counterSlice.reducer;
