import type { CardTypings } from '@/src/types/Card'
import { createSlice } from '@reduxjs/toolkit'

const initialState: CardTypings = {
  subtypes: [  
    'Advisor',
    'Ajani',
    'Alara',
    'Ally',
    'Angel',
    'Antelope',
    'Ape',
    'Arcane'
  ],
  supertypes: [  
    'Basic',
    'Legendary',
    'Ongoing',
    'Snow',
    'World'
  ],
  types: [  
    'Artifact',
    'Conspiracy',
    'Creature',
    'Enchantment',
    'Instant',
    'Land',
    'Phenomenon',
    'Plane',
    'Planeswalker',
    'Scheme',
    'Sorcery',
    'Tribal',
    'Vanguard'
  ]
}

const typingSlice = createSlice({
  name: 'typing',
  initialState,
  reducers: { }
})

export default typingSlice