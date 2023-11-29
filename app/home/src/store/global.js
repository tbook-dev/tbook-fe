import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  headerTransparent: true,
  theme: "light",
  showConnectWalletModal: false,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    updateHeaderTransparent: (state, action) => {
      state.headerTransparent = action.payload;
    },
    setConnectWalletModal: (state, action) => {
      state.showConnectWalletModal = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateHeaderTransparent, setConnectWalletModal } =
  globalSlice.actions;

export default globalSlice.reducer;
