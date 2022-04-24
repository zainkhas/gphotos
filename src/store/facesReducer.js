import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  faces: {},
};

export const facesSlice = createSlice({
  name: "faces",
  initialState,
  reducers: {
    addFaces: (state, action) => {
      state.faces = { ...state.faces, ...action.payload };
    },
    deleteAllFaces: (state, action) => {
      state.faces = {};
    },
  },
});

export const { addFaces, deleteAllFaces } = facesSlice.actions;

export default facesSlice.reducer;
