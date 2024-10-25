import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.push(action.payload);
    },
    editUser: (state, action) => {
      const { id, image, title, description, priority, state: taskState } = action.payload; // Rename state to taskState
      const existingUser = state.find(user => user.id === id);
      if (existingUser) {
        existingUser.image = image;
        existingUser.title = title;
        existingUser.description = description;
        existingUser.priority = priority;
        existingUser.state = taskState; // Use the renamed variable here
      }
    },
    deleteUser: (state, action) => {
      const { id } = action.payload;
      const existingUser = state.find(user => user.id === id);
      if (existingUser) {
        return state.filter(user => user.id !== id);
      }
    }
  }
});

export const { addUser, editUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;
