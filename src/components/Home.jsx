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
    if (paste.title && paste.description) {
      setTitle("");
      setValue("");
      setSearchParams({});
    }
  };
  return (
    <div className="mt-16 w-[98vw] transition-colors duration-300">
      <h1 className="font-[rancho] md:text-7xl text-4xl flex justify-center text-center text-[#654A4E] py-4">
        Note Pot
      </h1>
      <div className="flex flex-row xs:flex-col my-4 justify-between gap-4 ">
        <div className="input">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Untitled Note"
            className="placeholder:text-[#c5c0c0] border border-[#616161] min-w-[20vw] px-2 sm:py-3 py-2 rounded-md outline-none dark:bg-bgInDark xs:w-full transition-bg duration-300"
          />
        </div>
        <button
          className="bg-[#654A4E] px-5 sm:py-3 py-2 transition-bg duration-300 rounded-md border border-[#323232] min-w-[10vw] cursor-pointer text-white"
          onClick={createPaste}
        >
          {pasteId ? "Update note" : "Create note"}
        </button>
      </div>
      <div className="textArea mt-8">
        <textarea
          cols="30"
          rows="10"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={`Enter description here...`}
          className="placeholder:text-[#c5c0c0] brounded-md  border border-[#353535] dark:bg-bgInDark px-2 outline-none placeholder:text-lg dark:text-white w-full transition-bg duration-300 h-[50vh]"
        ></textarea>
      </div>
    </div>
  );
}

export default Home;
