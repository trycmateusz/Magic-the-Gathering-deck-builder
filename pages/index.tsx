import Head from 'next/head'
import Layout from '@/app/layout'
import { useEffect, useState } from 'react'
import { useAppSelector, useAppDispatch } from '@/src/hooks/redux'
import { Aside } from '@/src/components/Aside/Aside'
import { AsideExpander } from '@/src/components/AsideExpander/AsideExpander'
import { CardList } from '@/src/components/CardList/CardList'
import { LoadingSpinner } from '@/src/components/LoadingSpinner/LoadingSpinner'
import { resetFilteredCards } from '@/redux/cardSlice'

export default function Home() {
  function RenderCardList () {
    if(cardsLoading){
      return (
        <div className="flex gap-2 text-base text-mana-gray">
          <span>Loading</span>
          <LoadingSpinner isLoading={cardsLoading} size="0.75rem" styling={{ width: '1.5rem', height: '1.5rem', color: 'inherit' }} />
        </div>
      )
    }
    else {
      if(cardsFiltered){
        if(cardsFiltered.length > 0){
          return (
            <CardList forAdding={true} cards={cardsFiltered} />
          )
        }
        else {
          return (
            <span>
              No cards found. Try changing filters.
            </span>
          )
  
        }
      }
      else {
        return (
          <span>
            Get started by selecting some of the filters on the side.
          </span>
        )
      }
    }
  }
  const dispatch = useAppDispatch()
  const cardsFiltered = useAppSelector(state => state.card.cardsFiltered)
  const cardsLoading = useAppSelector(state => state.loading.cardsLoading)
  const [asideFiltersExpandedOnMobile, setAsideFiltersExpandedOnMobile] = useState(false)
  useEffect(() => {
    dispatch(resetFilteredCards())
  }, [dispatch])
  useEffect(() => {
    if(asideFiltersExpandedOnMobile){
      document.body.classList.add('body-fixed')
    }
    else {
      document.body.classList.remove('body-fixed')
    }
  })
  return (
    <Layout>
      <Head>
        <title>
          MTG - Make a deck
        </title>
        <meta property="description" content="Make your own Magic the Gathering decck using cards and info provided by magicthegathering.io" />
      </Head>
      <div className="app">
        <AsideExpander 
          expanded={asideFiltersExpandedOnMobile} 
          setExpanded={(value: boolean) => setAsideFiltersExpandedOnMobile(value)} 
        />
        <Aside forDeck={false} filtersExpanded={asideFiltersExpandedOnMobile}/>
        <main className="p-5">
          <h1 className="text-3xl mb-5">
            Add new cards
          </h1>
          <RenderCardList />
        </main>
      </div>
    </Layout>
  )
}
