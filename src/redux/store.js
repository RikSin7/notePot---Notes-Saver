import { configureStore } from "@reduxjs/toolkit";
import pasteReducer from "./pasteSlice";
import darkModeReducer from "./darkModeSlice";
import todoReducer from "./todoSlice";

const store = configureStore({
  reducer: {
    paste: pasteReducer,
    darkMode: darkModeReducer,
    todo: todoReducer
  },
});

export default store;
