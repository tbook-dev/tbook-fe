import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  headerTransparent: true,
  theme: "light",
  showConnectWalletModal: false,
  showLoginModal: false,
  showSnapshotCastModal: false,
  showSocicalModal: false,
  snapshotData: null,
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
    setLoginModal: (state, action) => {
      state.showLoginModal = action.payload;
    },
    setSnapshotCastModal: (state, action) => {
      state.showSnapshotCastModal = action.payload;
    },
    setShowSocicalModal: (state, action) => {
      state.showSocicalModal = action.payload;
    },
    setSnapshotData: (state, action) => {
      state.snapshotData = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  updateHeaderTransparent,
  setConnectWalletModal,
  setLoginModal,
  setSnapshotCastModal,
  setSnapshotData,
  setShowSocicalModal
} = globalSlice.actions;

export default globalSlice.reducer;
