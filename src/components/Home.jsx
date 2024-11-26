import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addToPastes, updateToPastes } from "../redux/pasteSlice";
import Login from "./auth/Login";
import { setUserFromLocalStorage } from "../redux/authSlice";
import CanvasEffect from "./CanvasSpiderWebEffect";
import { motion } from "framer-motion";

function Home() {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams({});
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();
  const allPastes = useSelector((state) => state.paste.pastes);

  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  // If pasteId exists, find the paste and pre-fill the form fields

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    // Only set user in Redux state if they are logged in
    if (savedUser && isLoggedIn === "true") {
      dispatch(setUserFromLocalStorage(savedUser));
    }
  }, [dispatch]);

  useEffect(() => {
    if (pasteId) {
      const pasteToEdit = allPastes.find((paste) => paste._id === pasteId);
      setTitle(pasteToEdit.title);
      setValue(pasteToEdit.description);
    }
  }, [pasteId]);

  const createPaste = () => {
    // Check if a paste with the same title already exists
    const duplicatePaste = allPastes.find(
      (paste) => paste.title.trim().toLowerCase() === title.trim().toLowerCase()
    );

    if (duplicatePaste && !pasteId) {
      // If a duplicate is found and we are not editing (pasteId is null), show an alert or toast
      dispatch(addToPastes(duplicatePaste));
      return;
    }
    const paste = {
      title: title,
      description: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toLocaleString("en-IN", {
        // "en-IN" : Specifies the locale (English as spoken in India).
        timeZone: "Asia/Kolkata", //Time zone for india
        hour12: true, // Use 12-hour format, set to false for 24-hour format
      }),
    };
    pasteId ? dispatch(updateToPastes(paste)) : dispatch(addToPastes(paste));
    if (paste.title.trim() && paste.description.trim()) {
      setTitle("");
      setValue("");
      setSearchParams({});
    }
  };
  return (
    <>
      {isAuthenticated ? (
        <div className="mt-16 w-[98vw] transition-bg duration-300">
          <CanvasEffect />
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
            className="font-rancho flex-col md:text-7xl text-4xl flex justify-center text-center text-[#fff] dark:text-[#646464] py-4 sm:py-8 transition-colors duration-300"
          >
            <h1>Welcome, {user ? user.username : "Guest"}</h1>
          </motion.div>
          <div className="flex sm:flex-row sm:justify-around flex-col justify-between gap-4 ">
            <div className="input">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Untitled Note"
                className={` min-w-[30vw]  dark:bg-[#121212] dark:border-black border sm:p-4 p-2 rounded-full flex-col justify-center bg-inputBg outline-none hover:outline-[#825a5a] sm:placeholder:text-base placeholder:text-[#9e5959]  sm:transition-all sm:duration-300 sm:ease-in-out sm:hover:scale-[0.95] hover:scale-[0.95] active:duration-300 placeholder:text-[14px] transition-all duration-300 w-full   placeholder:font-normal`}
              />
            </div>
            <button
              className="min-w-[30vw] text-center dark:bg-[#121212] dark:border-black border-none sm:p-4 p-2 rounded-full justify-center  bg-inputBg outline-none hover:outline-[#825a5a] sm:transition-all sm:duration-300 sm:ease-in-out  sm:hover:scale-[0.95] sm:active:scale-[1.05] active:scale-[1.08] active:duration-300 transition-all duration-300"
              onClick={createPaste}
            >
              {pasteId ? "Update note" : "Create note"}
            </button>
          </div>
          <div className="textArea mt-8 sm:mt-16 flex justify-center">
            <textarea
              cols="30"
              rows="10"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={`Enter description here...`}
              className=" min-w-[30vw]  dark:bg-[#121212] dark:border-black sm:p-4 p-2 rounded-2xl my-4 mt-6 flex-col justify-center  bg-inputBg outline-none hover:outline-[#825a5a] sm:placeholder:text-base placeholder:text-[#9e5959] sm:transition-all sm:duration-300 sm:ease-in-out sm:hover:scale-[0.98] hover:scale-[0.95]  active:duration-300 placeholder:text-[14px] transition-all duration-300 min-h-[40vh] sm:w-[80vw] w-full"
            ></textarea>
          </div>
        </div>
      ) : (
        <Login />
      )}
    </>
  );
}

export default Home;
