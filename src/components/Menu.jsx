import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { changeUsername } from "../redux/authSlice";
import toast from "react-hot-toast";

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
    <div className="flex justify-end absolute sm:right-8 right-4  text-nowrap transition-transforduration-300">
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
        <div
          className="options fixed right-0 top-[57px] sm:top-[61px] rounded-l-lg px-4 py-4 flex flex-col items-start gap-3 dark:bg-[#121212] dark:border-black border-none sm:p-4 p-2 justify-center bg-[#F8EEEE] outline-none  sm:transition-bg sm:duration-300 sm:ease-in-out  transition-bg duration-300 shadow-lg dark:shadow-[#7c4545] shadow-[#7c4646]"
          ref={menuRef}
        >
          {isChangingUsername && (
            <div className="flex flex-col gap-2 items-center">
              <input
                type="text"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                placeholder="New username"
                className={`placeholder:font-[Quantico] dark:bg-darkBg dark:border-black border border-[#c5c5c5] sm:p-2 p-2 sm:px-4 rounded-full flex-col justify-center bg-inputBg  outline-none hover:outline-[#825a5a] sm:placeholder:text-sm placeholder:text-[#9e5959]  sm:transition-all sm:duration-300 sm:ease-in-out sm:hover:scale-[0.95] hover:scale-[0.95] active:duration-300 placeholder:text-[14px] transition-all duration-300 min-w-[15vw] placeholder:text-center`}
              />
              <button
                className="text-center font-[silkScreen] sm:hover:transition-colors hover:duration-300  active:text-[#8d5353] sm:hover:text-[#8d5353] active:duration-0 transition-bg duration-300"
                onClick={handleUsernameChange}
              >
                Change
              </button>
            </div>
          )}
          <div className="flex">
            <button
              className="sm:hover:transition-colors hover:duration-300  active:text-[#8d5353] sm:hover:text-[#8d5353] active:duration-0"
              onClick={handleInputToggle}
            >
              {isChangingUsername ? "Cancel changing" : "Change username"}
            </button>
          </div>
          <div className="flex gap-2 group">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 sm:hover:transition-bg hover:duration-300 font-semibold rounded-full group-active:text-[#8d5353] active:duration-0 sm:group-hover:text-[#8d5353] group active:transition-bg"
              onClick={handleLogout}
            >
              <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C15.2713 2 18.1757 3.57078 20.0002 5.99923L17.2909 5.99931C15.8807 4.75499 14.0285 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C14.029 20 15.8816 19.2446 17.2919 17.9998L20.0009 17.9998C18.1765 20.4288 15.2717 22 12 22ZM19 16V13H11V11H19V8L24 12L19 16Z"></path>
            </svg>
            <button
              onClick={handleLogout}
              className="sm:hover:transition-bg hover:duration-300 font-semibold rounded-full group-active:text-[#8d5353] active:duration-0 sm:group-hover:text-[#8d5353] group"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Menu;
