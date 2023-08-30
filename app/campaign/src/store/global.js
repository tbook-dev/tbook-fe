import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  headerTransparent: true,
  theme: 'light'
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    updateHeaderTransparent: (state, action) => {
      state.headerTransparent = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateHeaderTransparent } = globalSlice.actions;

export default globalSlice.reducer;
