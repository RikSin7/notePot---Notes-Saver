import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  todos: localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem("todos"))
    : [],
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addToTodo: (state, action) => {
      const todo = action.payload;
      const existingTodo = state.todos.find(
        (t) => t.title.toLowerCase() === todo.title.toLowerCase()
      );
      if (existingTodo) {
        toast.error("Todo already exists!");
        return;
      } else if (!todo.title.trim()) {
        toast.error("Add a to-do first!");
        return;
      } else {
        state.todos.push(todo);
        localStorage.setItem("todos", JSON.stringify(state.todos));
        console.log(todo);
        toast.success("To-do created.");
      }
    },

    updateToTodo: (state, action) => {
      const updatedTodo = action.payload;
      const index = state.todos.findIndex((t) => t._id === updatedTodo._id);
      if (index !== -1) {
        if (!updatedTodo.title.trim()) {
          toast.error("Add a to-do to update!");
          return;
        } else {
          state.todos[index] = updatedTodo;
          localStorage.setItem("todos", JSON.stringify(state.todos));
          toast.success("To-do updated.");
        }
      } else {
        toast.error("To-do not found for updating!");
      }
    },

    togglePinTodo: (state, action) => {
      const todoId = action.payload;
      const todo = state.todos.find((t) => t._id === todoId);
      if (todo) {
        todo.pinned = !todo.pinned;
        localStorage.setItem("todos", JSON.stringify(state.todos));
        toast.success(todo.pinned ? "To-do pinned." : "To-do unpinned.", {
          position: todo.pinned ? "bottom-center" : "top-center",
        });
      }
    },

    toggleTodoCompletion: (state, action) => {
      const todoId = action.payload;
      const todo = state.todos.find((t) => t._id === todoId);
      if (todo) {
        todo.completed = !todo.completed;
        localStorage.setItem("todos", JSON.stringify(state.todos));
        toast.success(
          `To-do marked as ${todo.completed ? "completed" : "not completed"}.`
        );
      }
    },

    removeFromTodo: (state, action) => {
      const id = action.payload;
      state.todos = state.todos.filter((todo) => todo._id !== id);
      localStorage.setItem("todos", JSON.stringify(state.todos));
      toast.success("To-do removed.");
    },

    resetAllTodo: (state) => {
      state.todos = [];
      localStorage.removeItem("todos");
      toast.success("All TO-DOs have been reset. ");
    },
  },
});

export const {
  addToTodo,
  updateToTodo,
  togglePinTodo,
  toggleTodoCompletion,
  removeFromTodo,
  resetAllTodo,
} = todoSlice.actions;
export default todoSlice.reducer;
