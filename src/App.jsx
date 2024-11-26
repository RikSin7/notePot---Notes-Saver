<<<<<<< HEAD
import  { useEffect } from "react";
=======
import React, { useEffect } from "react";
>>>>>>> origin/main
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Paste from "./components/Pastes";
import ViewPaste from "./components/ViewPaste";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import TodoInput from "./components/TodoInput";
import Login from "./components/auth/Login";
import FloatingNote from "./components/FloatingNote";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <div>
          <Navbar />
          <Home />
        </div>
      ),
    },
    {
      path: "/pastes",
      element: (
        <div>
          <Navbar />
          <Paste />
        </div>
      ),
    },
    {
      path: "/pastes/:id",
      element: (
        <div>
          <Navbar />
          <ViewPaste />
        </div>
      ),
    },
    {
      path: "/pastes/stickynotes",
      element: (
        <div>
          {/* <Navbar /> */}
          <FloatingNote />
        </div>
      ),
    },
    {
      path: "/todoinput",
      element: (
        <div>
          <Navbar />
          <TodoInput />
        </div>
      ),
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);

  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);

  // Apply the 'dark' class to the root element based on Redux state
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <div
      className={`flex justify-center min-h-screen transition-bg duration-300 ${
        isDarkMode ? "bg-darkBg text-darkText" : "bg-lightBg text-lightText"
      }`}
    >
      <RouterProvider router={router} />
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 2000,
          style: {
            background: isDarkMode ? "#333" : "#f9f9f9",
            color: isDarkMode ? "#fff" : "#333",
          },
        }}
      />
    </div>
  );
}

export default App;
