import { React } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from "../redux/darkModeSlice";
import { logout } from "../redux/authSlice";
import Menu from "./Menu";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleLogout = () => {
    const confirmed = window.confirm("Are you sure to logout?");
    if (confirmed) {
      console.log("logout called.");
      navigate("/login");
      dispatch(logout());
    }
  };

  return (
    <nav>
      {isAuthenticated && (
        <div className="flex justify-around bg-[#f8eeee] dark:bg-[#2D3031] rounded-md py-4 w-full absolute left-[50%] translate-x-[-50%] text-black dark:text-white transition-colors duration-300">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `hover:transition-colors hover:duration-300 font-semibold ${
                isActive
                  ? "text-[#8d5353] underline"
                  : "hover:text-[#8d5353] rounded-full"
              }`
            }
          >
            Home
          </NavLink>

          {/* Toggle button for Dark Mode */}
          <button
            className="bg-[#e1e1e1] dark:bg-gray-700 rounded-full p-1"
            onClick={() => dispatch(toggleDarkMode())}
          >
            {isDarkMode ? (
              <svg
                className="w-4 h-4 md:w-5 md:h-5 rotate-90 transition-transform duration-300"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 18C8.68629 18 6 15.3137 6 12C6 8.68629 8.68629 6 12 6C15.3137 6 18 8.68629 18 12C18 15.3137 15.3137 18 12 18ZM11 1H13V4H11V1ZM11 20H13V23H11V20ZM3.51472 4.92893L4.92893 3.51472L7.05025 5.63604L5.63604 7.05025L3.51472 4.92893ZM16.9497 18.364L18.364 16.9497L20.4853 19.0711L19.0711 20.4853L16.9497 18.364ZM19.0711 3.51472L20.4853 4.92893L18.364 7.05025L16.9497 5.63604L19.0711 3.51472ZM5.63604 16.9497L7.05025 18.364L4.92893 20.4853L3.51472 19.0711L5.63604 16.9497ZM23 11V13H20V11H23ZM4 11V13H1V11H4Z"></path>
              </svg>
            ) : (
              <svg
                className="w-4 h-4 md:w-5 md:h-5 rotate-0 transition-transform duration-300"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M11.3807 2.01886C9.91573 3.38768 9 5.3369 9 7.49999C9 11.6421 12.3579 15 16.5 15C18.6631 15 20.6123 14.0843 21.9811 12.6193C21.6613 17.8537 17.3149 22 12 22C6.47715 22 2 17.5228 2 12C2 6.68514 6.14629 2.33869 11.3807 2.01886Z"></path>
              </svg>
            )}
          </button>

          <NavLink
            to="/pastes"
            className={({ isActive }) =>
              `hover:transition-colors hover:duration-300 font-semibold ${
                isActive
                  ? "text-[#8d5353] underline"
                  : "hover:text-[#8d5353] rounded-full"
              }`
            }
          >
            Notes
          </NavLink>

          <NavLink
            to="/todoinput"
            className={({ isActive }) =>
              `hover:transition-colors hover:duration-300 font-semibold mr-12 ${
                isActive
                  ? "text-[#8d5353] underline"
                  : "hover:text-[#8d5353] rounded-full"
              }`
            }
          >
            To-Dos
          </NavLink>

          <Menu handleLogout={handleLogout} />
        </div>
      )}
    </nav>
  );
}

export default Navbar;
