import { configureStore } from '@reduxjs/toolkit'
import user from './user'
export const store = configureStore({
  reducer: {
    user
  },
})