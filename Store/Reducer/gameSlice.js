import { createSlice } from '@reduxjs/toolkit';



export const gameSlice = createSlice({
  name: 'game',
  initialState: {
    gameCode: null,
    isGameStarted : false,
    timer: 0,
    isPopUpVisible: false,
    newPlayer: null,
    isConfirmKill: false,
    isTargetResponse: null,
    isGameFinish: false,
    },
  reducers: {
    setGameCode: (state, actions) => {
      state.gameCode = actions.payload
      },
    setIsGameStarted: (state, actions) => {
      state.isGameStarted = actions.payload
      },
    setTimer: (state, actions) => {
      state.timer = actions.payload
      },
    setPopUpVisible: (state, actions) => {
      state.isPopUpVisible = actions.payload
      },
    setNewPlayer: (state, actions) => {
      state.newPlayer = actions.payload
      },
    setConfirmKill: (state, actions) => {
      state.isConfirmKill = actions.payload
      },
    setTargetResponse: (state, actions) => {
      state.isTargetResponse = actions.payload
      },
    setGameFinish: (state, actions) => {
      state.isGameFinish = actions.payload
    }
    
  },
});

// Action creators are generated for each case reducer function
export const {setGameFinish, setGameCode, setNewPlayer, setIsGameStarted, setPopUpVisible, setTimer, setConfirmKill, setTargetResponse} = gameSlice.actions;

export default gameSlice.reducer;
