import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserInfo } from "@/api/incentive";
import { getCurrentProjectId, saveCurrentProjectId } from '@/api/ls'


const initialState = {
  value: 0,
  authUser: true,
  authHeader: "",
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


export const fetchUserInfo = createAsyncThunk(`/info`, async (_, thunkAPI) => {
  const response = await getUserInfo();
  thunkAPI.dispatch(setUser(response?.user || {}));
  thunkAPI.dispatch(setProjects(response?.projects || []));
  return response.data;
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateAuthHeader: (_, action) => {
      state.authHeader = action.payload;
    },
    setCurrentProjectId: (state, action) => {
      state.currentProjectId = action.payload
      saveCurrentProjectId(action.payload)
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setProjects: (state, action) => {
      state.projects = action.payload;
    },
    setAuthUser: (state, action) => {
      state.authUser = action.payload;
      console.log(action);
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, setProjects, updateAuthHeader, setAuthUser, setCurrentProjectId } =
  userSlice.actions;

export default userSlice.reducer;
