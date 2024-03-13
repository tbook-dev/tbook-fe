import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  headerTransparent: true,
  theme: "light",
  showConnectWalletModal: false,
  showLoginModal: false,
  showSnapshotCastModal: false,
  showSocicalModal: false,
  showSocialRedirectModal: false,
  socialRedirectModalData: {
    type: "telegram",
    status: "loading",
    desc: "",
  },
  // socialRedirectModalData: {
  //   type: "twitter",
  //   status: "occupied-merge",
  //   desc: "test",
  // },
  snapshotData: null,
  showPassportGeneratingModal: false,
  showMergeAccountModal: false,
  mergeAccountData: {
    twitterName: "",
    address: "",
  },
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
    setShowSocialRedirectModal: (state, action) => {
      state.showSocialRedirectModal = action.payload;
    },
    setsocialRedirectModalData: (state, action) => {
      state.socialRedirectModalData = action.payload;
    },
    setSnapshotData: (state, action) => {
      state.snapshotData = action.payload;
    },
    setShowPassportGeneratingModal: (state, action) => {
      // 手动比较
      if (state.showPassportGeneratingModal !== action.payload) {
        state.showPassportGeneratingModal = action.payload;
      }
    },
    setShowMergeAccountModal: (state, action) => {
      state.showMergeAccountModal = action.payload;
    },
    resetMergeAccountData: (state) => {
      state.mergeAccountData = {
        twitterName: "",
        address: "",
      };
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
  setShowSocicalModal,
  setShowSocialRedirectModal,
  setsocialRedirectModalData,
  setShowPassportGeneratingModal,
  setShowMergeAccountModal,
  resetMergeAccountData
} = globalSlice.actions;

export default globalSlice.reducer;
