import { configureStore } from '@reduxjs/toolkit'
import pasteReducer from './pasteSlice'
import darkModeReducer from './darkModeSlice'

const store = configureStore({
  reducer: {
    paste: pasteReducer,
    darkMode: darkModeReducer,
  }
})

export default store
