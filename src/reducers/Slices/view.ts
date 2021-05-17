import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ViewState {
  isOpenLoginForm: boolean
  isOpenSignUpForm: boolean
  isOpenFindPasswordForm: boolean
  isOpenProfileDropDown: boolean
  isOpenNoticeDropDown: boolean
  isOpenGifForm: boolean
  isFocusSearchBar: boolean
  isFailLoginSubmit: boolean
  isFailFindPasswordSubmit: boolean
}

const initialState: ViewState = {
  isOpenLoginForm: false,
  isOpenSignUpForm: false,
  isOpenFindPasswordForm: false,
  isOpenProfileDropDown: false,
  isOpenNoticeDropDown: false,
  isOpenGifForm: false,
  isFocusSearchBar: false,
  isFailLoginSubmit: false,
  isFailFindPasswordSubmit: false,
}

const viewSlice = createSlice({
  name: 'view',
  initialState,
  reducers: {
    setIsOpenLoginForm(state, action: PayloadAction<boolean>) {
      state.isOpenLoginForm = action.payload
      state.isOpenSignUpForm = false
      state.isOpenFindPasswordForm = false
    },
    setIsOpenSignUpForm(state, action: PayloadAction<boolean>) {
      state.isOpenLoginForm = false
      state.isOpenSignUpForm = action.payload
      state.isOpenFindPasswordForm = false
    },
    setIsOpenFindPasswordForm(state, action: PayloadAction<boolean>) {
      state.isOpenLoginForm = false
      state.isOpenSignUpForm = false
      state.isOpenFindPasswordForm = action.payload
    },
    setIsOpenProfileDropDown(state, action: PayloadAction<boolean>) {
      state.isOpenProfileDropDown = action.payload
    },
    setIsOpenNoticeDropDown(state, action: PayloadAction<boolean>) {
      state.isOpenNoticeDropDown = action.payload
    },
    setIsOpenGifForm(state, action: PayloadAction<boolean>) {
      state.isOpenGifForm = action.payload
    },
    setIsFocusSearchBar(state, action: PayloadAction<boolean>) {
      state.isFocusSearchBar = action.payload
    },
    setIsFailLoginSubmit(state, action: PayloadAction<boolean>) {
      state.isFailLoginSubmit = action.payload
    },
    setIsFailFindPasswordSubmit(state, action: PayloadAction<boolean>) {
      state.isFailFindPasswordSubmit = action.payload
    },
  },
})

export default viewSlice
