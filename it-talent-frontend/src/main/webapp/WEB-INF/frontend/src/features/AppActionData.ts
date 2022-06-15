import { createSlice } from "@reduxjs/toolkit";


const appActionDataSlice = createSlice({
  name: "appActionData",
  initialState:
  {
    value: {key: "", params: []} as IAppActionData
  },
  reducers:
  {
    setAppActionData: (state, action) => {
      state.value = action.payload;
    }
  }
});


interface IAppActionData {
  key: string;
  params?: string[];
  previous?: IAppActionData;
}


export type { IAppActionData };
export const { setAppActionData } = appActionDataSlice.actions;
export default appActionDataSlice.reducer;
