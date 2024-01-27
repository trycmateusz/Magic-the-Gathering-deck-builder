import Image from 'next/image'
import style from './CardCounter.module.scss'

export function CardCounter () {
  const cardsLength = 12
  const maxCards = 30
  const minCards = 20
  return (
    <div className={style['card-counter']}>
      <div className={style['card-counter__count']}>
        <span>
          {cardsLength}
        </span>
        <Image 
          src="/text-breaker.svg" 
          alt="" 
          width="4" 
          height="10" 
        />
        <span>
          {maxCards}
        </span>
        <Image
          className={style['card-counter__image']}
          src="/cards.svg" 
          alt="" 
          width="30" 
          height="30" 
        />
      </div>
      <span className={style['card-counter__min']}>
        min. {minCards}
      </span>
    </div>
  )
}