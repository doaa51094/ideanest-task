import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.push(action.payload);
      console.log(action.payload);
    },
    editUser: (state, action) => {
      const {updatedTasks} = action.payload; // Rename state to taskState
      const existingUser = state.find(user => user.id === updatedTasks?.id);
   return updatedTasks;
    },
    deleteUser: (state, action) => {
      const { id } = action.payload;
      const existingUser = state.find(user => user.id === id);
      if (existingUser) {
        return state.filter(user => user.id !== id);
      }
    },
  }
});

export const { addUser, editUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;
