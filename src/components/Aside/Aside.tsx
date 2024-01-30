import type { FilterLabel } from '@/src/types/Filter'
import type { Set } from '@/src/types/Set'
import type { Dispatch } from 'react'
import style from './Aside.module.scss'
import Image from 'next/image'
import { useState, useEffect, SetStateAction } from 'react'
import { useAppSelector } from '@/src/hooks/redux'
import { AverageMana } from '@/src/components/AverageMana/AverageMana'
import { CardCounter } from '@/src/components/CardCounter/CardCounter'
import { InputWithLabel } from '@/src/components/InputWithLabel/InputWithLabel'
import { FilterList } from '@/src/components/FilterList/FilterList'
import { SearchBar } from '@/src/components/SearchBar/SearchBar'

export function Aside ({
  debounceTimeInMiliseconds,
  filterSets,
  filterTypes,
  filterSubtypes,
  filterSupertypes,
  setFilterSets,
  setFilterTypes,
  setFilterSubtypes,
  setFilterSupertypes,
  setDebouncedCardName,
  setDebouncedSetName,
  resetFilterSets,
  resetFilterTypes,
  resetFilterSubtypes,
  resetFilterSupertypes
 }: Readonly<{
  debounceTimeInMiliseconds: number
  filterSets: Set[]
  filterTypes: string[]
  filterSubtypes: string[]
  filterSupertypes: string[]
  setFilterSets: (set: Set) => void
  setFilterTypes: (value: string) => void
  setFilterSubtypes: (value: string) => void
  setFilterSupertypes: (value: string) => void
  setDebouncedCardName: (value: string) => void
  setDebouncedSetName: (value: string) => void
  resetFilterSets: () => void
  resetFilterTypes: () => void
  resetFilterSubtypes: () => void
  resetFilterSupertypes: () => void
 }>) {
  const types = useAppSelector(state => state.typing.types)
  const sets = useAppSelector(state => state.set.sets)
  const supertypes = useAppSelector(state => state.typing.supertypes)
  const subtypes = useAppSelector(state => state.typing.subtypes)
  const deck = useAppSelector(state => state.card.deck)
  const [deckLength, setDeckLength] = useState(deck.length)
  const [averageManaCost, setAverageManaCost] = useState(0)
  const [cardName, setCardName] = useState('')
  const [setName, setSetName] = useState('')
  const [wasReset, setWasReset] = useState<boolean[]>([])
  const handleCheckedChange = (value: string, filterLabel?: FilterLabel) => {
    if(filterLabel === 'types') {
      setFilterTypes(value)
    }
    else if (filterLabel === 'subtypes') {
      setFilterSubtypes(value)
    }
    else if (filterLabel === 'supertypes') {
      setFilterSupertypes(value)
    }
    else {
      const set = sets.find(set => set.name === value)
      if(set){
        setFilterSets(set)
      }
    }
  }
  const handleCardNameChange = (value: string) => {
    setCardName(value)
  }
  const handleSetNameChange = (value: string) => {
    setSetName(value)
  }
  const handleToggleSetFilter = (value: Set | string) => {
    if(typeof value === 'string'){
      const set = sets.find(set => set.name === value)
      if(set){
        setFilterSets(set)
      }
    }
    else {
      setFilterSets(value)
    }
    setSetName('')
  }
  const resetFilters = () => {
    setCardName('')
    setSetName('')
    resetFilterSets()
    resetFilterTypes()
    resetFilterSubtypes()
    resetFilterSupertypes()
    setWasReset(prev => [ ...prev, true ])
  }
  useEffect(() => {
    const delayInputTimeoutId = setTimeout(() => {
      setDebouncedSetName(setName)
    }, debounceTimeInMiliseconds)
    return () => {
      clearTimeout(delayInputTimeoutId)
    }
  }, [setName, debounceTimeInMiliseconds])
  useEffect(() => {
    const delayInputTimeoutId = setTimeout(() => {
      setDebouncedCardName(cardName)
    }, debounceTimeInMiliseconds)
    return () => {
      clearTimeout(delayInputTimeoutId)
    }
  }, [cardName, debounceTimeInMiliseconds])
  useEffect(() => {
    if(deck.length > 0){
      setDeckLength(deck.length)
      setAverageManaCost(+(deck.reduce((prev, current) => prev + current.cmc, 0) / deck.length).toFixed(1))
    }
  }, [deck])
  return (
    <aside className={style['aside']}>
      <div className={style['aside__info']}>
        <span className={style['aside__info-text']}>
          Deck&apos;s average mana cost
        </span>
        <AverageMana mana={averageManaCost} />
        <CardCounter cardsLength={deckLength} />
      </div>
      <button onClick={resetFilters} className={`main-transition ${style['aside__reset']}`}>
        <span>Reset filters</span>
        <Image
          className={style['aside__reset-image']}
          src="/reset-filters.svg" 
          alt="" 
          width="36" 
          height="36" 
        />
      </button>
      <div className={style['aside__filters']}>
        <InputWithLabel 
          onChange={handleCardNameChange}
          label="Name" 
          name="name"
          value={cardName}
          type="text" 
        />
        <SearchBar
          value={setName}
          options={setName !== '' ? sets.filter(set => set.name.toLowerCase().includes(setName)) : undefined}
          label="Search for a set"
          onChange={handleSetNameChange}
          onOptionChosen={handleToggleSetFilter}
        />
        <FilterList
          onChange={handleToggleSetFilter}
          label="sets"
          filters={filterSets}
          checkIfChecked={(name: string) => filterSets.find(set => set.name === name) !== undefined}
          wasReset={wasReset}
        />
        <FilterList 
          onChange={handleCheckedChange} 
          label="types" 
          filters={types}
          checkIfChecked={(name: string) => filterTypes.includes(name)}
          wasReset={wasReset}
        />
        <FilterList 
          onChange={handleCheckedChange} 
          label="subtypes" 
          filters={subtypes}
          checkIfChecked={(name: string) => filterSubtypes.includes(name)}
          wasReset={wasReset}
        />
        <FilterList 
          onChange={handleCheckedChange} 
          label="supertypes" 
          filters={supertypes} 
          checkIfChecked={(name: string) => filterSupertypes.includes(name)}
          wasReset={wasReset}
        />
      </div>
    </aside>
  )
}