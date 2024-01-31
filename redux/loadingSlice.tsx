import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

interface State {
  setsLoading: boolean
  cardsLoading: boolean
}

const initialState: State = {
  setsLoading: false,
  cardsLoading: false
}

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setSetsLoading(state, action: PayloadAction<boolean>){
      state.setsLoading = action.payload
    },
    setCardsLoading(state, action: PayloadAction<boolean>){
      state.cardsLoading = action.payload
    }
  }
})

export const { setSetsLoading, setCardsLoading } = loadingSlice.actions
export default loadingSlice