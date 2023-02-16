import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserInfo } from "@/api/incentive";
import { getCurrentProjectId, saveCurrentProjectId } from "@/api/ls";

const initialState = {
  value: 0,
  authUser: false,
  authHeader: "",
  loadingUserStatus: false,
  currentProjectId: getCurrentProjectId(),
  projects: [
    // {
    //   projectId: 21859680007,
    //   projectName: "abc",
    //   logoUrl: "",
    //   status: 0,
    //   chain: "Ethereum",
    //   tokenName: "",
    //   tokenTotalAmount: 0,
    //   tokenContractAddress: "",
    //   latestValuation: 100000000,
    // },
  ],
  user: {
    // userId: 21681550006,
    // mainWallet: "0x624f313007ca80eae6cd1536362721f479558e3f",
    // avatar: "https://avatars.dicebear.com/api/pixel-art/:muyv.svg",
    // email: "posuihushui@icloud.com",
    // name: "lake",
    // wallets: [],
  },
};

export const fetchUserInfo = createAsyncThunk(
  `userInfo`,
  async (showLoading = true, thunkAPI) => {
    if(showLoading){
      thunkAPI.dispatch(setLoadingUserStatus(true));
    }
    try {
      return getUserInfo()
        .then((response) => {
          // console.log("response", response);
          thunkAPI.dispatch(setUser(response?.user || {}));
          thunkAPI.dispatch(setProjects(response?.projects || []));
        })
        .catch((err) => {
          console.log(err, "xxx");
        })
        .finally(() => {
          thunkAPI.dispatch(setLoadingUserStatus(false));
        });
    } catch (error) {
      console.log("error getUserInfo", err);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateAuthHeader: (_, action) => {
      state.authHeader = action.payload;
    },
    setCurrentProjectId: (state, action) => {
      state.currentProjectId = action.payload;
      saveCurrentProjectId(action.payload);
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setProjects: (state, action) => {
      state.projects = action.payload;
    },
    setAuthUser: (state, action) => {
      state.authUser = action.payload;
      // console.log(action);
    },
    setLoadingUserStatus: (state, action) => {
      state.loadingUserStatus = action.payload;
    },
    reset: (state) => {
      saveCurrentProjectId(null);
      state = { ...initialState, currentProjectId: null };
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setUser,
  setProjects,
  updateAuthHeader,
  setAuthUser,
  setCurrentProjectId,
  reset,
  setLoadingUserStatus,
} = userSlice.actions;

export default userSlice.reducer;
