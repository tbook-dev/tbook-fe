import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
  authHeader: "",
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
  `/info`,
  async (_, thunkAPI) => {
    const response = await fetch(`/info`).then(res => res.json())
    thunkAPI.dispatch(setUser(response?.user || {}))
    thunkAPI.dispatch(setProjects(response?.projects || []))
    return response.data
  }
)

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateAuthHeader: (state) => {
      state.authHeader = state.authHeader;
    },
    setUser: (state, action)  => {
      state.user = {
        ...state.user,
        ...action.payload
      }
    },
    setProjects: (state, action) => {
      state.projects = {
        ...state.projects,
        ...action.payload
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, setProjects, updateAuthHeader } = userSlice.actions;

export default userSlice.reducer;
