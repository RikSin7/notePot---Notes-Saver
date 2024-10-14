import React from "react";
import { useDispatch } from "react-redux";
import {
  removeFromTodo,
  resetAllTodo,
  toggleTodoCompletion,
} from "../redux/todoSlice";
import toast from "react-hot-toast";
import { NavLink } from "react-router-dom";

function TodoTasks({
  searchTerm,
  setSearchTerm,
  allTodos,
  createTodo,
  todoId,
  searchParams,
  setSearchParams,
}) {
  const dispatch = useDispatch();
  const filteredTodos = allTodos.filter((todo) =>
    todo.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleToggleCompletion = (todoId) => {
    dispatch(toggleTodoCompletion(todoId)); // Dispatch the action to toggle completion
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

  const handleResetAll = () => {
    const confirmed = window.confirm("Are you sure? This cannot be undone!");
    if (confirmed) {
      dispatch(resetAllTodo());
    }
  };
  const handleDelete = (todoId) => {
    dispatch(removeFromTodo(todoId));
  };
  return (
    <div className="flex flex-col items-center mt-8 px-4 w-[98vw]">
      {filteredTodos.length > 0 ? (
        filteredTodos.map((todo) => (
          <ul
            className="border border-[#805151] dark:border-[black] dark:bg-bgInDark bg-[#D9DFE9] rounded-md py-2 px-4 flex flex-col max-h-[300px] overflow-y-auto transition-all duration-300 sm:w-[69vw] w-[98vw] mb-1 relative
            "
            onClick={() => handleToggleCompletion(todo._id)}
            key={todo._id}
          >
            <div className="flex w-full justify-between items-start gap-4">
              <li
                className={`text-[#2D3031] dark:text-[#ffffff] sm:text-xl text-md active:transition-none transition-all duration-300 gap-3 my-2 flex items-center ${
                  todo.completed
                    ? "line-through dark:text-[#696969] text-[#acacac]"
                    : ""
                }`}
              >
                <input
                  type="checkbox"
                  className="peer hidden"
                  checked={todo.completed}
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
              <span className="flex gap-4 mt-[12px] z-10">
                <div className="edit relative group flex items-center">
                  <button
                    className="edit transition-transform duration-300 ease-in-out transform hover:scale-75 z-10"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSearchParams({ todoId: todo._id });
                    }}
                  >
                    <NavLink to={`/todoinput`}>
                      <svg
                        className="edit sm:w-6 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M6.41421 15.89L16.5563 5.74785L15.1421 4.33363L5 14.4758V15.89H6.41421ZM7.24264 17.89H3V13.6473L14.435 2.21231C14.8256 1.82179 15.4587 1.82179 15.8492 2.21231L18.6777 5.04074C19.0682 5.43126 19.0682 6.06443 18.6777 6.45495L7.24264 17.89ZM3 19.89H21V21.89H3V19.89Z"></path>
                      </svg>
                    </NavLink>
                  </button>
                  <span className="absolute left-1/2 -translate-x-1/2 top-1 text-[10px] font-semibold opacity-0 translate-y-2 transition-opacity duration-300 group-hover:opacity-100 group-hover:translate-y-0 after:content-['Edit'] after:absolute after:-top-6 after:left-1/2 after:-translate-x-1/2 after:bg-[#484848] after:text-white after:rounded-lg after:px-2 after:py-[2px] after:mt-[3px] after:shadow-md after:opacity-0 group-hover:after:opacity-100 group-hover:after:translate-y-0 after:ease-jump"></span>
                </div>
                <div className="copy relative group flex items-center">
                  <button
                    className="copy transition-transform duration-300 ease-in-out transform hover:scale-75 z-10"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopy(todo);
                    }}
                  >
                    <svg
                      className="sm:w-6 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M6.9998 6V3C6.9998 2.44772 7.44752 2 7.9998 2H19.9998C20.5521 2 20.9998 2.44772 20.9998 3V17C20.9998 17.5523 20.5521 18 19.9998 18H16.9998V20.9991C16.9998 21.5519 16.5499 22 15.993 22H4.00666C3.45059 22 3 21.5554 3 20.9991L3.0026 7.00087C3.0027 6.44811 3.45264 6 4.00942 6H6.9998ZM5.00242 8L5.00019 20H14.9998V8H5.00242ZM8.9998 6H16.9998V16H18.9998V4H8.9998V6Z"></path>
                    </svg>
                  </button>
                  <span className="absolute left-1/2 -translate-x-1/2 top-1 text-[10px] font-semibold opacity-0 translate-y-2 transition-opacity duration-300 group-hover:opacity-100 group-hover:translate-y-0 after:content-['Copy'] after:absolute after:-top-6 after:left-1/2 after:-translate-x-1/2 after:bg-[#484848] after:text-white after:rounded-lg after:px-2 after:py-[2px] after:mt-[3px] after:shadow-md after:opacity-0 group-hover:after:opacity-100 group-hover:after:translate-y-0 after:ease-jump"></span>
                </div>
                <div className="copy relative group flex items-center">
                  <button
                    className="delete transition-transform duration-300 ease-in-out transform hover:scale-75 z-10"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(todo._id);
                    }}
                  >
                    <svg
                      className="sm:w-6 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M7 4V2H17V4H22V6H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V6H2V4H7ZM6 6V20H18V6H6ZM9 9H11V17H9V9ZM13 9H15V17H13V9Z"></path>
                    </svg>
                  </button>
                  <span className="absolute left-1/2 -translate-x-1/2 top-1 text-[10px] font-semibold opacity-0 translate-y-2 transition-opacity duration-300 group-hover:opacity-100 group-hover:translate-y-0 after:content-['Delete'] after:absolute after:-top-6 after:left-1/2 after:-translate-x-1/2 after:bg-[#484848] after:text-white after:rounded-lg after:px-2 after:py-[2px] after:mt-[3px] after:shadow-md after:opacity-0 group-hover:after:opacity-100 group-hover:after:translate-y-0 after:ease-jump"></span>
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
        <div className="flex justify-center mt-6">
          <button
            className="font-[silkScreen]  min-w-[30vw]  dark:bg-[#121212] dark:border-black border border-[#c5c5c5] sm:p-4 p-2 rounded-full text-center  bg-[#ffffff] transition-all duration-300 outline-none hover:outline-[#825a5a] mb-8 text-[14px] sm:text-base text-[#9e5959] px-4"
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
