import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login, resetPassword, signup } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import CanvasEffect from "../CanvasSpiderWebEffect";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isSignup, setIsSignup] = useState(false); // Toggle between login and signup
  const [isReset, setIsReset] = useState(false); // New state for resetting password
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleLogin = () => {
    if (!username.trim() || !password.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }

    const user = { username, password }; // User input for login

    try {
      dispatch(login(user)); // Try to log in
      navigate("/"); // Redirect to home page after successful login
    } catch (error) {
      toast.error(error.message); // Show error message for invalid credentials
    }
  };

  const handleSignup = () => {
    if (!username.trim() || !password.trim() || !email.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }

    // Check if the email already exists
    const existingUser = JSON.parse(localStorage.getItem("user"));

    if (existingUser && existingUser.email === email) {
      toast.error("User already exists. Please log in.");
      return;
    }

    const user = { username, password, email }; // New user data
    dispatch(signup(user)); // Dispatch signup action
    navigate("/"); // Redirect to home page after signup
  };

  const handleReset = () => {
    if (!email.trim() || !newPassword.trim()) {
      toast.error("Please fill in all fields."); // Notify user to fill fields
      return;
    }
    try {
      dispatch(resetPassword({ email, newPassword }));
      toast.success("Password reset successfully!");
      setIsReset(false); // Reset state after successful password reset
    } catch (error) {
      toast.error(error.message); // Notify user of any errors
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full min-h-screen justify-center items-center bg-[#d5b9b9] dark:bg-[#1B1C1E] z-[99]">
      <CanvasEffect />
      <div className="font-[rancho] flex-col md:text-4xl sm:text-3xl xss:text-md text-2xl flex justify-center text-center text-[#ffffff] dark:text-[#646464] py-2 sm:py-4 transition-all duration-300">
        <h1>Write Awsm Notes, TO-DOs</h1>
      </div>

      {/* Conditional Rendering based on isReset, isSignup state */}
      {isReset ? (
        <>
          <div className="flex justify-center items-center  dark:bg-[#121212]  bg-[#F9ECE8] outline-none hover:outline-[#825a5a] sm:transition-all sm:duration-300 sm:ease-in-out sm:hover:scale-[0.95] hover:scale-[0.95]  transition-all duration-300 w-[70vw] sm:w-[500px] rounded-full gap-1 px-4">
            <span>
              <svg
                className="sm:w-6 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3ZM20 7.23792L12.0718 14.338L4 7.21594V19H20V7.23792ZM4.51146 5L12.0619 11.662L19.501 5H4.51146Z"></path>
              </svg>
            </span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Registered e-mail address"
              className={`dark:bg-transparent bg-transparent outline-none  sm:placeholder:text-base placeholder:text-[#9e5959]  w-full sm:py-4 py-3 xs:py-2 rounded-full`}
              required
            />
          </div>
          <div className="flex justify-center items-center  dark:bg-[#121212]  bg-[#F9ECE8] outline-none hover:outline-[#825a5a] sm:transition-all sm:duration-300 sm:ease-in-out sm:hover:scale-[0.95] hover:scale-[0.95]  transition-all duration-300 w-[70vw] sm:w-[500px] rounded-full gap-1 px-4">
            <span>
              <svg
                className="sm:w-6 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M18 8H20C20.5523 8 21 8.44772 21 9V21C21 21.5523 20.5523 22 20 22H4C3.44772 22 3 21.5523 3 21V9C3 8.44772 3.44772 8 4 8H6V7C6 3.68629 8.68629 1 12 1C15.3137 1 18 3.68629 18 7V8ZM5 10V20H19V10H5ZM11 14H13V16H11V14ZM7 14H9V16H7V14ZM15 14H17V16H15V14ZM16 8V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V8H16Z"></path>
              </svg>
            </span>
            <input
              type={showPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New password"
              className="dark:bg-transparent bg-transparent outline-none  sm:placeholder:text-base placeholder:text-[#9e5959]  w-full sm:py-4 py-3 xs:py-2 rounded-full"
              required
            />
            <div onClick={toggleShowPassword}>
              {!showPassword ? (
                <span>
                  <svg
                    className="sm:w-6 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12.0003 3C17.3924 3 21.8784 6.87976 22.8189 12C21.8784 17.1202 17.3924 21 12.0003 21C6.60812 21 2.12215 17.1202 1.18164 12C2.12215 6.87976 6.60812 3 12.0003 3ZM12.0003 19C16.2359 19 19.8603 16.052 20.7777 12C19.8603 7.94803 16.2359 5 12.0003 5C7.7646 5 4.14022 7.94803 3.22278 12C4.14022 16.052 7.7646 19 12.0003 19ZM12.0003 16.5C9.51498 16.5 7.50026 14.4853 7.50026 12C7.50026 9.51472 9.51498 7.5 12.0003 7.5C14.4855 7.5 16.5003 9.51472 16.5003 12C16.5003 14.4853 14.4855 16.5 12.0003 16.5ZM12.0003 14.5C13.381 14.5 14.5003 13.3807 14.5003 12C14.5003 10.6193 13.381 9.5 12.0003 9.5C10.6196 9.5 9.50026 10.6193 9.50026 12C9.50026 13.3807 10.6196 14.5 12.0003 14.5Z"></path>
                  </svg>
                </span>
              ) : (
                <svg
                  className="sm:w-6 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17.8827 19.2968C16.1814 20.3755 14.1638 21.0002 12.0003 21.0002C6.60812 21.0002 2.12215 17.1204 1.18164 12.0002C1.61832 9.62282 2.81932 7.5129 4.52047 5.93457L1.39366 2.80777L2.80788 1.39355L22.6069 21.1925L21.1927 22.6068L17.8827 19.2968ZM5.9356 7.3497C4.60673 8.56015 3.6378 10.1672 3.22278 12.0002C4.14022 16.0521 7.7646 19.0002 12.0003 19.0002C13.5997 19.0002 15.112 18.5798 16.4243 17.8384L14.396 15.8101C13.7023 16.2472 12.8808 16.5002 12.0003 16.5002C9.51498 16.5002 7.50026 14.4854 7.50026 12.0002C7.50026 11.1196 7.75317 10.2981 8.19031 9.60442L5.9356 7.3497ZM12.9139 14.328L9.67246 11.0866C9.5613 11.3696 9.50026 11.6777 9.50026 12.0002C9.50026 13.3809 10.6196 14.5002 12.0003 14.5002C12.3227 14.5002 12.6309 14.4391 12.9139 14.328ZM20.8068 16.5925L19.376 15.1617C20.0319 14.2268 20.5154 13.1586 20.7777 12.0002C19.8603 7.94818 16.2359 5.00016 12.0003 5.00016C11.1544 5.00016 10.3329 5.11773 9.55249 5.33818L7.97446 3.76015C9.22127 3.26959 10.5793 3.00016 12.0003 3.00016C17.3924 3.00016 21.8784 6.87992 22.8189 12.0002C22.5067 13.6998 21.8038 15.2628 20.8068 16.5925ZM11.7229 7.50857C11.8146 7.50299 11.9071 7.50016 12.0003 7.50016C14.4855 7.50016 16.5003 9.51488 16.5003 12.0002C16.5003 12.0933 16.4974 12.1858 16.4919 12.2775L11.7229 7.50857Z"></path>
                </svg>
              )}
            </div>
          </div>
          <div className="flex  flex-col sm:w-[500px]  w-[70vw] gap-2 ">
            <span className="flex  text-center dark:bg-[#3b466b] dark:border-black border-none rounded-full justify-center  bg-[#965f5f] outline-none  sm:transition-all sm:duration-300 sm:ease-in-out sm:hover:scale-[0.95] sm:active:scale-[1.05] active:scale-[1.08] active:duration-300 transition-all duration-300 gap-0 mt-4 dark:hover:outline-[#7588ae] hover:outline-[#825a5a] text-white px-4">
              <svg
                className="sm:w-6 w-5 shrink-0"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM16.8201 17.0761C18.1628 15.8007 19 13.9981 19 12C19 8.13401 15.866 5 12 5C10.9391 5 9.9334 5.23599 9.03241 5.65834L10.0072 7.41292C10.6177 7.14729 11.2917 7 12 7C14.7614 7 17 9.23858 17 12H14L16.8201 17.0761ZM14.9676 18.3417L13.9928 16.5871C13.3823 16.8527 12.7083 17 12 17C9.23858 17 7 14.7614 7 12H10L7.17993 6.92387C5.83719 8.19929 5 10.0019 5 12C5 15.866 8.13401 19 12 19C13.0609 19 14.0666 18.764 14.9676 18.3417Z"></path>
              </svg>

              <button
                onClick={handleReset}
                className="text-center sm:p-4 p-3 xs:py-2 rounded-full justify-center  bg-transparent outline-none sm:transition-all sm:duration-300 sm:ease-in-out sm:hover:scale-[0.95] sm:active:scale-[1.05] active:scale-[1.08] active:duration-300 transition-all duration-300 dark:bg-transparent"
              >
                Reset Password
              </button>
            </span>
            <span className="flex text-center dark:bg-[#3b466b] dark:border-black border-none rounded-full justify-center  bg-[#965f5f] outline-none  sm:transition-all sm:duration-300 sm:ease-in-out sm:hover:scale-[0.95] sm:active:scale-[1.05] active:scale-[1.08] active:duration-300 transition-all duration-300 gap-0 dark:hover:outline-[#7588ae]  hover:outline-[#825a5 text-white px-4">
              <svg
                className="sm:w-6 w-5 shrink-0"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2C17.52 2 22 6.48 22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2ZM12 11V8L8 12L12 16V13H16V11H12Z"></path>
              </svg>
              <button
                onClick={() => setIsReset(false)}
                className="text-center sm:p-4 p-3 xs:py-2 rounded-full justify-center  bg-transparent outline-none sm:transition-all sm:duration-300 sm:ease-in-out sm:hover:scale-[0.95] sm:active:scale-[1.05] active:scale-[1.08] active:duration-300 transition-all duration-300 dark:bg-transparent"
              >
                Back to Login
              </button>
            </span>
          </div>
        </>
      ) : (
        <>
          <div className="flex justify-center items-center  dark:bg-[#121212]  bg-[#F9ECE8] outline-none hover:outline-[#825a5a] sm:transition-all sm:duration-300 sm:ease-in-out sm:hover:scale-[0.95] hover:scale-[0.95]  transition-all duration-300 w-[70vw] sm:w-[500px] rounded-full  border-none  gap-1 px-4">
            <span>
              <svg
                className="sm:w-6 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M4 22C4 17.5817 7.58172 14 12 14C16.4183 14 20 17.5817 20 22H18C18 18.6863 15.3137 16 12 16C8.68629 16 6 18.6863 6 22H4ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM12 11C14.21 11 16 9.21 16 7C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7C8 9.21 9.79 11 12 11Z"></path>
              </svg>
            </span>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className=" dark:bg-transparent bg-transparent outline-none  sm:placeholder:text-base placeholder:text-[#9e5959]  w-full sm:py-4 py-3 xs:py-2 rounded-full"
              required
            />
          </div>
          <div className="flex justify-center items-center  dark:bg-[#121212]  bg-[#F9ECE8] outline-none hover:outline-[#825a5a] sm:transition-all sm:duration-300 sm:ease-in-out sm:hover:scale-[0.95] hover:scale-[0.95]  transition-all duration-300 w-[70vw] sm:w-[500px] rounded-full gap-1 px-4">
            <span>
              <svg
                className="sm:w-6 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M18 8H20C20.5523 8 21 8.44772 21 9V21C21 21.5523 20.5523 22 20 22H4C3.44772 22 3 21.5523 3 21V9C3 8.44772 3.44772 8 4 8H6V7C6 3.68629 8.68629 1 12 1C15.3137 1 18 3.68629 18 7V8ZM5 10V20H19V10H5ZM11 14H13V16H11V14ZM7 14H9V16H7V14ZM15 14H17V16H15V14ZM16 8V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V8H16Z"></path>
              </svg>
            </span>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="dark:bg-transparent bg-transparent outline-none  sm:placeholder:text-base placeholder:text-[#9e5959]  w-full sm:py-4 py-3 xs:py-2 rounded-full"
              required
            />
            <div onClick={toggleShowPassword}>
              {!showPassword ? (
                <span>
                  <svg
                    className="sm:w-6 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12.0003 3C17.3924 3 21.8784 6.87976 22.8189 12C21.8784 17.1202 17.3924 21 12.0003 21C6.60812 21 2.12215 17.1202 1.18164 12C2.12215 6.87976 6.60812 3 12.0003 3ZM12.0003 19C16.2359 19 19.8603 16.052 20.7777 12C19.8603 7.94803 16.2359 5 12.0003 5C7.7646 5 4.14022 7.94803 3.22278 12C4.14022 16.052 7.7646 19 12.0003 19ZM12.0003 16.5C9.51498 16.5 7.50026 14.4853 7.50026 12C7.50026 9.51472 9.51498 7.5 12.0003 7.5C14.4855 7.5 16.5003 9.51472 16.5003 12C16.5003 14.4853 14.4855 16.5 12.0003 16.5ZM12.0003 14.5C13.381 14.5 14.5003 13.3807 14.5003 12C14.5003 10.6193 13.381 9.5 12.0003 9.5C10.6196 9.5 9.50026 10.6193 9.50026 12C9.50026 13.3807 10.6196 14.5 12.0003 14.5Z"></path>
                  </svg>
                </span>
              ) : (
                <svg
                  className="sm:w-6 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17.8827 19.2968C16.1814 20.3755 14.1638 21.0002 12.0003 21.0002C6.60812 21.0002 2.12215 17.1204 1.18164 12.0002C1.61832 9.62282 2.81932 7.5129 4.52047 5.93457L1.39366 2.80777L2.80788 1.39355L22.6069 21.1925L21.1927 22.6068L17.8827 19.2968ZM5.9356 7.3497C4.60673 8.56015 3.6378 10.1672 3.22278 12.0002C4.14022 16.0521 7.7646 19.0002 12.0003 19.0002C13.5997 19.0002 15.112 18.5798 16.4243 17.8384L14.396 15.8101C13.7023 16.2472 12.8808 16.5002 12.0003 16.5002C9.51498 16.5002 7.50026 14.4854 7.50026 12.0002C7.50026 11.1196 7.75317 10.2981 8.19031 9.60442L5.9356 7.3497ZM12.9139 14.328L9.67246 11.0866C9.5613 11.3696 9.50026 11.6777 9.50026 12.0002C9.50026 13.3809 10.6196 14.5002 12.0003 14.5002C12.3227 14.5002 12.6309 14.4391 12.9139 14.328ZM20.8068 16.5925L19.376 15.1617C20.0319 14.2268 20.5154 13.1586 20.7777 12.0002C19.8603 7.94818 16.2359 5.00016 12.0003 5.00016C11.1544 5.00016 10.3329 5.11773 9.55249 5.33818L7.97446 3.76015C9.22127 3.26959 10.5793 3.00016 12.0003 3.00016C17.3924 3.00016 21.8784 6.87992 22.8189 12.0002C22.5067 13.6998 21.8038 15.2628 20.8068 16.5925ZM11.7229 7.50857C11.8146 7.50299 11.9071 7.50016 12.0003 7.50016C14.4855 7.50016 16.5003 9.51488 16.5003 12.0002C16.5003 12.0933 16.4974 12.1858 16.4919 12.2775L11.7229 7.50857Z"></path>
                </svg>
              )}
            </div>
          </div>
          {isSignup && (
            <div className="flex justify-center items-center  dark:bg-[#121212]  bg-[#F9ECE8] outline-none hover:outline-[#825a5a] sm:transition-all sm:duration-300 sm:ease-in-out sm:hover:scale-[0.95] hover:scale-[0.95]  transition-all duration-300 w-[70vw] sm:w-[500px] rounded-full gap-1 px-4">
              <span>
                <svg
                  className="sm:w-6 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3ZM20 7.23792L12.0718 14.338L4 7.21594V19H20V7.23792ZM4.51146 5L12.0619 11.662L19.501 5H4.51146Z"></path>
                </svg>
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-mail address"
                className={`dark:bg-transparent bg-transparent outline-none  sm:placeholder:text-base placeholder:text-[#9e5959]  w-full sm:py-4 py-3 xs:py-2 rounded-full`}
                required
              />
            </div>
          )}
          <button
            onClick={isSignup ? handleSignup : handleLogin}
            className="sm:w-[500px] text-center dark:bg-[#3b466b] sm:py-4 py-3 xs:py-2 rounded-full justify-center bg-[#965f5f] outline-none dark:hover:outline-[#7588ae] hover:outline-[#825a5a]  sm:transition-all sm:duration-300 sm:ease-in-out sm:hover:scale-[0.95] sm:active:scale-[1.05] active:scale-[1.08] active:duration-300 transition-all duration-300 w-[70vw] mt-4 text-white"
          >
            {isSignup ? "Sign Up" : "Login"}
          </button>
        </>
      )}
      {!isReset && (
        <div className="flex gap-2 sm:min-w-[500px] w-[70vw] flex-wrap justify-center items-center text-sm sm:text-base mt-2 flex-col">
          {/* <div> */}
          <h1 className="text-center">
            {isSignup ? "Already have an account?" : "Don't have an account?"}
          </h1>
          {/* <div className="border border-black dark:border-white mt-2"> </div> */}
          {/* </div> */}
          <div className="w- flex flex-col">
            <button
              onClick={() => setIsSignup(!isSignup)}
              className="text-[#954444] dark:text-[#ad5e5e] font-semibold bg-transparent p-4"
            >
              {isSignup ? "Login" : "Sign Up"}
            </button>
            <div className="border border-[#954444] dark:[#ad5e5e] mt-2"> </div>
          </div>
          <div>
            <button
              onClick={() => setIsReset(true)}
              className="text-[#000000] dark:text-[#ffffff]"
            >
              Forgot Password?
            </button>
            {/* <div className="border border-black dark:border-white mt-2"> </div> */}
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
