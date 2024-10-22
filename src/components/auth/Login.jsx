import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login, resetPassword, signup } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isSignup, setIsSignup] = useState(false); // Toggle between login and signup
  const [isReset, setIsReset] = useState(false); // New state for resetting password
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!username.trim() || !password.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }

    const user = { username, password }; // User input for login

    try {
      console.log("login called");
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
    <div className="flex flex-col gap-2 w-full min-h-screen justify-center items-center bg-[#d5b9b9] dark:bg-[#1B1C1E]">
      <div className="font-[rancho] flex-col md:text-7xl text-4xl flex justify-center text-center text-[#ffffff] dark:text-[#646464] py-2 sm:py-4 transition-all duration-300">
        <h1>Write Awsm Notes, TO-DOs</h1>
      </div>

      {/* Conditional Rendering based on isReset, isSignup state */}
      {isReset ? (
        <>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your registered email id"
            className=" sm:w-[30vw] dark:bg-[#121212] dark:border-black border border-[#c5c5c5] sm:p-4 p-3 rounded-full flex-col justify-center bg-[#F9ECE8] outline-none hover:outline-[#825a5a] sm:placeholder:text-base placeholder:text-[#9e5959] sm:transition-all sm:duration-300 sm:ease-in-out sm:transform sm:hover:scale-[0.95] hover:scale-[0.95] active:duration-300 placeholder:text-[16px] transition-all duration-300 w-2/3"
            required
          />
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="New password"
            className=" sm:w-[30vw] dark:bg-[#121212] dark:border-black border border-[#c5c5c5] sm:p-4 p-3 rounded-full flex-col justify-center bg-[#F9ECE8] outline-none hover:outline-[#825a5a] sm:placeholder:text-base placeholder:text-[#9e5959] relative z-10 sm:transition-all sm:duration-300 sm:ease-in-out sm:transform sm:hover:scale-[0.95] hover:scale-[0.95] active:duration-300 placeholder:text-[16px] transition-all duration-300 w-2/3"
            required
          />
          <div className="flex  flex-col sm:w-[30vw]  w-2/3 gap-2 ">
            <span className="flex  text-center dark:bg-[#3b466b] dark:border-black border-none rounded-full justify-center font-[silkScreen] bg-[#965f5f] outline-none  sm:transition-all sm:duration-300 sm:ease-in-out sm:transform sm:hover:scale-[0.95] sm:active:scale-[1.05] active:scale-[1.08] active:duration-300 transition-all duration-300 gap-0 mt-4 dark:hover:outline-[#7588ae] hover:outline-[#825a5a] text-white">
              <svg
                className="sm:w-6 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM16.8201 17.0761C18.1628 15.8007 19 13.9981 19 12C19 8.13401 15.866 5 12 5C10.9391 5 9.9334 5.23599 9.03241 5.65834L10.0072 7.41292C10.6177 7.14729 11.2917 7 12 7C14.7614 7 17 9.23858 17 12H14L16.8201 17.0761ZM14.9676 18.3417L13.9928 16.5871C13.3823 16.8527 12.7083 17 12 17C9.23858 17 7 14.7614 7 12H10L7.17993 6.92387C5.83719 8.19929 5 10.0019 5 12C5 15.866 8.13401 19 12 19C13.0609 19 14.0666 18.764 14.9676 18.3417Z"></path>
              </svg>

              <button
                onClick={handleReset}
                className="text-center  dark:border-black border-none sm:p-4 p-2 rounded-full justify-center font-[silkScreen] bg-[#965f5f] outline-none sm:transition-all sm:duration-300 sm:ease-in-out sm:transform sm:hover:scale-[0.95] sm:active:scale-[1.05] active:scale-[1.08] active:duration-300 transition-all duration-300 dark:bg-[#3b466b]"
              >
                Reset Password
              </button>
            </span>
            <span className="flex text-center dark:bg-[#3b466b] dark:border-black border-none rounded-full justify-center font-[silkScreen] bg-[#965f5f] outline-none  sm:transition-all sm:duration-300 sm:ease-in-out sm:transform sm:hover:scale-[0.95] sm:active:scale-[1.05] active:scale-[1.08] active:duration-300 transition-all duration-300 gap-0 dark:hover:outline-[#7588ae]  hover:outline-[#825a5 text-white">
              <svg
                className="sm:w-6 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2C17.52 2 22 6.48 22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2ZM12 11V8L8 12L12 16V13H16V11H12Z"></path>
              </svg>
              <button
                onClick={() => setIsReset(false)}
                className=" text-center  dark:border-black border-none sm:p-4 p-2 rounded-full justify-center font-[silkScreen] bg-[#965f5f]outline-none sm:transition-all sm:duration-300 sm:ease-in-out sm:transform sm:hover:scale-[0.95] sm:active:scale-[1.05] active:scale-[1.08] active:duration-300 transition-all duration-300 dark:bg-[#3b466b]"
              >
                Back to Login
              </button>
            </span>
          </div>
        </>
      ) : (
        <>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="sm:w-[30vw] dark:bg-[#121212] dark:border-black border border-[#c5c5c5] sm:p-4 p-3 rounded-full flex-col justify-center bg-[#F9ECE8] outline-none hover:outline-[#825a5a] sm:placeholder:text-base placeholder:text-[#9e5959] sm:transition-all sm:duration-300 sm:ease-in-out sm:transform sm:hover:scale-[0.95] hover:scale-[0.95] active:duration-300 placeholder:text-[16px] transition-all duration-300 w-2/3 "
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="sm:w-[30vw] dark:bg-[#121212] dark:border-black border border-[#c5c5c5] sm:p-4 p-3 rounded-full flex-col justify-center bg-[#F9ECE8] outline-none hover:outline-[#825a5a] sm:placeholder:text-base placeholder:text-[#9e5959] sm:transition-all sm:duration-300 sm:ease-in-out sm:transform sm:hover:scale-[0.95] hover:scale-[0.95] active:duration-300 placeholder:text-[16px] transition-all duration-300 w-2/3 "
            required
          />
          {isSignup && (
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your e-mail address"
              className={`sm:w-[30vw] dark:bg-[#121212] dark:border-black border border-[#c5c5c5] sm:p-4 p-3 rounded-full flex-col justify-center bg-[#F9ECE8] outline-none hover:outline-[#825a5a] sm:placeholder:text-base placeholder:text-[#9e5959] sm:transition-all sm:duration-300 sm:ease-in-out sm:transform sm:hover:scale-[0.95] hover:scale-[0.95] active:duration-300 placeholder:text-[16px] transition-all duration-300 w-2/3`}
              required
            />
          )}
          <button
            onClick={isSignup ? handleSignup : handleLogin}
            className="sm:w-[30vw] text-center dark:bg-[#3b466b] dark:border-black border-none sm:p-4 p-2 rounded-full justify-center font-[silkScreen] bg-[#965f5f] outline-none dark:hover:outline-[#7588ae] hover:outline-[#825a5a]  sm:transition-all sm:duration-300 sm:ease-in-out sm:transform sm:hover:scale-[0.95] sm:active:scale-[1.05] active:scale-[1.08] active:duration-300 transition-all duration-300 w-2/3 mt-4 text-white"
          >
            {isSignup ? "Sign Up" : "Login"}
          </button>
        </>
      )}
      {!isReset && (
        <div className="flex gap-2 sm:min-w-[30vw] w-2/3 flex-wrap justify-center">
          <h1>{isSignup ? "Already have an account?" : "New user?"}</h1>
          <button
            onClick={() => setIsSignup(!isSignup)}
            className="text-[#5486d3] dark:text-[#75a0df] font-semibold"
          >
            {isSignup ? "Login" : "Sign Up"}
          </button>
          <button
            onClick={() => setIsReset(true)}
            className="text-[#3a64a3] dark:text-[#6a7ece]"
          >
            Forgot Password?
          </button>
        </div>
      )}
    </div>
  );
}

export default Login;
