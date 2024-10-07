import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import toast from "react-hot-toast";
import { removeFromPastes, resetAllPastes } from "../redux/pasteSlice";

function Pastes() {
  const [searchTerm, setSearchTerm] = useState("");
  const allPastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();
  const filterdPastes = allPastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleShare = (paste) => {
    // Construct the URL (replace with your actual app URL and use paste._id to make it unique)
    const linkToCopy = `${window.location.origin}/pastes/${paste._id}`;

    // Copy the link to the clipboard
    navigator.clipboard
      .writeText(linkToCopy)
      .then(() => {
        // Notify success
        toast.success("Share Link copied to clipboard!");
      })
      .catch(() => {
        // Notify failure
        toast.error("Failed to copy the Share Link.");
      });
  };

  const handleCopy = (paste) => {
    const pasteContent = `Title: ${paste.title}\nDescription: ${paste.description}\nCreated at: ${paste.createdAt}`;
    navigator.clipboard
      .writeText(pasteContent)
      .then(() => {
        toast.success("Copied to clipboard!");
      })
      .catch(() => {
        toast.error("Failed to copy!");
      });
  };

  const handleDelete = (pasteId) => {
    dispatch(removeFromPastes(pasteId));
  };

  const handleResetAll = () => {
    const confirmed = window.confirm("Are you sure? This cannot be undone!");
    if (confirmed) {
      dispatch(resetAllPastes());
    }
  };
  return (
    <div className="flex flex-col items-center w-full mt-16 px-4">
      <input
        type="text"
        placeholder="Search My Notes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="placeholder:font-[silkScreen] min-w-[30vw]  dark:bg-[#654A4E] dark:border-black border border-[#c5c5c5] sm:p-4 p-2 rounded-full my-4 mt-6 placeholder:text-[#414141] flex-col justify-center placeholder:text-center text-center caret-[#0d601d] custom-caret dark:placeholder:text-[white] outline-none hover:outline-[#825a5a] bg-[#ffffff] transition-all duration-300"

        //

        //
      />
      <h1 className="text-[#ffffff] dark:text-[#646464] md:text-5xl text-2xl font-semibold mt-4 border border-black w-[98vw] py-2 px-2 rounded-md dark:bg-bgInDark bg-[#916A70] transition-all duration-300 flex items-center ">
        My Notes
      </h1>
      <div className="pastes flex flex-col gap-2 mt-8 w-[98vw] mb-8">
        {filterdPastes.length > 0 &&
          filterdPastes.map((paste) => (
            <div
              className="border border-[#805151] dark:border-[black] dark:bg-bgInDark bg-[#D9DFE9] py-1 px-4 rounded-xl flex flex-col md:gap-1 max-h-[300px] overflow-y-auto transition-all duration-300"
              key={paste._id}
            >
              <div className="titleAndControls flex justify-between ">
                <div className="text-[#9a5d5d] dark:text-[#9a5d5d] sm:text-5xl text-3xl font-semibold mb-2 transition-all duration-300">
                  {paste.title}
                </div>
                <span className="flex gap-4  sm:text-lg text-sm ">
                  <button>
                    <NavLink to={`/?pasteId=${paste._id}`}>
                      {" "}
                      <svg
                        className="edit w-6 hover:edit"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M6.41421 15.89L16.5563 5.74785L15.1421 4.33363L5 14.4758V15.89H6.41421ZM7.24264 17.89H3V13.6473L14.435 2.21231C14.8256 1.82179 15.4587 1.82179 15.8492 2.21231L18.6777 5.04074C19.0682 5.43126 19.0682 6.06443 18.6777 6.45495L7.24264 17.89ZM3 19.89H21V21.89H3V19.89Z"></path>
                      </svg>{" "}
                    </NavLink>
                  </button>
                  <button>
                    <NavLink to={`/pastes/${paste._id}`}>
                      {" "}
                      <svg
                        className="w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12.0003 3C17.3924 3 21.8784 6.87976 22.8189 12C21.8784 17.1202 17.3924 21 12.0003 21C6.60812 21 2.12215 17.1202 1.18164 12C2.12215 6.87976 6.60812 3 12.0003 3ZM12.0003 19C16.2359 19 19.8603 16.052 20.7777 12C19.8603 7.94803 16.2359 5 12.0003 5C7.7646 5 4.14022 7.94803 3.22278 12C4.14022 16.052 7.7646 19 12.0003 19ZM12.0003 16.5C9.51498 16.5 7.50026 14.4853 7.50026 12C7.50026 9.51472 9.51498 7.5 12.0003 7.5C14.4855 7.5 16.5003 9.51472 16.5003 12C16.5003 14.4853 14.4855 16.5 12.0003 16.5ZM12.0003 14.5C13.381 14.5 14.5003 13.3807 14.5003 12C14.5003 10.6193 13.381 9.5 12.0003 9.5C10.6196 9.5 9.50026 10.6193 9.50026 12C9.50026 13.3807 10.6196 14.5 12.0003 14.5Z"></path>
                      </svg>{" "}
                    </NavLink>
                  </button>
                  <button onClick={() => handleCopy(paste)}>
                    {" "}
                    <svg
                      className="w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M6.9998 6V3C6.9998 2.44772 7.44752 2 7.9998 2H19.9998C20.5521 2 20.9998 2.44772 20.9998 3V17C20.9998 17.5523 20.5521 18 19.9998 18H16.9998V20.9991C16.9998 21.5519 16.5499 22 15.993 22H4.00666C3.45059 22 3 21.5554 3 20.9991L3.0026 7.00087C3.0027 6.44811 3.45264 6 4.00942 6H6.9998ZM5.00242 8L5.00019 20H14.9998V8H5.00242ZM8.9998 6H16.9998V16H18.9998V4H8.9998V6Z"></path>
                    </svg>{" "}
                  </button>
                  <button onClick={() => handleDelete(paste._id)}>
                    <svg
                      className="w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M7 4V2H17V4H22V6H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V6H2V4H7ZM6 6V20H18V6H6ZM9 9H11V17H9V9ZM13 9H15V17H13V9Z"></path>
                    </svg>
                  </button>
                  <button onClick={() => handleShare(paste)}>
                    {" "}
                    <svg
                      className="w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M13.1202 17.0228L8.92129 14.7324C8.19135 15.5125 7.15261 16 6 16C3.79086 16 2 14.2091 2 12C2 9.79086 3.79086 8 6 8C7.15255 8 8.19125 8.48746 8.92118 9.26746L13.1202 6.97713C13.0417 6.66441 13 6.33707 13 6C13 3.79086 14.7909 2 17 2C19.2091 2 21 3.79086 21 6C21 8.20914 19.2091 10 17 10C15.8474 10 14.8087 9.51251 14.0787 8.73246L9.87977 11.0228C9.9583 11.3355 10 11.6629 10 12C10 12.3371 9.95831 12.6644 9.87981 12.9771L14.0788 15.2675C14.8087 14.4875 15.8474 14 17 14C19.2091 14 21 15.7909 21 18C21 20.2091 19.2091 22 17 22C14.7909 22 13 20.2091 13 18C13 17.6629 13.0417 17.3355 13.1202 17.0228ZM6 14C7.10457 14 8 13.1046 8 12C8 10.8954 7.10457 10 6 10C4.89543 10 4 10.8954 4 12C4 13.1046 4.89543 14 6 14ZM17 8C18.1046 8 19 7.10457 19 6C19 4.89543 18.1046 4 17 4C15.8954 4 15 4.89543 15 6C15 7.10457 15.8954 8 17 8ZM17 20C18.1046 20 19 19.1046 19 18C19 16.8954 18.1046 16 17 16C15.8954 16 15 16.8954 15 18C15 19.1046 15.8954 20 17 20Z"></path>
                    </svg>{" "}
                  </button>
                </span>
              </div>
              <div className="">
                <div className="text-[#2D3031] dark:text-[#ffffff] sm:text-xl text-md transition-all duration-300">
                  {paste.description}
                </div>
                <div className="flex transition-all duration-300 justify-end sm:text-base text-xs text-[#713d3d] dark:text-[#918a8a] mt-1">{` Created at: ${paste.createdAt}`}</div>
              </div>
            </div>
          ))}
      </div>
      {allPastes.length > 3 && (
        <div className="flex justify-center">
          <button
            className="font-[silkScreen]  min-w-[30vw]  dark:bg-[#654A4E] dark:border-black border border-[#c5c5c5] sm:p-4 p-2 rounded-full text-center  bg-[#ffffff] transition-all duration-300 outline-none hover:outline-[#825a5a] mb-8"
            onClick={handleResetAll}
          >
            Reset All Notes!!!
          </button>
        </div>
      )}
    </div>
  );
}

export default Pastes;
