import { configureStore } from '@reduxjs/toolkit'
import reducer from '../reducers/rootReducer'

const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV === 'test',
})
export type RootState = ReturnType<typeof store.getState>
export type Dispatch = typeof store.dispatch

export default store
