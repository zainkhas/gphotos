import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  photos: [],
};

export const counterSlice = createSlice({
  name: "photos",
  initialState,
  reducers: {
    updatePhotos: (state, action) => {
      state.photos = action.payload;
    },
  },
});

export const { updatePhotos } = counterSlice.actions;

export default counterSlice.reducer;
