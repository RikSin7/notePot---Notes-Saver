import { configureStore } from '@reduxjs/toolkit'
import pasteReducer from './pasteSlice'
import darkModeReducer from './darkModeSlice'
import todoReducer from './todoSlice'
import timerReducer from './timerSlice'
import authReducer from './authSlice'

const store = configureStore({
  reducer: {
    paste: pasteReducer,
    darkMode: darkModeReducer,
    todo: todoReducer,
    timer: timerReducer,
    auth: authReducer
  }
})

export default store
