import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  pastes: localStorage.getItem("pastes")
    ? JSON.parse(localStorage.getItem("pastes"))
    : [],
};

const pasteSlice = createSlice({
  name: "paste",
  initialState,
  reducers: {
    addToPastes: (state, action) => {
      const paste = action.payload;
      const existingPaste = state.pastes.find(
        (p) => p.title.toLowerCase() === paste.title.toLowerCase()
      );

      if (existingPaste) {
        toast.error("A note with the same title already exists!");

        return;
      } else if (!paste.title.trim() && !paste.description.trim()) {
        toast.error("Title and description cannot be empty!");
        return;
      } else if (!paste.title.trim()) {
        toast.error("Title cannot be empty!");
        return;
      } else if (!paste.description.trim()) {
        toast.error("Description cannot be empty!");
        return;
      } else {
        state.pastes.push(paste);
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast.success("Note created.");
      }
    },

    updateToPastes: (state, action) => {
      const updatedPaste = action.payload;
      const index = state.pastes.findIndex((p) => p._id === updatedPaste._id);

      if (index !== -1) {
        if (!updatedPaste.title.trim() && !updatedPaste.description.trim()) {
          toast.error("Title and description cannot be empty!");
          return;
        } else if (!updatedPaste.title.trim()) {
          toast.error("Title cannot be empty!");
          return;
        } else if (!updatedPaste.description.trim()) {
          toast.error("Description cannot be empty!");
          return;
        } else {
          state.pastes[index] = updatedPaste;
          localStorage.setItem("pastes", JSON.stringify(state.pastes));
          toast.success("Note updated.");
        }
      } else {
        toast.error("Note not found for updating!");
      }
    },

    removeFromPastes: (state, action) => {
      const id = action.payload;
      state.pastes = state.pastes.filter((p) => p._id !== id);
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
      toast.success("Note removed.");
    },

    resetAllPastes: (state) => {
      state.pastes = [];
      localStorage.removeItem("pastes");
      toast.success("All notes have been reset.");
    },

    togglePinPaste: (state, action) => {
      const pasteId = action.payload;
      const paste = state.pastes.find((p) => p._id === pasteId);
      if (paste) {
        paste.pinned = !paste.pinned;
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast.success(paste.pinned ? "Note pinned." : "Note unpinned.", {
          position: paste.pinned ? "bottom-center" : "top-center",
        });
      }
    },

  },
});

export const {
  addToPastes,
  updateToPastes,
  removeFromPastes,
  resetAllPastes,
  togglePinPaste,
} = pasteSlice.actions;

export default pasteSlice.reducer;
