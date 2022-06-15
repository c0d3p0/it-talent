import { createSlice } from "@reduxjs/toolkit";


const editModeSlice = createSlice({
  name: "editMode",
  initialState:
  {
    value: false
  },
  reducers:
  {
    setEditMode: (state, action) => {
      state.value = action.payload;
    }
  }
})


export const { setEditMode } = editModeSlice.actions;
export default editModeSlice.reducer;