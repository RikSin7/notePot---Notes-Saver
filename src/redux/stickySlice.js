import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  stickies: JSON.parse(localStorage.getItem("sticky")) || [],
};

const stickySlice = createSlice({
  name: "sticky",
  initialState,
  reducers: {
    addSticky: (state, action) => {
      const { _id, color, text } = action.payload;
      state.stickies.push({ _id, color, text });
      localStorage.setItem("sticky", JSON.stringify(state.stickies));
    },
    updateSticky: (state, action) => {
      const { _id, color, text } = action.payload; // We now handle both color and text
      const index = state.stickies.findIndex((note) => note._id === _id);
      if (index !== -1) {
        // If color or text is provided, update them
        state.stickies[index] = {
          ...state.stickies[index],
          ...(color && { color }), // Only update color if provided
          text 
        };
        localStorage.setItem("sticky", JSON.stringify(state.stickies));
      }
    },

    removeSticky: (state, action) => {
      const id = action.payload;
      state.stickies = state.stickies.filter((sticky) => sticky._id !== id);
      localStorage.setItem("sticky", JSON.stringify(state.stickies));
    },
    resetSticky: (state) => {
      state.stickies = [];
      localStorage.removeItem("sticky");
    },
  },
});

export const { addSticky, updateSticky, removeSticky, resetSticky } =
  stickySlice.actions;
export default stickySlice.reducer;
