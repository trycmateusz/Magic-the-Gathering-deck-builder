import style from './Aside.module.scss'
import Image from 'next/image'
import { GeneralMana } from '@/src/components/GeneralMana/GeneralMana'
import { CardCounter } from '@/src/components/CardCounter/CardCounter'
import { InputWithLabel } from '@/src/components/InputWithLabel/InputWithLabel'
import { FilterList } from '@/src/components/FilterList/FilterList'

export function Aside () {
  const filters = ['a', 'b', 'bardzo dlugie c dlaczgeo to jest az takie dlugie', 'a', 'b', 'a', 'b','a', 'b', 'a', 'b', 'a', 'b', 'a', 'b', 'a', 'b']
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const element = e.target as HTMLInputElement
    console.log(element.value)
  }
  return (
    <aside className={style['aside']}>
      <div className={style['aside__info']}>
        <GeneralMana />
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
          onChange={handleOnChange}
          label="Name" 
          name="name" 
          type="text" 
        />
        <FilterList 
          onChange={handleOnChange} 
          label="types" 
          filters={filters} 
        />
      </div>
    </aside>
  )
}