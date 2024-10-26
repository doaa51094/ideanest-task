import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem("tasks")) || [];

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.push(action.payload);
      localStorage.setItem("tasks", JSON.stringify(state)); 
      console.log(action.payload);
    },
    updateTask: (state, action) => {
      const {updatedTasks} = action.payload;
      const existingUser = state.find(user => user.id === updatedTasks?.id);
    return updatedTasks;
    },
    editTask: (state, action) => {
      const { id, ...updatedData } = action.payload;
      const existingUser = state.find((user) => user.id === id);

      if (existingUser) {
        Object.assign(existingUser, updatedData);
      }
    },
    deleteTask: (state, action) => {
      const { id } = action.payload;
      const existingUser = state.find(user => user.id === id);
      if (existingUser) {
        return state.filter(user => user.id !== id);
      }
    },
  }
});

export const { addTask, updateTask, deleteTask ,editTask} = taskSlice.actions;
export default taskSlice.reducer;
