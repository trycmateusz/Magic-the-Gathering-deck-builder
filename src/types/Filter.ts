import type { CardTypings, Typing } from './Card'
import type { Set } from './Set'

export interface Filters extends CardTypings {
  sets: Set[]
  cardName: string
  setName: string
}

export type FilterLabel = Typing | 'sets'