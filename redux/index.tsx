import { configureStore } from '@reduxjs/toolkit'
import typingSlice from './typingSlice'

export default configureStore({
  reducer: {
    typing: typingSlice.reducer
  }
})