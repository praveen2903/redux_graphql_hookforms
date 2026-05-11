import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import skillTodosReducer from './slices/skillTodosSlice'
import usersReducer from './slices/usersSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    skillTodos: skillTodosReducer,
  },
})