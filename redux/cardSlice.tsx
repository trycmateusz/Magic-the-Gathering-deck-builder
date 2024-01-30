import type { Card } from '@/src/types/Card'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { Filters } from '@/src/types/Filter'
import type { MaxCardLength, MinCardLength } from '@/src/types/Card'
import { createSlice } from '@reduxjs/toolkit'
import { checkIfTwoStringArraysHaveAnyMatch } from '@/helpers/array'

interface State {
  cards: Card[]
  cardsFiltered: Card[]
  deck: Card[]
  averageManaCost: number
  maxCards: MaxCardLength
  minCards: MinCardLength
}

const initialState: State = {
  cards: [],
  cardsFiltered: [],
  deck: [],
  averageManaCost: 0,
  maxCards: 30,
  minCards: 20
}

const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    addCard(state, action: PayloadAction<Card>){
      if(state.cards.findIndex(card => card.id === action.payload.id || card.name === action.payload.name) === -1){
        state.cards.push(action.payload)
      }
    },
    addCardToDeck(state, action: PayloadAction<Card>){
      if(state.deck.length < 30){
        if(state.deck.findIndex(card => card.id === action.payload.id) === -1){
          state.deck.push(action.payload)
        }
      }
    },
    filterCards(state, action: PayloadAction<Filters>){
      state.cardsFiltered = state.cards.filter(card => {
        if(action.payload.cardName !== '' && card.name.includes(action.payload.cardName)){
          return true
        }
        if(action.payload.sets.length > 0){
          const setCodes = action.payload.sets.map(set => set.code)
          if(setCodes.includes(card.set)){
            return true
          }
        }
        if(action.payload.subtypes.length > 0){
          const hasAnySubtype = checkIfTwoStringArraysHaveAnyMatch(card.subtypes, action.payload.subtypes)
          if(hasAnySubtype){
            return true
          }
        }
        if(action.payload.types.length > 0){
          const hasAnyType = checkIfTwoStringArraysHaveAnyMatch(card.types, action.payload.types)
          if(hasAnyType){
            return true
          }
        }
        if(action.payload.supertypes.length > 0){
          const hasAnySupertype = checkIfTwoStringArraysHaveAnyMatch(card.supertypes, action.payload.supertypes)
          if(hasAnySupertype){
            return true
          }
        }
      })
    },
  }
})

export const { addCard, addCardToDeck, filterCards } = cardSlice.actions
export default cardSlice