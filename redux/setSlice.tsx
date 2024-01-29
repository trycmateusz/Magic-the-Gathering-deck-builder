import type { Set } from '@/src/types/Set'
import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

interface State {
  sets: Set[]
}

const initialState: State = {
  sets: []
}

const setSlice = createSlice({
  name: 'set',
  initialState,
  reducers: {
    addSet(state, action: PayloadAction<Set>){
      if(state.sets.findIndex(set => set.code === action.payload.code) === -1){
        state.sets.push(action.payload)
      }
    }
  }
})

export const { addSet } = setSlice.actions
export default setSlice