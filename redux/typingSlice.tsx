import type { CardTypings } from '@/types/Card'
import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

const initialState: CardTypings = {
  subtypes: [],
  supertypes: [],
  types: []
}

const typingSlice = createSlice({
  name: 'typing',
  initialState,
  reducers: {
    addType(state, action: PayloadAction<string>){
      state.types.push(action.payload)
    },
    addSupertype(state, action: PayloadAction<string>){
      state.supertypes.push(action.payload)
    },
    addSubtype(state, action: PayloadAction<string>){
      state.subtypes.push(action.payload)
    }
  }
})

export default typingSlice

export const { addType } = typingSlice.actions