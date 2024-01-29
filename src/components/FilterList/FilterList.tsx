import type { Typing } from '@/src/types/Card'
import type { Set } from '@/src/types/Set'
import type { FilterLabel } from '@/src/types/Filter'
import { capitalizeFirstLetter } from '@/helpers/text'
import style from './FilterList.module.scss'
import { InputCheckboxWithLabel } from '@/src/components/InputCheckboxWithLabel/InputCheckboxWithLabel'

interface KeyNameAndLabel {
  key: string
  name: string
}

export function FilterList ({
  filters,
  label,
  wasReset,
  checkIfChecked,
  onChange
}: Readonly<{
  filters: string[] | Set[]
  label: Typing | 'sets'
  wasReset: boolean[]
  checkIfChecked: (name: string) => boolean
  onChange: (value: string, filterLabel?: FilterLabel) => void
}>) {
  const getKeyAndName = (filter: typeof filters[number]): KeyNameAndLabel => {
    if(typeof filter === 'string'){
      return {
        key: filter,
        name: filter,
      }
    }
    else {
      return {
        key: filter.code,
        name: filter.name
      }
    }
  }
  if(filters && filters.length > 0){
    return (
      <div>
        <span className={style['filter-list__label']}>
          {capitalizeFirstLetter(label)}
        </span>
        <ul className={style['filter-list']}>
          {filters.map(filter => getKeyAndName(filter)).map(filter => (
            <li key={filter.key} className={style['filter-list__item']}>
              <InputCheckboxWithLabel
                onChange={onChange}
                name={filter.name} 
                label={filter.name}
                filterLabel={label}
                checkIfChecked={checkIfChecked}
                wasReset={wasReset}
              />
            </li>
          ))}
        </ul>
      </div>
    )
  }
}