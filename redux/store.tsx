import { configureStore } from '@reduxjs/toolkit'
import typingSlice from './typingSlice'
import setSlice from './setSlice'
import cardSlice from './cardSlice'
import loadingSlice from './loadingSlice'

const store = configureStore({
  reducer: {
    card: cardSlice.reducer,
    typing: typingSlice.reducer,
    set: setSlice.reducer,
    loading: loadingSlice.reducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store