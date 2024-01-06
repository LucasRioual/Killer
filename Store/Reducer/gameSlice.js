import { createSlice } from '@reduxjs/toolkit';



export const gameSlice = createSlice({
  name: 'game',
  initialState: {
    gameCode: null,
    listPlayer: [],
    isGameStarted : false,
    killedBy: null,
    isConfirmKill: null,
    },
  reducers: {
    modifyCode: (state, actions) => {
      state.gameCode = actions.payload
      },
    setListPlayer: (state, actions) => {
      state.listPlayer = actions.payload
      },
    setGameStarted: (state, actions) => {
      state.isGameStarted = actions.payload
      },
    setKilledBy: (state, actions) => {
      state.killedBy = actions.payload
      },
    setConfirmKill: (state, actions) => {
      state.isConfirmKill = actions.payload
      },
  },
});

// Action creators are generated for each case reducer function
export const { modifyCode, setListPlayer, setGameStarted, setKilledBy, setConfirmKill} = gameSlice.actions;

export default gameSlice.reducer;
