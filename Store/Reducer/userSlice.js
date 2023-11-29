import { createSlice } from '@reduxjs/toolkit';



export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userId: null,
    surname: null,
    },
  reducers: {
    modifyId: (state, actions) => {
      state.userId = actions.payload
      },
    modifySurname: (state, actions) => {
      state.surname = actions.payload
      },
  },
});

// Action creators are generated for each case reducer function
export const { modifyId, modifySurname } = userSlice.actions;

export default userSlice.reducer;
