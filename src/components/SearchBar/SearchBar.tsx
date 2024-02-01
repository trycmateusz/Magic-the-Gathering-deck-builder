import style from './SearchBar.module.scss'
import { useState } from 'react'
import { useAppSelector } from '@/src/hooks/redux'
import { InputWithLabel } from '@/src/components/InputWithLabel/InputWithLabel'
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner'
import type { Set } from '@/src/types/Set'

interface KeyAndText {
  key: string
  text: string
}

export function SearchBar({
  label,
  options,
  onChange,
  onOptionChosen,
  value
}: Readonly<{
  label: string
  options: Set[] | string[] | undefined
  onChange: (value: string) => void
  onOptionChosen: (option: NonNullable<typeof options>[number]) => void
  value: string
}>) {
  const setsLoading = useAppSelector(state => state.loading.setsLoading)
  const [isFocusedOnSearch, setIsFocusedOnSearch] = useState(false)
  const searchBarOptionClassname = (() => {
    return `main-transition ${style['search-bar__options-one']}`
  })()
  const getKeyAndText = (option: NonNullable<typeof options>[number]): KeyAndText => {
    if(typeof option === 'string'){
      return {
        key: option,
        text: option
      }
    }
    else {
      return {
        key: option.code,
        text: option.name
      }
    }
  }
  const handleOptionChosen = (option: NonNullable<typeof options>[number]) => {
    onOptionChosen(option)
    setIsFocusedOnSearch(false)
  }
  const loadingMessageClassName = (() => {
    return `${style['search-bar__options-message']} text-mana-gray`
  })()
  function OptionList({
    hasOptions,
  }: Readonly<{
    hasOptions: boolean
  }>) {
    if(setsLoading){
      return (
        <div className={style['search-bar__options']}>
          <span className={loadingMessageClassName}>
            <span>
              Loading
            </span>
            <LoadingSpinner 
              isLoading={true}
              size="0.5rem"
              styling={{ height: '1rem', width: '1rem', display: 'block' }} 
            />
          </span>
        </div>
      )
    }
    else {
      if(options && hasOptions){
        return (
          <ul aria-label="Search bar results" className={style['search-bar__options']}>
          {options.map(option => (
            <li key={getKeyAndText(option).key}>
              <button onMouseDown={() => handleOptionChosen(option)} className={searchBarOptionClassname}>
                {getKeyAndText(option).text}
              </button>
            </li>
          ))}
        </ul>
        )
      }
      else if(!!options && options.length === 0){
        return (
          <div className={style['search-bar__options']}>
            <span className={style['search-bar__options-message']}>
              No results found.
            </span>
          </div>
        )
      }
      else {
        return (
          null
        )
      }
    }
  }
  return (
    <div data-searching={isFocusedOnSearch} className={style['search-bar']}>
      <InputWithLabel
        label={label} 
        type="text"
        name="searchSet"
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocusedOnSearch(true)}
        onBlur={() => setIsFocusedOnSearch(false)}
      />
      <OptionList hasOptions={!!options && options.length > 0} />
    </div>
  )
}