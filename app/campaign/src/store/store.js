import { configureStore } from "@reduxjs/toolkit";
import global from "./global";
export const store = configureStore({
  reducer: {
    global,
  },
});
