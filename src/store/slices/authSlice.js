import { createSlice } from '@reduxjs/toolkit'

const readSavedAuth = () => {
  try {
    return JSON.parse(localStorage.getItem('devportal_auth') || 'null')
  } catch {
    return null
  }
}

const savedAuth = readSavedAuth()

const initialState = {
  user: savedAuth?.user || null,
  token: savedAuth?.token || null,
  loading: false,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload.user
      state.token = action.payload.token
      state.loading = false
      state.error = null
    },
    updateCurrentUser: (state, action) => {
      state.user = action.payload
    },
    logout: (state) => {
      state.user = null
      state.token = null
      state.loading = false
      state.error = null
    },
    setAuthLoading: (state, action) => {
      state.loading = action.payload
    },
    setAuthError: (state, action) => {
      state.error = action.payload
      state.loading = false
    },
  },
})

export const { setCredentials, updateCurrentUser, logout, setAuthLoading, setAuthError } = authSlice.actions
export default authSlice.reducer