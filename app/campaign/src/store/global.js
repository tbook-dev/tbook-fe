import { createSlice } from '@reduxjs/toolkit';

const defaultMergeAccountData = {
  passportA: {
    dcName: '',
    evmAddress: '',
    tgName: '',
    tonAddress: '',
    twitterName: '',
    userId: 0,
  },
  passportB: {
    dcName: '',
    evmAddress: '',
    tgName: '',
    tonAddress: '',
    twitterName: '',
    userId: 0,
  },
  redirect: false,
};
const defaultUnbindAccountData = {
  passportA: {
    dcName: '',
    evmAddress: '',
    tgName: '',
    tonAddress: '',
    twitterName: '',
    userId: 0,
  },
  passportB: {
    dcName: '',
    evmAddress: '',
    tgName: '',
    tonAddress: '',
    twitterName: '',
    userId: 0,
  },
};
const initialState = {
  headerTransparent: true,
  showFooterTip: false,
  theme: 'light',
  showConnectWalletModal: false,
  showLoginModal: false,
  showSnapshotCastModal: false,
  showSocicalModal: false,
  showSocialRedirectModal: false,
  socialRedirectModalData: {
    type: 'telegram',
    status: 'loading',
    desc: '',
  },
  // socialRedirectModalData: {
  //   type: "twitter",
  //   status: "occupied-merge",
  //   desc: "test",
  // },
  snapshotData: null,
  showPassportGeneratingModal: false,
  showMergeAccountModal: false,
  mergeAccountData: { ...defaultMergeAccountData },
  showWalletConnectModal: false,
  EVMInconsistentModal: false,
  showUnbindAccountModal: false,
  unbindAccountData: { ...defaultUnbindAccountData },
  showDistoryTon: false,
  showUnbindSocial: false,
  unbindSocialData: {
    accountName: '',
    accountType: '',
  },
};

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    updateHeaderTransparent: (state, action) => {
      state.headerTransparent = action.payload;
    },
    setFooterTip: (state, action) => {
      state.showFooterTip = action.payload;
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
    setMergeAccountData: (state, action) => {
      state.mergeAccountData = action.payload;
    },
    resetMergeAccountData: (state) => {
      state.mergeAccountData = {
        ...defaultMergeAccountData,
      };
    },
    setShowWalletConnectModal: (state, action) => {
      state.showWalletConnectModal = action.payload;
    },
    setEVMInconsistentModal: (state, action) => {
      state.EVMInconsistentModal = action.payload;
    },
    setUnbindAccountModal: (state, action) => {
      state.showUnbindAccountModal = action.payload;
    },
    setUnbindAccountData: (state, action) => {
      state.unbindAccountData = action.payload;
    },
    setShowDistoryTon: (state, action) => {
      state.showDistoryTon = action.payload;
    },
    setShowUnbindSocial: (state, action) => {
      state.showUnbindSocial = action.payload;
    },
    setunbindSocialData: (state, action) => {
      state.unbindSocialData = action.payload;
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
  setMergeAccountData,
  resetMergeAccountData,
  setShowWalletConnectModal,
  setFooterTip,
  setEVMInconsistentModal,
  setUnbindAccountModal,
  setUnbindAccountData,
  setShowDistoryTon,
  setShowUnbindSocial,
  setunbindSocialData,
} = globalSlice.actions;

export default globalSlice.reducer;
