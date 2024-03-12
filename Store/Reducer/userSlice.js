import { createSlice } from '@reduxjs/toolkit';



export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userId: null,
    userName: null,
    isHost: false,
    mission: null,
    target: null,
    isTargetLeave: false,

    },
  reducers: {
    setUserId: (state, actions) => {
      state.userId = actions.payload
      },
    setIsHost: (state, actions) => {
      state.isHost = actions.payload
      },
      setMission: (state, actions) => {
        state.mission = actions.payload
      },
      setTarget: (state, actions) => {
        state.target = actions.payload
      },
      setUserName: (state, actions) => {
        state.userName = actions.payload
      },
      setTargetLeave: (state, actions) => {
        state.isTargetLeave = actions.payload
      }
  },
});

// Action creators are generated for each case reducer function
export const { setUserId, setIsHost, setMission, setTarget, setUserName, setTargetLeave } = userSlice.actions;

export default userSlice.reducer;
