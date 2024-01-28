import type { FilterLabel } from '@/src/types/Filter'
import type { Set } from '@/src/types/Set'
import style from './Aside.module.scss'
import Image from 'next/image'
import { useAppDispatch, useAppSelector } from '@/src/hooks/redux'
import { AverageMana } from '@/src/components/AverageMana/AverageMana'
import { CardCounter } from '@/src/components/CardCounter/CardCounter'
import { InputWithLabel } from '@/src/components/InputWithLabel/InputWithLabel'
import { FilterList } from '@/src/components/FilterList/FilterList'
import { SearchBar } from '@/src/components/SearchBar/SearchBar'
import { toggleSetFilter, toggleSubtype, toggleSupertype, toggleType, setCardName, setSetName } from '@/src/redux/filterSlice'

export function Aside () {
  const dispatch = useAppDispatch()
  const types = useAppSelector(state => state.typing.types)
  const sets = useAppSelector(state => state.set.sets)
  const supertypes = useAppSelector(state => state.typing.supertypes)
  const subtypes = useAppSelector(state => state.typing.subtypes)
  const cardName = useAppSelector(state => state.filter.cardName)
  const setName = useAppSelector(state => state.filter.setName)
  const filterSets = useAppSelector(state => state.filter.sets)
  const filterTypes = useAppSelector(state => state.filter.types)
  const filterSubtypes = useAppSelector(state => state.filter.subtypes)
  const filterSupertypes = useAppSelector(state => state.filter.supertypes)
  const handleCheckedChange = (value: string, filterLabel?: FilterLabel) => {
    if(filterLabel === 'types') {
      dispatch(toggleType(value))
    }
    else if (filterLabel === 'subtypes') {
      dispatch(toggleSubtype(value))
    }
    else if (filterLabel === 'supertypes') {
      dispatch(toggleSupertype(value))
    }
    else {
      const set = sets.find(set => set.name === value)
      if(set){
        dispatch(toggleSetFilter(set))
      }
    }
  }
  const handleCardNameChange = (value: string) => {
    dispatch(setCardName(value))
  }
  const handleSetNameChange = (value: string) => {
    dispatch(setSetName(value))
  }
  const handleToggleSetFilter = (value: Set | string) => {
    if(typeof value === 'string'){
      const set = sets.find(set => set.name === value)
      if(set){
        dispatch(toggleSetFilter(set))
      }
    }
    else {
      dispatch(toggleSetFilter(value))
    }
    dispatch(setSetName(''))
  }
  return (
    <aside className={style['aside']}>
      <div className={style['aside__info']}>
        <span className={style['aside__info-text']}>
          Deck&apos;s average mana cost
        </span>
        <AverageMana />
        <CardCounter />
      </div>
      <button className={`main-transition ${style['aside__reset']}`}>
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
          options={setName !== '' ? sets.filter(set => set.name.toLowerCase().includes(setName)) : []}
          label="Search for a set"
          onChange={handleSetNameChange}
          onOptionChosen={handleToggleSetFilter}
        />
        <FilterList
          onChange={handleToggleSetFilter}
          label="sets"
          filters={filterSets}
          checkIfCheckedOnInit={(name: string) => filterSets.find(set => set.name === name) !== undefined}
        />
        <FilterList 
          onChange={handleCheckedChange} 
          label="types" 
          filters={types}
          checkIfCheckedOnInit={(name: string) => filterTypes.includes(name)}
        />
        <FilterList 
          onChange={handleCheckedChange} 
          label="subtypes" 
          filters={subtypes}
          checkIfCheckedOnInit={(name: string) => filterSubtypes.includes(name)}
        />
        <FilterList 
          onChange={handleCheckedChange} 
          label="supertypes" 
          filters={supertypes} 
          checkIfCheckedOnInit={(name: string) => filterSupertypes.includes(name)}
        />
      </div>
    </aside>
  )
}