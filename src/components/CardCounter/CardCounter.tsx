import Image from 'next/image'
import style from './CardCounter.module.scss'
import { BackgroundGlow } from '@/src/components/BackgroundGlow/BackgroundGlow'
import { useAppSelector } from '@/src/hooks/redux'

export function CardCounter ({ 
  cardsLength 
}: Readonly<{
  cardsLength: number
}>) {
  const maxCards = useAppSelector(state => state.card.maxCards)
  const minCards = useAppSelector(state => state.card.minCards)
  const hasMinimumAmountOfCards = () => {
    return cardsLength >= minCards
  }
  const cardCounterMinTextClassname = (() => {
    if(hasMinimumAmountOfCards()){
      return `${style['card-counter__min-text']} ${style['card-counter__min-text--active']}`
    }
    else {
      return `${style['card-counter__min-text']}`
    }
  })()
  return (
    <div className={style['card-counter']}>
      <div aria-label="Amount of cards in your deck and deck's max length" className={style['card-counter__count']}>
        <span>
          {cardsLength}
        </span>
        /
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
      <div className={style['card-counter__min']}>
        <span aria-label="Deck's minimum length" className={cardCounterMinTextClassname}>
          min. {minCards}
        </span>
        <BackgroundGlow conditionMet={hasMinimumAmountOfCards()} />
      </div>
    </div>
  )
}