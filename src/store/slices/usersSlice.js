import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  users: [],
  loading: false,
  error: null,
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload
      state.loading = false
      state.error = null
    },
    upsertUser: (state, action) => {
      const index = state.users.findIndex((user) => user.id === action.payload.id)
      if (index >= 0) {
        state.users[index] = action.payload
      } else {
        state.users.push(action.payload)
      }
    },
    removeUser: (state, action) => {
      state.users = state.users.filter((user) => user.id !== action.payload)
    },
    setUsersLoading: (state, action) => {
      state.loading = action.payload
    },
    setUsersError: (state, action) => {
      state.error = action.payload
      state.loading = false
    },
  },
})

export const { setUsers, upsertUser, removeUser, setUsersLoading, setUsersError } = usersSlice.actions
export default usersSlice.reducer