import { createSlice } from '@reduxjs/toolkit';



export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userId: null,
    surname: null,
    hostFlag: false,
    },
  reducers: {
    modifyId: (state, actions) => {
      state.userId = actions.payload
      },
    modifySurname: (state, actions) => {
      state.surname = actions.payload
      },
    setHostFalse: (state) => {
        state.hostFlag = false;
      },
      setHostTrue: (state) => {
        state.hostFlag = true;
      },
  },
});

// Action creators are generated for each case reducer function
export const { modifyId, modifySurname, setHostFalse, setHostTrue } = userSlice.actions;

export default userSlice.reducer;
