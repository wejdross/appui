import { configureStore } from '@reduxjs/toolkit'
import appcatReducer from '../elems/mainlayout/appcatState'

export default configureStore({
  reducer: {
    appcats: appcatReducer,
  },
})