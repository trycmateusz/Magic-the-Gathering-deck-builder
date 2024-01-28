export type Typing = 'subtypes' | 'types' | 'supertypes'

export interface CardTypings {
  subtypes: string[]
  supertypes: string[]
  types: string[]
}

export interface Card extends CardTypings {
  cmc: number
  id: string
  manaCost: string
  name: string
  set: string
  rarity: string
  type: string
}