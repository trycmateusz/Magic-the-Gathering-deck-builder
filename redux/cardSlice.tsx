import type { Card } from '@/src/types/Card'
import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

interface State {
  cards: Card[]
}

const initialState: State = {
  cards: []
}

const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    addCard(state, action: PayloadAction<Card>){
      if(state.cards.findIndex(card => card.id === action.payload.id || card.name === action.payload.name) === -1){
        state.cards.push(action.payload)
      }
    }
  }
})

export const { addCard } = cardSlice.actions
export default cardSlice