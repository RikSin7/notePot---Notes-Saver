import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function ViewPaste() {
  const { id } = useParams();

  const allPastes = useSelector((state) => state.paste.pastes);

  // Use find instead of filter to get the paste object directly
  const paste = allPastes.find((uniquePaste) => uniquePaste._id === id);

  // Handle the case where the paste is not found
  if (!paste) {
    return <div className="mt-16">Paste not found!</div>;
  }

  return (
    <div className="mt-16  flex flex-col items-center w-full relative transition-bg duration-300">
      <div className="my-4 gap-4">
        <div className="input">
          <input
            type="text"
            value={paste.title} // Access the title property correctly
            className="border border-[#616161]  px-2 sm:py-3 py-2 rounded-md outline-none dark:bg-bgInDark min-w-[90vw]  sm:min-w-[90vw] md:min-w-[70vw] transition-bg duration-300"
            readOnly
          />
        </div>
      </div>
      <div className="textArea">
        <textarea
          cols="30"
          rows="10"
          value={paste.description} // Access the description property correctly
          className="border border-[#353535] dark:bg-bgInDark px-2 outline-none placeholder:text-lg dark:text-[#ffffff] min-w-[90vw] sm:min-w-[90vw] min-h-[70vh] md:min-w-[70vw] transition-bg duration-300 md:text-lg"
          readOnly
        ></textarea>
      </div>
    </div>
  );
}

export default ViewPaste;
