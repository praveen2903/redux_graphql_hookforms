import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  todos: [],
  loading: false,
  error: null,
}

const skillTodosSlice = createSlice({
  name: 'skillTodos',
  initialState,
  reducers: {
    setSkillTodos: (state, action) => {
      state.todos = action.payload
      state.loading = false
      state.error = null
    },
    addSkillTodo: (state, action) => {
      const exists = state.todos.some((todo) => todo.id === action.payload.id)
      if (!exists) state.todos.unshift(action.payload)
    },
    replaceSkillTodo: (state, action) => {
      state.todos = state.todos.map((todo) => (
        todo.id === action.payload.id ? action.payload : todo
      ))
    },
    removeSkillTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload)
    },
    clearSkillTodos: (state) => {
      state.todos = []
      state.loading = false
      state.error = null
    },
    setSkillTodosLoading: (state, action) => {
      state.loading = action.payload
    },
    setSkillTodosError: (state, action) => {
      state.error = action.payload
      state.loading = false
    },
  },
})

export const {
  setSkillTodos,
  addSkillTodo,
  replaceSkillTodo,
  removeSkillTodo,
  clearSkillTodos,
  setSkillTodosLoading,
  setSkillTodosError,
} = skillTodosSlice.actions

export default skillTodosSlice.reducer