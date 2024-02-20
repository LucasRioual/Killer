import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userId: null,
    surname: null,
    hostFlag: false,
    expoToken: null,
  },
  reducers: {
    modifyId: (state, actions) => {
      state.userId = actions.payload;
    },
    modifySurname: (state, actions) => {
      state.surname = actions.payload;
    },
    setHostFalse: (state) => {
      state.hostFlag = false;
    },
    setHostTrue: (state) => {
      state.hostFlag = true;
    },
    setExpoToken: (state, actions) => {
      state.expoToken = actions.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  modifyId,
  modifySurname,
  setHostFalse,
  setHostTrue,
  setExpoToken,
} = userSlice.actions;

export default userSlice.reducer;
