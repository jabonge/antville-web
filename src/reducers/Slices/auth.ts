import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Auth } from '../../api/types'

type AuthState = Auth | null

const initialState = null as AuthState

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthState(state, action: PayloadAction<AuthState | null>) {
      if (action.payload === null) {
        return (state = null)
      } else {
        return (state = action.payload)
      }
    },
  },
})

export default authSlice
