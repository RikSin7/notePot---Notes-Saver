import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import {
  removeFromTodo,
  resetAllTodo,
  togglePinTodo,
  toggleTodoCompletion,
} from "../redux/todoSlice";
import toast from "react-hot-toast";
import { NavLink } from "react-router-dom";

function TodoTasks({
  searchTerm,
  allTodos,
  setSearchParams,
  inputRef,
  setInputHightlight,
}) {
  const dispatch = useDispatch();
  const [sortedTodos, setSortedTodos] = useState([]);
  const [highlightedTodo, setHighlightedTodo] = useState(null);
  const todoRefs = useRef({}); // Store refs for each todo item

  useEffect(() => {
    const filteredTodos = allTodos.filter((todo) =>
      todo.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sorted = [...filteredTodos].sort((a, b) => {
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
      return 0;
    });

    setSortedTodos(sorted);
  }, [allTodos, searchTerm]);

  const handleTogglePin = (todoId) => {
    // Step 1: Capture the current scroll position before updating
    const currentScrollPosition = window.scrollY;

    // Step 2: Dispatch pin/unpin action
    dispatch(togglePinTodo(todoId));
    setHighlightedTodo(todoId);

    // Step 3: Use requestAnimationFrame to ensure the DOM reordering is done
    requestAnimationFrame(() => {
      // Step 4: Restore the scroll position to prevent jumping
      window.scrollTo(0, currentScrollPosition);

      // Step 5: Scroll to the newly pinned/unpinned item smoothly
      if (todoRefs.current[todoId]) {
        setTimeout(() => {
          todoRefs.current[todoId].scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
          // Apply highlight effect if needed
          todoRefs.current[todoId].classList.add("highlight-unpinned");
          setTimeout(() => {
            todoRefs.current[todoId].classList.remove("highlight-unpinned");
          }, 500);
        }, 100); // Slight delay to ensure everything is rendered
      }

      // Clear highlighted state after the transition
      setTimeout(() => {
        setHighlightedTodo(null);
      }, 1000); // Keep it longer to finish the transition
    });
  };

  const handleToggleCompletion = (todoId) => {
    dispatch(toggleTodoCompletion(todoId));
  };

  const handleCopy = (todoId) => {
    const todoContent = `Title: ${todoId.title}\nCreated at: ${todoId.createdAt}`;
    navigator.clipboard
      .writeText(todoContent)
      .then(() => {
        toast.success("Copied to clipboard!");
      })
      .catch(() => {
        toast.error("Failed to copy!");
      });
  };

  const handleDelete = (todoId) => {
    dispatch(removeFromTodo(todoId));
  };

  const handleResetAll = () => {
    const confirmed = window.confirm("Are you sure? This cannot be undone!");
    if (confirmed) {
      dispatch(resetAllTodo());
    }
  };

  const handleEditClick = (e, todoId) => {
    e.stopPropagation();
    setSearchParams({ todoId });
    if (inputRef.current) {
      inputRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      inputRef.current.focus();
      setInputHightlight(todoId);
      setTimeout(() => {
        inputRef.current.classList.add("input-highlight");

        setTimeout(() => {
          inputRef.current.classList.remove("input-highlight");
        }, 100);
      }, 100);
    }
    setTimeout(() => {
      setInputHightlight(null);
    }, 1500);
  };
  return (
    <div className="flex flex-col items-center mt-8 px-4 w-[98vw]">
      {sortedTodos.length > 0 ? (
        sortedTodos.map((todo) => (
          <ul
            ref={(el) => (todoRefs.current[todo._id] = el)}
            className={`border border-[#805151] dark:border-[black] rounded-md py-2 px-4 flex flex-col overflow-y-auto w-[98vw] mb-1 relative placeholder:font-[silkScreen] min-w-[30vw]  dark:bg-[#121212] sm:p-4 p-2   justify-center bg-[#ffffff] outline-none sm:placeholder:text-base placeholder:text-[#9e5959] z-10 sm:transition-all sm:duration-300 sm:ease-in-out sm:transform sm:hover:scale-[0.99] hover:scale-[0.98] active:duration-300 placeholder:text-[14px] transition-all duration-300 ${
              highlightedTodo === todo._id
                ? "bg-[#b5c4d6] dark:bg-[#1f2122] scale-[1.02] transition-all duration-500"
                : "dark:bg-bgInDark bg-[#D9DFE9] transition-all duration-300"
            }`}
            onClick={() => handleToggleCompletion(todo._id)}
            key={todo._id}
          >
            <div className="flex w-full justify-between items-start gap-4">
              <li
                className={`sm:text-xl text-md transition-all duration-300 gap-3 my-2 flex items-center ${
                  todo.completed
                    ? "line-through dark:text-[#515151] text-[#acacac]"
                    : "transition-bg duration-300"
                }`}
              >
                <input
                  type="checkbox"
                  className="peer hidden"
                  defaultChecked={todo.completed}
                />
                <span
                  className={`w-6 h-6 flex-shrink-0 transition-all duration-300 border-2 dark:border-[#737373] border-[#8e6969] rounded-full ${
                    todo.completed
                      ? "dark:bg-[#737373] bg-[#8e6969]"
                      : "bg-transparent"
                  }`}
                >
                  <label>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className={`${
                        todo.completed
                          ? "dark:text-[#000000] text-[#fff]"
                          : "text-transparent"
                      } transition-all duration-300`}
                    >
                      <path d="M9.9997 15.1709L19.1921 5.97852L20.6063 7.39273L9.9997 17.9993L3.63574 11.6354L5.04996 10.2212L9.9997 15.1709Z"></path>
                    </svg>
                  </label>
                </span>
                {todo.title}
              </li>
              <span className="flex sm:gap-2 gap-[2px] sm:mt-[10px] mt-[5px] z-10">
                <div
                  className="pin/unpin relative group flex items-center "
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Pin/unpin button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTogglePin(todo._id);
                    }}
                    className="relative z-10 sm:transition-transform sm:duration-100 sm:ease-in-out sm:transform sm:hover:scale-75 sm:active:scale-125 active:scale-150 active:duration-100 px-2 py-1"
                  >
                    {todo.pinned ? (
                      <svg
                        className="w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M20.9701 17.1716 19.5559 18.5858 16.0214 15.0513 15.9476 15.1251 15.2405 18.6606 13.8263 20.0748 9.58369 15.8322 4.63394 20.7819 3.21973 19.3677 8.16947 14.418 3.92683 10.1753 5.34105 8.7611 8.87658 8.05399 8.95029 7.98028 5.41373 4.44371 6.82794 3.0295 20.9701 17.1716ZM10.3645 9.39449 9.86261 9.8964 7.04072 10.4608 13.5409 16.9609 14.1052 14.139 14.6071 13.6371 10.3645 9.39449ZM18.7761 9.46821 17.4356 10.8087 18.8498 12.2229 20.1903 10.8824 20.8974 11.5895 22.3116 10.1753 13.8263 1.69003 12.4121 3.10425 13.1192 3.81135 11.7787 5.15185 13.1929 6.56607 14.5334 5.22557 18.7761 9.46821Z"></path>
                      </svg>
                    ) : (
                      <svg
                        className="w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M13.8273 1.69L22.3126 10.1753L20.8984 11.5895L20.1913 10.8824L15.9486 15.125L15.2415 18.6606L13.8273 20.0748L9.58466 15.8321L4.63492 20.7819L3.2207 19.3677L8.17045 14.4179L3.92781 10.1753L5.34202 8.76107L8.87756 8.05396L13.1202 3.81132L12.4131 3.10422L13.8273 1.69ZM14.5344 5.22554L9.86358 9.89637L7.0417 10.4607L13.5418 16.9609L14.1062 14.139L18.7771 9.46818L14.5344 5.22554Z"></path>
                      </svg>
                    )}
                  </button>
                  <span
                    className={`absolute left-1/2 -translate-x-1/2 top-1 text-[10px] font-semibold opacity-0 translate-y-2 transition-opacity duration-300 sm:group-hover:opacity-100 sm:group-hover:translate-y-0 ${
                      todo.pinned
                        ? "sm:after:content-['Unpin']"
                        : "sm:after:content-['Pin']"
                    } sm:after:absolute sm:after:-top-6 sm:after:left-1/2 sm:after:-translate-x-1/2 sm:after:bg-[#484848] sm:after:text-white sm:after:rounded-lg sm:after:px-2 sm:after:py-[2px] sm:after:mt-[3px] sm:after:shadow-md sm:after:opacity-0 sm:group-hover:after:opacity-100 sm:group-hover:after:translate-y-0 sm:after:ease-jump`}
                  ></span>
                </div>
                <div
                  className="edit relative group flex items-center"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    className={`edit relative z-10 sm:transition-transform sm:duration-100 sm:ease-in-out sm:transform sm:hover:scale-75 sm:active:scale-125 active:scale-150 active:duration-100 py-1 px-2 `}
                    onClick={(e) => handleEditClick(e, todo._id)}
                  >
                    <NavLink to={`/todoinput`}>
                      <svg
                        className="edit w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M6.41421 15.89L16.5563 5.74785L15.1421 4.33363L5 14.4758V15.89H6.41421ZM7.24264 17.89H3V13.6473L14.435 2.21231C14.8256 1.82179 15.4587 1.82179 15.8492 2.21231L18.6777 5.04074C19.0682 5.43126 19.0682 6.06443 18.6777 6.45495L7.24264 17.89ZM3 19.89H21V21.89H3V19.89Z"></path>
                      </svg>
                    </NavLink>
                  </button>
                  <span
                    className={`absolute left-1/2 -translate-x-1/2 top-1 text-[10px] font-semibold opacity-0 translate-y-2 transition-opacity duration-300 sm:group-hover:opacity-100 sm:group-hover:translate-y-0 sm:after:absolute sm:after:-top-6 sm:after:left-1/2 sm:after:-translate-x-1/2 sm:after:bg-[#484848] sm:after:text-white sm:after:rounded-lg sm:after:px-2 sm:after:py-[2px] sm:after:mt-[3px] sm:after:shadow-md sm:after:opacity-0 sm:group-hover:after:opacity-100 sm:group-hover:after:translate-y-0 sm:after:ease-jump after:content-['Edit']`}
                  ></span>
                </div>
                <div
                  className="copy relative group flex items-center"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    className="copy relative z-10 sm:transition-transform sm:duration-100 sm:ease-in-out sm:transform sm:hover:scale-75 sm:active:scale-125 active:scale-150 active:duration-100 py-1 px-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopy(todo);
                    }}
                  >
                    <svg
                      className="w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M6.9998 6V3C6.9998 2.44772 7.44752 2 7.9998 2H19.9998C20.5521 2 20.9998 2.44772 20.9998 3V17C20.9998 17.5523 20.5521 18 19.9998 18H16.9998V20.9991C16.9998 21.5519 16.5499 22 15.993 22H4.00666C3.45059 22 3 21.5554 3 20.9991L3.0026 7.00087C3.0027 6.44811 3.45264 6 4.00942 6H6.9998ZM5.00242 8L5.00019 20H14.9998V8H5.00242ZM8.9998 6H16.9998V16H18.9998V4H8.9998V6Z"></path>
                    </svg>
                  </button>
                  <span
                    className={`absolute left-1/2 -translate-x-1/2 top-1 text-[10px] font-semibold opacity-0 translate-y-2 transition-opacity duration-300 sm:group-hover:opacity-100 sm:group-hover:translate-y-0 sm:after:absolute sm:after:-top-6 sm:after:left-1/2 sm:after:-translate-x-1/2 sm:after:bg-[#484848] sm:after:text-white sm:after:rounded-lg sm:after:px-2 sm:after:py-[2px] sm:after:mt-[3px] sm:after:shadow-md sm:after:opacity-0 sm:group-hover:after:opacity-100 sm:group-hover:after:translate-y-0 sm:after:ease-jump after:content-['Copy']`}
                  ></span>
                </div>
                <div
                  className="delete relative group flex items-center"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    className="delete relative z-10 sm:transition-transform sm:duration-100 sm:ease-in-out sm:transform sm:hover:scale-75 sm:active:scale-125 active:scale-150 active:duration-100 py-1 px-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(todo._id);
                    }}
                  >
                    <svg
                      className="w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M7 4V2H17V4H22V6H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V6H2V4H7ZM6 6V20H18V6H6ZM9 9H11V17H9V9ZM13 9H15V17H13V9Z"></path>
                    </svg>
                  </button>
                  <span
                    className={`absolute left-1/2 -translate-x-1/2 top-1 text-[10px] font-semibold opacity-0 translate-y-2 transition-opacity duration-300 sm:group-hover:opacity-100 sm:group-hover:translate-y-0 sm:after:absolute sm:after:-top-6 sm:after:left-1/2 sm:after:-translate-x-1/2 sm:after:bg-[#484848] sm:after:text-white sm:after:rounded-lg sm:after:px-2 sm:after:py-[2px] sm:after:mt-[3px] sm:after:shadow-md sm:after:opacity-0 sm:group-hover:after:opacity-100 sm:group-hover:after:translate-y-0 sm:after:ease-jump after:content-['Delete']`}
                  ></span>
                </div>
              </span>
            </div>
            <div className="flex w-full justify-end">
              <span
                className="flex gap-1 text-xs sm:text-base items-center  text-[#000000] dark:text-[#cf6b6b] transition-all duration-300"
                onClick={(e) => e.stopPropagation()}
              >
                <svg
                  className="date w-5 sm:w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M9 1V3H15V1H17V3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H7V1H9ZM20 11H4V19H20V11ZM7 5H4V9H20V5H17V7H15V5H9V7H7V5Z"></path>
                </svg>
                {todo.createdAt}
              </span>
            </div>
          </ul>
        ))
      ) : (
        <h1 className="text-center flex justify-center items-center w-full md:text-5xl  text-3xl text-[#744c4c] dark:text-[#646464] transition-bg duration-300 font-semibold font-[Tangerine]">
          {searchTerm ? "No matching TO-DOs found!" : "No TO-DOs created yet!"}
        </h1>
      )}
      {allTodos.length > 2 && !searchTerm && (
        <div className="flex justify-center mt-6 w-full">
          <button
            className="font-[silkScreen]  min-w-[30vw]  dark:bg-[#121212] dark:border-black border border-[#c5c5c5] sm:p-4 p-2 rounded-full text-center bg-[#ffffff] transition-all duration-300 outline-none hover:outline-[#825a5a] mb-8 text-[14px] sm:text-base text-[#9e5959] px-8 relative z-10 sm:transition-all sm:duration-300 sm:ease-in-out sm:transform sm:hover:scale-[0.95] sm:active:scale-[1.05] active:scale-[1.08] active:duration-300"
            onClick={handleResetAll}
          >
            Reset All TO-DOs !!!
          </button>
        </div>
      )}
    </div>
  );
}

export default TodoTasks;
