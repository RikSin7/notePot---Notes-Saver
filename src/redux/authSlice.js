import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
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

      // Check if user exists in local storage
      const existingUser = JSON.parse(localStorage.getItem("user"));

      // If user exists, compare credentials
      if (
        existingUser &&
        existingUser.username === username &&
        existingUser.password === password
      ) {
        state.user = existingUser; // Set the user state
      toast.success("Login successful.");

      } else {
        // Handle failed login attempt
        throw new Error("Invalid credentials. Please sign up or try again.");
      }
    },
    logout: (state) => {
      // Retain the user's credentials (email, username, and password) in localStorage
      const existingUser = JSON.parse(localStorage.getItem("user"));
    
      // Clear only the Redux state (log the user out)
      state.user = { email: existingUser.email }; // Keep only email in Redux state
      toast.success("Logout successful.");
      // Optionally, you can keep localStorage unchanged if you want to retain the full user credentials
    },
    
    
    signup: (state, action) => {
      const { username, password, email } = action.payload;

      // Save user data to state
      state.user = { username, password, email };
      localStorage.setItem("user", JSON.stringify(state.user));
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

export const { changeUsername, login, logout, signup, resetPassword } =
  authSlice.actions;
export default authSlice.reducer;
