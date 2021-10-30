import { createSlice } from "@reduxjs/toolkit";
import { SNACKBAR_TYPES } from "../constants/SNACKBAR_TYPES";

const initialState = {
  snackBar: { open: false, text: "", type: SNACKBAR_TYPES.INFO },
};

export const counterSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    updateSnackBar: (state, action) => {
      state.snackBar = action.payload;
    },
  },
});

export const { updateSnackBar } = counterSlice.actions;

export default counterSlice.reducer;
