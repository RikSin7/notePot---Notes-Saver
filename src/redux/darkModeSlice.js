import { createSlice } from '@reduxjs/toolkit'

const darkModeSlice = createSlice({
  name: 'darkMode',
  initialState: {
    isDarkMode: localStorage.getItem('darkMode') === 'true' // Simplified the ternary check
  },
  reducers: {
    toggleDarkMode: state => {
      state.isDarkMode = !state.isDarkMode
      localStorage.setItem('darkMode', state.isDarkMode) // Save the new state in localStorage
    }
  }
})

export const { toggleDarkMode } = darkModeSlice.actions
export default darkModeSlice.reducer
