import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from "../redux/darkModeSlice";

const DarkModeToggle = () => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);

  return (
    <button
      onClick={() => dispatch(toggleDarkMode())}
    >
      {isDarkMode ? "Light Mode" : "Dark Mode"}
    </button>
  );
};

export default DarkModeToggle;
