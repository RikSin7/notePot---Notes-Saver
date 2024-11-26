import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
  isAuthenticated: localStorage.getItem("isLoggedIn") === "true", // Track auth status
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserFromLocalStorage: (state, action) => {
      // Set the user in the Redux state from localStorage
      state.user = action.payload;
    },
    changeUsername: (state, action) => {
      const newUsername = action.payload;

      // Update username in state
      if (state.user) {
        state.user.username = newUsername;

        // Update the username in localStorage as well
        localStorage.setItem("user", JSON.stringify(state.user));
        toast.success("Username changed.");
      }
    },
    login: (state, action) => {
      const { username, password } = action.payload;
      const existingUser = JSON.parse(localStorage.getItem("user"));

      if (
        existingUser &&
        existingUser.username === username &&
        existingUser.password === password
      ) {
        state.user = existingUser; // Set user in Redux state
        state.isAuthenticated = true; // Set auth status to true
        localStorage.setItem("isLoggedIn", "true"); // Update auth status in localStorage
        toast.success("Login successful.");
      } else {
        throw new Error("Invalid credentials. Please sign up or try again.");
      }
    },
    logout: (state) => {
      const existingUser = JSON.parse(localStorage.getItem("user"));

      if (existingUser) {
        state.user = null; // Clear user from state
        state.isAuthenticated = false; // Set auth status to false
        localStorage.setItem("isLoggedIn", "false"); // Update auth status in localStorage
        toast.success("Logout successful.");
      }
    },

    signup: (state, action) => {
      const { username, password, email } = action.payload;

      // Save user data to state
      state.user = { username, password, email };
      state.isAuthenticated = true; // Set authenticated state to true
      localStorage.setItem("user", JSON.stringify(state.user)); // Store user data in local storage
      localStorage.setItem("isLoggedIn", "true"); // Set login status in localStorage
      toast.success("Sign up successful.");
    },
    resetPassword: (state, action) => {
      const { email, newPassword } = action.payload;

      // Check if user exists in local storage
      const existingUser = JSON.parse(localStorage.getItem("user"));

      // If the email matches, update the password
      if (existingUser && existingUser.email === email) {
        existingUser.password = newPassword;
        localStorage.setItem("user", JSON.stringify(existingUser)); // Update local storage
      } else {
        throw new Error("Email not found. Please check and try again.");
      }
    },
  },
});

export const {
  setUserFromLocalStorage,
  changeUsername,
  login,
  logout,
  signup,
  resetPassword,
} = authSlice.actions;
export default authSlice.reducer;
