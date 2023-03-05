import { configureStore } from "@reduxjs/toolkit";
import { user } from "@tbook/store";
import { injectStore } from '../api/request'

export const store = configureStore({
  reducer: {
    user,
  },
});
injectStore(store);
