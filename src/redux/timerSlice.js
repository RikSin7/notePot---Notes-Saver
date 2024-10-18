import { createSlice } from '@reduxjs/toolkit'

const timerSlice = createSlice({
  name: 'timer',
  initialState: {
    time: 0,
    isRunning: false,
    intervalId: null
  },
  reducers: {
    startTimer: (state, action) => {
      if (!state.isRunning) {
        state.isRunning = true
        state.intervalId = action.payload // Store intervalId in state
      }
    },
    stopTimer: state => {
      if (state.isRunning) {
        state.isRunning = false
        clearInterval(state.intervalId)
        state.intervalId = null
      }
    },
    resetTimer: state => {
      state.time = 0
      state.isRunning = false
      clearInterval(state.intervalId)
      state.intervalId = null
    },
    updateTime: (state, action) => {
      state.time = action.payload
    }
  }
})

export const { startTimer, stopTimer, resetTimer, updateTime } =
  timerSlice.actions
export default timerSlice.reducer
