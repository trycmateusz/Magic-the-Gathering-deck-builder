'use client'

import Layout from '@/app/layout'
import Link from 'next/link'
import { Aside } from '@/src/components/Aside/Aside'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAppSelector, useAppDispatch } from '@/src/hooks/redux'
import { CardList } from '@/src/components/CardList/CardList'
import { AsideExpander } from '@/src/components/AsideExpander/AsideExpander'
import { resetFilteredDeck } from '@/redux/cardSlice'

export default function Deck() {
  function RenderCardList () {
    if(deck){
      if(deckFiltered){
        if(deckFiltered.length > 0){
          return (
            <CardList forDeck={true} cards={deckFiltered} />
          )
        }
        else {
          return (
            <div className="flex flex-col">
              <span>
                No cards matching the filters.
              </span>
              <span>
                Reset or change them to see your cards.
              </span>
            </div>
          )
        }
      }
      else if(deck.length > 0){
        return (
          <CardList forDeck={true} cards={deck} />
        )
      }
      else {
        return (
          <div className="flex flex-col">
            <span>
              It seems you haven&apos;t added any cards to your deck.
            </span>
            <span>
              Go on and <Link href="/">add some!</Link>
            </span>
          </div>
        )
      }
    }
    else {
      return (
        null
      )
    }
  }
  const dispatch = useAppDispatch()
  const router = useRouter()
  const deckFiltered = useAppSelector(state => state.card.deckFiltered)
  const deck = useAppSelector(state => state.card.deck)
  const [asideFiltersExpandedOnMobile, setAsideFiltersExpandedOnMobile] = useState(false)
  useEffect(() => {
    if(!deck){
      router.push('/')
    }
  })
  useEffect(() => {
    dispatch(resetFilteredDeck())
  }, [dispatch])
  useEffect(() => {
    if(asideFiltersExpandedOnMobile){
      document.body.classList.add('body-fixed')
    }
    else {
      document.body.classList.remove('body-fixed')
    }
  }, [asideFiltersExpandedOnMobile])
  return (
    <Layout>
      <div className="app">
        <AsideExpander 
          expanded={asideFiltersExpandedOnMobile} 
          setExpanded={(value: boolean) => setAsideFiltersExpandedOnMobile(value)} 
        />
        <Aside forDeck={true} filtersExpanded={asideFiltersExpandedOnMobile}/>
        <main className="p-5">
        <h1 className="text-3xl mb-5">
          My deck
        </h1>
        <RenderCardList />
        </main>
      </div>
    </Layout>
  )
}
