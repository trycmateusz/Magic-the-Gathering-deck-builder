import type { FilterLabel } from '@/src/types/Filter'
import type { Set } from '@/src/types/Set'
import type { Card } from '@/src/types/Card'
import style from './Aside.module.scss'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '@/src/hooks/redux'
import { fetchOnCondition } from '@/services/fetch'
import { createFetchQueryString } from '@/helpers/query'
import { toggleStringFilter, toggleSetFilter } from '@/helpers/filter'
import { AverageMana } from '@/src/components/AverageMana/AverageMana'
import { CardCounter } from '@/src/components/CardCounter/CardCounter'
import { InputWithLabel } from '@/src/components/InputWithLabel/InputWithLabel'
import { FilterList } from '@/src/components/FilterList/FilterList'
import { SearchBar } from '@/src/components/SearchBar/SearchBar'
import { addSet } from '@/redux/setSlice'
import { addCard } from '@/redux/cardSlice'

export function Aside () {
  const debounceTimeInMiliseconds = 700
  const dispatch = useAppDispatch()
  const types = useAppSelector(state => state.typing.types)
  const sets = useAppSelector(state => state.set.sets)
  const supertypes = useAppSelector(state => state.typing.supertypes)
  const subtypes = useAppSelector(state => state.typing.subtypes)
  const [cardName, setCardName] = useState('')
  const [setName, setSetName] = useState('')
  const [debouncedCardName, setDebouncedCardName] = useState('')
  const [debouncedSetName, setDebouncedSetName] = useState('')
  const [filterSets, setFilterSets] = useState<Set[]>([])
  const [filterTypes, setFilterTypes] = useState<string[]>([])
  const [filterSubtypes, setFilterSubtypes] = useState<string[]>([])
  const [filterSupertypes, setFilterSupertypes] = useState<string[]>([])
  const [wasReset, setWasReset] = useState<boolean[]>([])
  const handleCheckedChange = (value: string, filterLabel?: FilterLabel) => {
    if(filterLabel === 'types') {
      setFilterTypes(prev => toggleStringFilter(prev, value))
    }
    else if (filterLabel === 'subtypes') {
      setFilterSubtypes(prev => toggleStringFilter(prev, value))
    }
    else if (filterLabel === 'supertypes') {
      setFilterSupertypes(prev => toggleStringFilter(prev, value))
    }
    else {
      const set = sets.find(set => set.name === value)
      if(set){
        setFilterSets(prev => toggleSetFilter(prev, set))
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
        setFilterSets(prev => toggleSetFilter(prev, set))
      }
    }
    else {
      setFilterSets(prev => toggleSetFilter(prev, value))
    }
    setSetName('')
  }
  const resetFilters = () => {
    setCardName(() => '')
    setSetName(() => '')
    setFilterSets(() => [])
    setFilterTypes(() => [])
    setFilterSubtypes(() => [])
    setFilterSupertypes(() => [])
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
    if(debouncedSetName !== ''){
      const fetchSets = async () => {
        const query = createFetchQueryString<Set>({
          name: debouncedSetName
        })
        const sets = await fetchOnCondition<Set>('sets', query)
        if(sets){
          sets.forEach(set => {
            dispatch(addSet(set))
          })
        }
      }
      fetchSets()
    }
  }, [debouncedSetName, dispatch])
  useEffect(() => {
    const areAnyFiltersOnTimeoutId = setTimeout(() => {
      if (
        filterSets.length > 0 ||
        filterTypes.length > 0 ||
        filterSubtypes.length > 0 ||
        filterSupertypes.length > 0 ||
        debouncedCardName !== ''
      ) {
        const fetchCards = async () => {
          const query = createFetchQueryString<Card>({
            name: debouncedCardName,
            setName: {
              ors: filterSets.map(set => set.name)
            },
            types: {
              ors: [...filterTypes]
            },
            subtypes: {
              ors: [...filterSubtypes]
            },
            supertypes: {
              ors: [...filterSupertypes]
            }
          })
          const cards = await fetchOnCondition<Card>('cards', query)
          if(cards){
            cards.forEach(card => {
              dispatch(addCard(card))
            })
          }
        }
        fetchCards()
      }
    }, debounceTimeInMiliseconds)
    return () => {
      clearTimeout(areAnyFiltersOnTimeoutId)
    }
  }, [filterSets, filterTypes, filterSubtypes, filterSupertypes, debouncedCardName, dispatch])
  return (
    <aside className={style['aside']}>
      <div className={style['aside__info']}>
        <span className={style['aside__info-text']}>
          Deck&apos;s average mana cost
        </span>
        <AverageMana />
        <CardCounter />
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