import { configureStore } from '@reduxjs/toolkit'
import colorReducer from './Reducer/colorSlice'
import  userReducer  from './Reducer/userSlice'

export default configureStore({
  reducer: {
    color: colorReducer,
    user: userReducer
  },
})