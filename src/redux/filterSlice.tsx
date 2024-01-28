import type { Filters } from '@/src/types/Filter'
import type { Set } from '@/src/types/Set'
import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

const initialState: Filters = {
  subtypes: [],
  supertypes: [],
  types: [],
  sets: [],
  cardName: '',
  setName: ''
}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    toggleSubtype(state, action: PayloadAction<string>){
      if(state.subtypes.includes(action.payload)){
        state.subtypes.splice(state.subtypes.findIndex(subtype => subtype === action.payload), 1)
      }
      else {
        state.subtypes.push(action.payload)
      }
    },
    toggleSupertype(state, action: PayloadAction<string>){
      if(state.supertypes.includes(action.payload)){
        state.supertypes.splice(state.supertypes.findIndex(supertype => supertype === action.payload), 1)
      }
      else {
        state.supertypes.push(action.payload)
      }
    },
    toggleType(state, action: PayloadAction<string>){
      if(state.types.includes(action.payload)){
        state.types.splice(state.types.findIndex(type => type === action.payload), 1)
      }
      else {
        state.types.push(action.payload)
      }
    },
    toggleSetFilter(state, action: PayloadAction<Set>){
      console.log(state.sets, action.payload)
      if(state.sets.find(set => set.code === action.payload.code)){
        state.sets.splice(state.sets.findIndex(set => set === action.payload), 1)
      }
      else {
        state.sets.push(action.payload)
      }
    },
    setCardName(state, action: PayloadAction<string>){
      state.cardName = action.payload
    },
    setSetName(state, action: PayloadAction<string>){
      state.setName = action.payload
    }
  }
})

export default filterSlice

export const { toggleSetFilter, toggleSubtype, toggleSupertype, toggleType, setCardName, setSetName } = filterSlice.actions