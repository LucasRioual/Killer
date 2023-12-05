import { createSlice } from '@reduxjs/toolkit';



export const gameSlice = createSlice({
  name: 'game',
  initialState: {
    gameCode: null,
    },
  reducers: {
    modifyCode: (state, actions) => {
      state.gameCode = actions.payload
      },
  },
});

// Action creators are generated for each case reducer function
export const { modifyCode} = gameSlice.actions;

export default gameSlice.reducer;
