import type { Typing } from '@/types/Card'
import type { Set } from '@/types/Set'
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
  onChange
}: Readonly<{
  filters: string[] | Set[]
  label: Typing | 'sets'
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
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
            />
          </li>
        ))}
      </ul>
    </div>
  )
}