import Image from 'next/image'
import style from './AverageMana.module.scss'
import { useAppSelector } from '@/src/hooks/redux'

export function AverageMana({ 
  mana 
}: Readonly<{
  mana: number
}>) {
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