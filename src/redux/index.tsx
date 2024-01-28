import { configureStore } from '@reduxjs/toolkit'
import typingSlice from './typingSlice'
import filterSlice from './filterSlice'
import setSlice from './setSlice'

const store = configureStore({
  reducer: {
    typing: typingSlice.reducer,
    filter: filterSlice.reducer,
    set: setSlice.reducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store