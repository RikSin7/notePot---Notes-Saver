import { useEffect, useRef, useState } from "react";
import TodoTasks from "./TodoTasks";
import { useSearchParams } from "react-router-dom";
import { addToTodo, updateToTodo } from "../redux/todoSlice";
import { useDispatch, useSelector } from "react-redux";
import Timer from "./Timer";
import Login from "./auth/Login";

function TodoInput() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [title, setTitle] = useState("");
  const [searchParams, setSearchParams] = useSearchParams({});
  const allTodos = useSelector((state) => state.todo.todos);
  const todoId = searchParams.get("todoId");
  const dispatch = useDispatch();
  const [inputHighlight, setInputHightlight] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [quote, setQuote] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [searchTerm, debouncedSearchTerm]);

  useEffect(() => {
    if (todoId) {
      const todoToEdit = allTodos.find((todo) => todo._id === todoId);
      if (todoToEdit) {
        setTitle(todoToEdit.title);
      }
    }
  }, [todoId, allTodos]);

  const inputRef = useRef(null);

  const createTodo = () => {
    // Check if a todo with the same title already exists
    const duplicateTodo = allTodos.find(
      (todo) => todo.title.trim().toLowerCase() === title.trim().toLowerCase()
    );

    if (duplicateTodo && !todoId) {
      // If a duplicate is found and we are not editing (todoId is null), show an alert or toast
      dispatch(addToTodo(duplicateTodo));
      return;
    }
    const todo = {
      title: title,
      _id: todoId || Date.now().toString(36),
      createdAt: new Date().toLocaleString("en-IN", {
        // "en-IN" : Specifies the locale (English as spoken in India).
        timeZone: "Asia/Kolkata", //Time zone for india
        hour12: true, // Use 12-hour format, set to false for 24-hour format
      }),
      completed: false,
      pinned: false,
    };
    todoId ? dispatch(updateToTodo(todo)) : dispatch(addToTodo(todo));
    if (todo.title.trim()) {
      setTitle("");
      setSearchParams({});
    }
  };

  const handleTimer = () => {
    setIsRunning((prev) => !prev);
  };

  //progress calculation
  let completedTasks = 0;
  allTodos.forEach((todo) => {
    if (todo.completed) {
      completedTasks += 1;
    }
  });

  const totalTasks = allTodos.length;
  const progressPercentage =
    totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;

  useEffect(() => {
    const randomNumber = Math.floor(Math.random() * 5);
    const quotes = [
      "Some well-deserved rest is earned, Champ! 🏆",
      "Great effort! Now, treat yourself! You deserve it! 🎉",
      "One step closer to greatness! Keep crushing! 💪",
      "No task is too big—keep winning! 🏅",
      "You're on top of your game! You're unstoppable! ⚡",
    ];

    setQuote(quotes[randomNumber]);
  }, [progressPercentage]);

  return (
    <>
      {isAuthenticated ? (
        <div className="flex flex-col items-center mt-16 px-4 w-[98vw]">
          <form
            className="todoInput flex sm:flex-row flex-col mt-6 rounded-md w-[98vw] gap-4"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="text"
              value={title}
              ref={inputRef}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What's the plan today?"
              className={` min-w-[30vw]  dark:bg-[#121212] dark:border-black border border-[#c5c5c5] sm:p-4 p-2 rounded-full flex-col justify-center bg-inputBg  outline-none hover:outline-[#825a5a] sm:placeholder:text-base placeholder:text-[#9e5959]  sm:transition-all sm:duration-300 sm:ease-in-out sm:transform sm:hover:scale-[0.98] hover:scale-[0.95] active:duration-300 placeholder:text-[14px] transition-all duration-300 w-full
    ${
      inputHighlight
        ? "transition-all duration-1000  scale-[1.03] outline-[#825a5a] bg-white dark:bg-[#212121]"
        : "transition-all duration-300  border border-[#292929]"
    }`}
            />
            <button
              className="min-w-[30vw] text-center dark:bg-[#121212] dark:border-black border-none sm:p-4 p-2 rounded-full justify-center  bg-inputBg  outline-none hover:outline-[#825a5a]  sm:transition-all sm:duration-300 sm:ease-in-out sm:hover:scale-[0.95] hover:scale-[0.95] sm:active:scale-[1.05] active:scale-[1.08] active:duration-300  transition-all duration-300"
              onClick={createTodo}
            >
              {todoId ? "Update To-do" : "Create To-do"}
            </button>
          </form>
          <div className="input mt-2 flex justify-center w-full">
            <input
              type="text"
              placeholder="Search My To-do..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className=" min-w-[30vw]  dark:bg-[#121212] dark:border-black border border-[#c5c5c5] sm:p-4 p-2 rounded-full my-4 mt-6 justify-center placeholder:text-center text-center  bg-inputBg  outline-none hover:outline-[#825a5a] sm:placeholder:text-base placeholder:text-[#9e5959]   sm:transition-all sm:duration-300 sm:ease-in-out sm:transform sm:hover:scale-[0.95] hover:scale-[0.90] active:duration-300 placeholder:text-[14px] transition-all duration-300"
            />
          </div>
          {!isRunning ? (
            <div className="flex mt-4 w-[98vw] justify-around rounded-md dark:bg-bgInDark bg-[#654A4E] transition-all duration-300 border border-black items-center">
              <h1 className="text-[#ffffff] dark:text-[#646464] md:text-5xl text-3xl font-semibold transition-all duration-300  md:py-4 py-2 px-2 gap-2 font-[rancho]">
                My To-Dos
              </h1>
              <div
                className="flex justify-center items-center cursor-pointer font-[quantico] text-lg sm:text-2xl text-[#ffffff] dark:text-[#646464] transition-all duration-300 md:py-4 py-2 px-2 gap-1 font-bold"
                onClick={handleTimer}
              >
                ST
                <svg
                  className="w-6 sm:w-8 "
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12H4C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C9.25022 4 6.82447 5.38734 5.38451 7.50024L8 7.5V9.5H2V3.5H4L3.99989 5.99918C5.82434 3.57075 8.72873 2 12 2ZM13 7L12.9998 11.585L16.2426 14.8284L14.8284 16.2426L10.9998 12.413L11 7H13Z"></path>
                </svg>
                PWatch
                {/* {isRunning && <Timer />} */}
              </div>
            </div>
          ) : (
            <div className="flex mt-4 w-[98vw] justify-around rounded-md dark:bg-bgInDark bg-[#654A4E] transition-all duration-300 border border-black  md:py-8 py-2 px-2 items-center">
              <Timer />
              <h1
                className="text-[#ffffff] dark:text-[#646464] md:text-5xl text-3xl font-semibold transition-all duration-300  md:py-4 py-2 px-2 gap-2 font-[rancho] cursor-pointer "
                onClick={handleTimer}
              >
                My To-Dos
              </h1>
            </div>
          )}
          {allTodos.length > 0 && (
            <div className="flex mt-8 w-[98vw] dark:bg-[#121212] bg-[#654A4E] transition-all duration-300 sm:h-8 h-6 rounded-full">
              <span
                className={`h-full  ${
                  completedTasks === totalTasks
                    ? "bg-transparent"
                    : "dark:bg-[#3e5842] bg-[#ffffff]"
                } transition-all duration-300 flex items-center  rounded-full`}
                style={{ width: `${progressPercentage}%` }}
              >
                <h1
                  className={`px-2 text-sm xss:text-[13px] text-nowrap transition-all duration-300 ${
                    completedTasks === 0 ? "text-[#ffffff]" : "text-black"
                  }  ${
                    completedTasks === totalTasks
                      ? "dark:text-[#ffffff] text-white"
                      : "dark:text-[#ffffff]"
                  }`}
                >
                  {completedTasks}/{totalTasks}{" "}
                  {completedTasks === totalTasks ? `${quote}` : "Completed."}
                </h1>
              </span>
            </div>
          )}

          <TodoTasks
            debouncedSearchTerm={debouncedSearchTerm}
            allTodos={allTodos}
            setSearchParams={setSearchParams}
            inputRef={inputRef}
            setInputHightlight={setInputHightlight}
          />
        </div>
      ) : (
        <Login />
      )}
    </>
  );
}

export default TodoInput;
