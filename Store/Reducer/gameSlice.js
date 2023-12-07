import { createSlice } from '@reduxjs/toolkit';



export const gameSlice = createSlice({
  name: 'game',
  initialState: {
    gameCode: null,
    listPlayer: [],
    },
  reducers: {
    modifyCode: (state, actions) => {
      state.gameCode = actions.payload
      },
    setListPlayer: (state, actions) => {
      state.listPlayer = actions.payload
      },
    }
  },
);

// Action creators are generated for each case reducer function
export const { modifyCode, setListPlayer} = gameSlice.actions;

export default gameSlice.reducer;
