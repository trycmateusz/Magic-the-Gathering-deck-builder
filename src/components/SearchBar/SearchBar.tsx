import style from './SearchBar.module.scss'
import { useState } from 'react'
import { InputWithLabel } from '@/src/components/InputWithLabel/InputWithLabel'
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
  function OptionList({
    hasOptions,
  }: Readonly<{
    hasOptions: boolean
  }>) {
    if(options && hasOptions){
      return (
        <ul className={style['search-bar__options']}>
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
          <span className={style['search-bar__options-error']}>
            No results found.
          </span>
        </div>
      )
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