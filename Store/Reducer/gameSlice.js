import { createSlice } from '@reduxjs/toolkit';



export const gameSlice = createSlice({
  name: 'game',
  initialState: {
    gameCode: null,
    listPlayer: [],
    isGameStarted : false,
    killedBy: null,
    isConfirmKill: null,
    isPlayerComeBack: false,
    gameStatut: null,
    newPlayer: [],
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
    setPlayerComeBack: (state, actions) => {
      state.isPlayerComeBack = actions.payload
      },
    setGameStatut: (state, actions) => {
      state.gameStatut = actions.payload
      },
    setNewPlayer: (state, actions) => {
      state.newPlayer = actions.payload
      }
  },
});

// Action creators are generated for each case reducer function
export const { modifyCode, setListPlayer, setGameStarted, setKilledBy, setConfirmKill, setPlayerComeBack, setGameStatut, setNewPlayer} = gameSlice.actions;

export default gameSlice.reducer;
