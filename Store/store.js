import { configureStore } from '@reduxjs/toolkit'
import colorReducer from './Reducer/colorSlice'
import  userReducer  from './Reducer/userSlice'
import  gameReducer  from './Reducer/gameSlice'

export default configureStore({
  reducer: {
    color: colorReducer,
    user: userReducer,
    game: gameReducer
  },
})