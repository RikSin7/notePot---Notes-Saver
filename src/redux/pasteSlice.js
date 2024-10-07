import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'

const pasteSlice = createSlice({
  name: 'paste',
  initialState: {
    pastes: localStorage.getItem('pastes')
      ? JSON.parse(localStorage.getItem('pastes')) //JSON.parse converts a JSON string back into a JS object or array.
      : []
  },
  reducers: {
    addToPastes: (state, action) => {
      const paste = action.payload

      // Trim the title and description to check for empty spaces.
      const trimmedTitle = paste.title.trim()
      const trimmedDescription = paste.description.trim()

      // Check if the title or description is empty or contains only spaces.
      if (!trimmedTitle && !trimmedDescription) {
        toast.error('Title and description cannot be empty.')
        return
      }

      if (!trimmedTitle) {
        toast.error('Title cannot be empty.')
        return
      }

      if (!trimmedDescription) {
        toast.error('Description cannot be empty.')
        return
      }

      // Check for duplicate paste by title.
      const duplicate = state.pastes.find(
        item => item.title.toLowerCase() === trimmedTitle.toLowerCase()
      )

      if (duplicate) {
        toast.error('A paste with the same title already exists.')
        return
      }

      // Add the new paste to the array and save to localStorage.
      state.pastes.push(paste)
      localStorage.setItem('pastes', JSON.stringify(state.pastes))
      toast.success('Paste created successfully.')
    },

    updateToPastes: (state, action) => {
      const updatedPaste = action.payload // This is the updated paste object from the action payload.
      const index = state.pastes.findIndex(
        paste => paste._id === updatedPaste._id // Find the index of the paste to be updated using the _id
      )
      if (index !== -1) {
        // Check if the paste was found.
        state.pastes[index] = updatedPaste // Update the paste in the array at the found index
        localStorage.setItem('pastes', JSON.stringify(state.pastes)) // Optionally update localStorage
        toast.success('Paste updated successfully.') // Optionally notify the user
      } else {
        toast.error('Paste not found.') // Handle case where the paste is not found (optional)
      }
    },
    resetAllPastes: state => {
      state.pastes = [] // Reset the pastes array to empty
      localStorage.removeItem('pastes') // Remove pastes from localStorage
      toast.success('All pastes have been reset successfully.')
    },
    removeFromPastes: (state, action) => {
      const pasteId = action.payload // The ID of the paste to be removed
      // console.log(pasteId)
      state.pastes = state.pastes.filter(paste => paste._id !== pasteId) // This line uses the filter method to create a new array that contains all pastes except the one with the matching _id. If a paste's _id matches pasteId, it will be excluded from the new array.
      localStorage.setItem('pastes', JSON.stringify(state.pastes))
      toast.success('Paste removed successfully.')
    }

    //Other way of doing this:

    // removeFromPaste: (state, action) => {
    //   const pasteIdToRemove = action.payload; // Get the ID from the action's payload

    //   const index = state.pastes.findIndex(paste => paste._id === pasteIdToRemove); // Find the index of the paste to remove

    //   if (index !== -1) { // Check if the paste exists
    //     state.pastes.splice(index, 1); // Remove the paste from the array using splice
    //     localStorage.setItem('pastes', JSON.stringify(state.pastes)); // Update localStorage
    //     toast.success('Paste removed successfully.'); // Notify the user
    //   }
    // }
  }
})

export const { addToPastes, updateToPastes, removeFromPastes, resetAllPastes } =
  pasteSlice.actions

export default pasteSlice.reducer
