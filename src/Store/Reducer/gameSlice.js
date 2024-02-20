import { createSlice } from "@reduxjs/toolkit";

export const gameSlice = createSlice({
  name: "game",
  initialState: {
    gameCode: null,
    listPlayer: [],
    isGameStarted: false,
    killedBy: null,
    isConfirmKill: null,
    isPlayerComeBack: false,
    gameStatut: null,
    newPlayer: [],
    isRefuseNewPlayer: false,
    mission: null,
    target: null,
    isLoadingSalon: true,
    isEndGame: false,
    coutdown: null,
    numberMission: null,
    isLeaveGame: false,
  },
  reducers: {
    modifyCode: (state, actions) => {
      state.gameCode = actions.payload;
    },
    setListPlayer: (state, actions) => {
      state.listPlayer = actions.payload;
    },
    setGameStarted: (state, actions) => {
      state.isGameStarted = actions.payload;
    },
    setKilledBy: (state, actions) => {
      state.killedBy = actions.payload;
    },
    setConfirmKill: (state, actions) => {
      state.isConfirmKill = actions.payload;
    },
    setPlayerComeBack: (state, actions) => {
      state.isPlayerComeBack = actions.payload;
    },
    setGameStatut: (state, actions) => {
      state.gameStatut = actions.payload;
    },
    setNewPlayer: (state, actions) => {
      state.newPlayer.push(actions.payload);
    },
    removeNewPlayer: (state) => {
      state.newPlayer.shift();
    },
    setRefuseNewPlayer: (state, actions) => {
      state.isRefuseNewPlayer = actions.payload;
    },
    setMission: (state, actions) => {
      state.mission = actions.payload;
    },
    setTarget: (state, actions) => {
      state.target = actions.payload;
    },
    setLoadingSalon: (state, actions) => {
      state.isLoadingSalon = actions.payload;
    },
    setEndGame: (state, actions) => {
      state.isEndGame = actions.payload;
    },
    setCoutdown: (state, actions) => {
      state.coutdown = actions.payload;
    },
    setNumberMission: (state, actions) => {
      state.numberMission = actions.payload;
    },
    setLeaveGame: (state, actions) => {
      state.isLeaveGame = actions.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setLeaveGame,
  setNumberMission,
  modifyCode,
  setListPlayer,
  setGameStarted,
  setKilledBy,
  setConfirmKill,
  setPlayerComeBack,
  setGameStatut,
  setNewPlayer,
  removeNewPlayer,
  setRefuseNewPlayer,
  setMission,
  setTarget,
  setLoadingSalon,
  setEndGame,
  setCoutdown,
} = gameSlice.actions;

export default gameSlice.reducer;
