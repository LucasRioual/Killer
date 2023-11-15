import { configureStore } from '@reduxjs/toolkit'
import colorReducer from './Reducer/colorSlice'

export default configureStore({
  reducer: {
    color: colorReducer,
  },
})