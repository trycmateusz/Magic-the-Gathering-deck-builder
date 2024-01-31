import type { Card } from '@/src/types/Card'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { Filters } from '@/src/types/Filter'
import type { MaxCardLength, MinCardLength, CardPageSize } from '@/src/types/Card'
import { createSlice } from '@reduxjs/toolkit'
import { checkIfTwoStringArraysHaveAnyMatch } from '@/helpers/array'

interface State {
  cards: Card[]
  cardsFiltered: Card[] | null
  deck: Card[] | null
  deckFiltered: Card[] | null
  averageManaCost: number
  maxCards: MaxCardLength
  minCards: MinCardLength
  pageSize: CardPageSize
}

const initialState: State = {
  cards: [],
  cardsFiltered: null,
  deck: null,
  deckFiltered: null,
  averageManaCost: 0,
  maxCards: 30,
  minCards: 20,
  pageSize: 40
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
      if(!state.deck){
        state.deck = [action.payload]
      }
      else if(state.deck.length < state.maxCards) {
        if(state.deck.findIndex(card => card.id === action.payload.id) === -1){
          state.deck.push(action.payload)
        }
      }
    },
    filterCards(state, action: PayloadAction<Filters>){
      state.cardsFiltered = state.cards.filter(card => {
        if(action.payload.cardName !== '' && card.name.toLowerCase().includes(action.payload.cardName.toLowerCase())){
          return true
        }
        if(action.payload.sets.length > 0){
          const setCodes = action.payload.sets.map(set => set.code)
          if(setCodes.includes(card.set)){
            return true
          }
        }
        if(card.subtypes && action.payload.subtypes.length > 0){
          const hasAnySubtype = checkIfTwoStringArraysHaveAnyMatch(card.subtypes, action.payload.subtypes)
          if(hasAnySubtype){
            return true
          }
        }
        if(card.types && action.payload.types.length > 0){
          const hasAnyType = checkIfTwoStringArraysHaveAnyMatch(card.types, action.payload.types)
          if(hasAnyType){
            return true
          }
        }
        if(card.supertypes && action.payload.supertypes.length > 0){
          const hasAnySupertype = checkIfTwoStringArraysHaveAnyMatch(card.supertypes, action.payload.supertypes)
          if(hasAnySupertype){
            return true
          }
        }
      })
      if(state.cardsFiltered.length > state.pageSize){
        state.cardsFiltered = state.cardsFiltered.slice(0, state.pageSize)
      }
    },
    filterDeck(state, action: PayloadAction<Filters>){
      if(state.deck){
        state.deckFiltered = state.deck.filter(card => {
          if(action.payload.cardName !== '' && card.name.toLowerCase().includes(action.payload.cardName.toLowerCase())){
            return true
          }
          if(action.payload.sets.length > 0){
            const setCodes = action.payload.sets.map(set => set.code)
            if(setCodes.includes(card.set)){
              return true
            }
          }
          if(card.subtypes && action.payload.subtypes.length > 0){
            const hasAnySubtype = checkIfTwoStringArraysHaveAnyMatch(card.subtypes, action.payload.subtypes)
            if(hasAnySubtype){
              return true
            }
          }
          if(card.types && action.payload.types.length > 0){
            const hasAnyType = checkIfTwoStringArraysHaveAnyMatch(card.types, action.payload.types)
            if(hasAnyType){
              return true
            }
          }
          if(card.supertypes && action.payload.supertypes.length > 0){
            const hasAnySupertype = checkIfTwoStringArraysHaveAnyMatch(card.supertypes, action.payload.supertypes)
            if(hasAnySupertype){
              return true
            }
          }
        })
      }
    },
    resetFilteredCards(state){
      state.cardsFiltered = null
    },
    resetFilteredDeck(state){
      state.deckFiltered = null
    },
    setFilteredCards(state, action: PayloadAction<Card[]>){
      state.cardsFiltered = [...action.payload]
    },
    setFilteredDeck(state, action: PayloadAction<Card[]>){
      state.deckFiltered = [...action.payload]
    }
  }
})

export const { addCard, addCardToDeck, filterDeck, filterCards, resetFilteredCards, resetFilteredDeck, setFilteredCards, setFilteredDeck } = cardSlice.actions
export default cardSlice