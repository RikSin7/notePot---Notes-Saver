import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { changeUsername } from "../redux/authSlice";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

function Menu({ handleLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [isChangingUsername, setIsChangingUsername] = useState(false);
  const dispatch = useDispatch();
  const menuRef = useRef(null); // Reference for the menu element
  const buttonRef = useRef(null); // Reference for the menu element

  // Toggle the menu when clicking on the button
  const handleMenu = () => {
    setIsOpen((prev) => !prev);
    setIsChangingUsername(false);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false); // Close menu if clicked outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  const handleInputToggle = () => {
    setIsChangingUsername((prev) => !prev);
  };

  const handleUsernameChange = () => {
    if (newUsername.trim()) {
      dispatch(changeUsername(newUsername));
      setNewUsername("");
      setIsOpen(false);
    } else toast.error("Enter new username!");
  };
  return (
    <div className="flex justify-end absolute sm:right-8 right-4  text-nowrap transition-transform duration-300 z-20">
      <button className="w-6" onClick={handleMenu} ref={buttonRef}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6"
        >
          <path d="M3 4H21V6H3V4ZM3 11H21V13H3V11ZM3 18H21V20H3V18Z"></path>
        </svg>
      </button>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.1 }}
          className="options fixed right-0 top-[56px] sm:top-[60px] rounded-l-lg px-4 py-4 flex flex-col items-start gap-3 dark:bg-[#2D3031]  sm:p-4 p-2 justify-center bg-[#F8EEEE] outline-none  sm:transition-bg sm:duration-300 sm:ease-in-out  transition-bg duration-300 dark:border-[#161616] border border-[#909090] "
          ref={menuRef}
        >
          {isChangingUsername && (
            <motion.div className="flex flex-col gap-2 items-center">
              <input
                type="text"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                placeholder="New username"
                className={` dark:bg-darkBg dark:border-[#c2bfbf] border border-[#5c5c5c] sm:p-2 p-2 sm:px-4 rounded-full flex-col justify-center bg-[#ffffff] outline-none sm:placeholder:text-sm placeholder:text-[#000000]  sm:transition-all sm:duration-300 sm:ease-in-out sm:hover:scale-[0.95] hover:scale-[0.95] active:duration-300 placeholder:text-xm transition-all duration-300 min-w-[15vw] placeholder:text-center text-center dark:placeholder:text-[#ffffff]`}
              />
              <button
                className="text-center  sm:hover:transition-colors hover:duration-300  active:text-[#8d5353] sm:hover:text-[#8d5353] active:duration-0 transition-bg duration-300"
                onClick={handleUsernameChange}
              >
                Change
              </button>
            </motion.div>
          )}
          <div className="flex gap-2 group">
            {!isChangingUsername ? (
              <span>
                <svg
                  className="sm:w-6 w-5 sm:hover:transition-bg hover:duration-300 rounded-full group-active:text-[#8d5353] group-active:duration-100 sm:group-hover:text-[#8d5353] group active:transition-bg"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M6.41421 15.89L16.5563 5.74785L15.1421 4.33363L5 14.4758V15.89H6.41421ZM7.24264 17.89H3V13.6473L14.435 2.21231C14.8256 1.82179 15.4587 1.82179 15.8492 2.21231L18.6777 5.04074C19.0682 5.43126 19.0682 6.06443 18.6777 6.45495L7.24264 17.89ZM3 19.89H21V21.89H3V19.89Z"></path>
                </svg>
              </span>
            ) : (
              <span>
                <svg
                  className="sm:w-6 w-5 sm:hover:transition-bg hover:duration-300 rounded-full group-active:text-[#8d5353] group-active:duration-100 sm:group-hover:text-[#8d5353] group active:transition-bg"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM12 10.5858L14.8284 7.75736L16.2426 9.17157L13.4142 12L16.2426 14.8284L14.8284 16.2426L12 13.4142L9.17157 16.2426L7.75736 14.8284L10.5858 12L7.75736 9.17157L9.17157 7.75736L12 10.5858Z"></path>
                </svg>
              </span>
            )}
            <button
              className="sm:hover:transition-bg hover:duration-300  rounded-full group-active:text-[#8d5353] group-active:duration-100 sm:group-hover:text-[#8d5353] group outline-none"
              onClick={handleInputToggle}
            >
              {isChangingUsername ? "Cancel changing" : "Change username"}
            </button>
          </div>
          <div className="flex gap-2 group">
            <svg
              className="sm:w-6 w-5 sm:hover:transition-bg hover:duration-300 rounded-full group-active:text-[#8d5353] group-active:duration-100 sm:group-hover:text-[#8d5353] group active:transition-bg"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              onClick={handleLogout}
            >
              <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C15.2713 2 18.1757 3.57078 20.0002 5.99923L17.2909 5.99931C15.8807 4.75499 14.0285 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C14.029 20 15.8816 19.2446 17.2919 17.9998L20.0009 17.9998C18.1765 20.4288 15.2717 22 12 22ZM19 16V13H11V11H19V8L24 12L19 16Z"></path>
            </svg>
            <button
              onClick={handleLogout}
              className="sm:w-6 w-5 sm:hover:transition-bg hover:duration-300 rounded-full group-active:text-[#8d5353] group-active:duration-100 sm:group-hover:text-[#8d5353] group active:transition-bg font-semibold"
            >
              Logout
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default Menu;
