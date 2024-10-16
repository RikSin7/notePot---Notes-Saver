import React, { useEffect, useRef, useState } from "react";
import TodoTasks from "./TodoTasks";
import { useSearchParams } from "react-router-dom";
import { addToTodo, updateToTodo } from "../redux/todoSlice";
import { useDispatch, useSelector } from "react-redux";

function TodoInput() {
  const [searchTerm, setSearchTerm] = useState("");
  const [title, setTitle] = useState("");
  const [searchParams, setSearchParams] = useSearchParams({});
  const allTodos = useSelector((state) => state.todo.todos);
  const todoId = searchParams.get("todoId");
  const dispatch = useDispatch();
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

  return (
    <div className="flex flex-col items-center mt-16 px-4 w-[98vw]">
      <form
        className="todoInput flex sm:flex-row flex-col mt-6 rounded-md"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="text"
          value={title}
          // defaultValue={title}
          ref={inputRef}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What's the plan today?"
          className="placeholder:text-[#c5c0c0] border border-[#292929] min-w-[20vw] px-2 sm:py-4 py-3 sm:rounded-l-md sm:rounded-r-none rounded-md outline-none dark:bg-bgInDark transition-bg duration-300 sm:w-[60vw] w-[98vw]"
        />
        <button
          className="bg-[#654A4E] px-5 sm:py-3 py-2  rounded-md sm:rounded-r-md sm:rounded-l-none sm:border sm:border-[#343434] min-w-[8vw] cursor-pointer text-white mt-2 sm:mt-0 border border-[#000000] active:scale-[.98] sm:active:scale-[1] active:bg-[#704e52] transition-colors duration-200"
          onClick={createTodo}
        >
          {todoId ? "Update" : "Create"}
        </button>
      </form>
      <div className="input mt-2">
        <input
          type="text"
          placeholder="Search My To-do..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="placeholder:font-[silkScreen] min-w-[30vw]  dark:bg-[#121212] dark:border-black border border-[#c5c5c5] sm:p-4 p-2 rounded-full my-4 mt-6 flex-col justify-center placeholder:text-center text-center caret-[#0d601d] custom-caret outline-none hover:outline-[#825a5a] bg-[#ffffff] transition-all duration-300 placeholder:text-[#9e5959] placeholder:text-[14px] sm:placeholder:text-base"
          //   dark:placeholder:text-[white]
          // dark:bg-[#654A4E]
        />
      </div>
      <div className="flex items-center mt-4">
        <h1 className="text-[#ffffff] dark:text-[#646464] md:text-2xl text-2xl font-semibold  border border-black sm:w-[98vw] w-[98vw] md:py-4 py-2 px-2 rounded-md dark:bg-bgInDark bg-[#654A4E] transition-all duration-300 flex justify-center">
          My To-Dos
          <svg
            className="w-8 ml-1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12H4C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C9.25022 4 6.82447 5.38734 5.38451 7.50024L8 7.5V9.5H2V3.5H4L3.99989 5.99918C5.82434 3.57075 8.72873 2 12 2ZM13 7L12.9998 11.585L16.2426 14.8284L14.8284 16.2426L10.9998 12.413L11 7H13Z"></path>
          </svg>
        </h1>
      </div>
      <TodoTasks
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        allTodos={allTodos}
        createTodo={createTodo}
        todoId={todoId}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        inputRef={inputRef}
      />
    </div>
  );
}

export default TodoInput;
