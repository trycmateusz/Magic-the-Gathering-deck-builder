import style from './Aside.module.scss'
import Image from 'next/image'
import GeneralMana from '@/src/components/GeneralMana'
import CardCounter from '@/src/components/CardCounter'

export default function Aside () {
  return (
    <aside className={style['aside']}>
      <div className={style['aside__info']}>
        <GeneralMana />
        <CardCounter />
      </div>
      <button className={`main-transition ${style['aside__reset']}`}>
        <span>Reset filters</span>
        <Image 
          src="/reset-filters.svg" 
          alt="" 
          width="36" 
          height="36" 
        />
      </button>
    </aside>
  )
}