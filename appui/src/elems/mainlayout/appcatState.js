import { createSlice } from '@reduxjs/toolkit'

export const appcaState = createSlice({
    name: 'appcats',
    initialState: {
        current: NaN,
    },
    reducers: {
        updateAppcat: (state, action) => {
            state.current = action.payload
        },
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { updateAppcat } = appcaState.actions
  
  export default appcaState.reducer