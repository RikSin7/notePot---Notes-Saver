import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addToPastes, updateToPastes } from "../redux/pasteSlice";

function Home() {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams({});
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();
  const allPastes = useSelector((state) => state.paste.pastes);
  // If pasteId exists, find the paste and pre-fill the form fields
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
    <div className="mt-16 w-[98vw] transition-bg duration-300">
      <h1 className="font-[rancho] md:text-7xl text-4xl flex justify-center text-center text-[#ffffff] dark:text-[#646464] py-4 sm:py-8 transition-all duration-300">
        Note Pot
      </h1>
      <div className="flex sm:flex-row sm:justify-around flex-col justify-between gap-4 ">
        <div className="input">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Untitled Note"
            className="placeholder:font-[silkScreen] min-w-[30vw]  dark:bg-[#121212] dark:border-black border border-[#c5c5c5] sm:p-4 p-2 rounded-full flex-col justify-center bg-[#ffffff] outline-none hover:outline-[#825a5a] sm:placeholder:text-base placeholder:text-[#9e5959] relative z-10 sm:transition-all sm:duration-300 sm:ease-in-out sm:transform sm:hover:scale-[0.95] hover:scale-[0.95] active:duration-300 placeholder:text-[14px] transition-all duration-300 w-full font-[600] placeholder:font-normal"
          />
        </div>
        <button
          className="min-w-[30vw] text-center dark:bg-[#121212] dark:border-black border-none sm:p-4 p-2 rounded-full justify-center font-[silkScreen] bg-[#fff] outline-none hover:outline-[#825a5a] relative z-10 sm:transition-all sm:duration-300 sm:ease-in-out sm:transform sm:hover:scale-[0.95] sm:active:scale-[1.05] active:scale-[1.08] active:duration-300 transition-all duration-300"
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
          className="placeholder:font-[silkScreen] min-w-[30vw]  dark:bg-[#121212] dark:border-black sm:p-4 p-2 rounded-2xl my-4 mt-6 flex-col justify-center  bg-[#ffffff] outline-none hover:outline-[#825a5a] sm:placeholder:text-base placeholder:text-[#9e5959]  relative z-10 sm:transition-all sm:duration-300 sm:ease-in-out sm:transform sm:hover:scale-[0.98] hover:scale-[0.95]  active:duration-300 placeholder:text-[14px] transition-all duration-300 min-h-[40vh] sm:w-[80vw] w-full"
        ></textarea>
      </div>
    </div>
  );
}

export default Home;
