import style from './SearchBar.module.scss'
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
  options: Set[] | string[]
  onChange: (value: string) => void
  onOptionChosen: (option: typeof options[number]) => void
  value: string
}>) {
  const searchBarOptionClassname = (() => {
    return `main-transition ${style['search-bar__options-one']}`
  })()
  const getKeyAndText = (option: typeof options[number]): KeyAndText => {
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
  function OptionList({
    hasOptions,
  }: Readonly<{
    hasOptions: boolean
  }>) {
    if(hasOptions){
      return (
        <ul className={style['search-bar__options']}>
        {options.map(option => (
          <li key={getKeyAndText(option).key}>
            <button onClick={() => onOptionChosen(option)} className={searchBarOptionClassname}>
              {getKeyAndText(option).text}
            </button>
          </li>
        ))}
      </ul>
      )
    }
  }
  return (
    <div className={style['search-bar']}>
      <InputWithLabel 
        label={label} 
        type="text"
        name="searchSet"
        value={value}
        onChange={onChange}
      />
      <OptionList hasOptions={options && options.length > 0} />
    </div>
  )
}