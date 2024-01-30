export type Typing = 'subtypes' | 'types' | 'supertypes'

export interface CardTypings {
  subtypes: string[]
  supertypes: string[]
  types: string[]
}

export interface Card extends CardTypings {
  cmc: number
  id: string
  manaCost?: string
  name: string
  text: string
  set: string
  setName: string
  rarity: string
  type: string
}

export type MaxCardLength = 30
export type MinCardLength = 20