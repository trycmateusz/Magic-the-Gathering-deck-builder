import Image from 'next/image'
import style from './GeneralMana.module.scss'

export function GeneralMana() {
  const mana = 10
  return (
    <div className={style['general-mana']}>
      <Image
        src="/mana-wheel.svg"
        priority={true}
        width="195"
        height="185"
        alt="A pentagon shape wheel consisting of all Magic the Gathering different manas." 
      />
      <span className={style['general-mana__counter']}>
        {mana}
      </span>
    </div>
  )
}