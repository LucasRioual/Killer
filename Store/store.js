import { configureStore } from '@reduxjs/toolkit'
import  userReducer  from './Reducer/userSlice'
import  gameReducer  from './Reducer/gameSlice'

export default configureStore({
  reducer: {
    user: userReducer,
    game: gameReducer
  },
})