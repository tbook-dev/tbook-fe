import { configureStore } from '@reduxjs/toolkit'
import user from './user'
import { injectStore } from '../api/request'

export const store = configureStore({
  reducer: {
    user
  },
})
injectStore(store);

