import { configureStore } from "@reduxjs/toolkit";

import appActionDataReducer from "../features/AppActionData";
import editModeReducer from "../features/EditMode";


const store = configureStore({
  reducer:
  {
    editMode: editModeReducer,
    appActionData: appActionDataReducer
  }
});


export default store;