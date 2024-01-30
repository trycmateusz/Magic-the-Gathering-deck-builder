import type { Set } from '@/src/types/Set'
import type { Card } from '@/src/types/Card'
import Head from 'next/head'
import Layout from '@/app/layout'
import { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/src/hooks/redux'
import { Aside } from '@/src/components/Aside/Aside'
import { CardList } from '@/src/components/CardList/CardList'
import { addSet } from '@/redux/setSlice'
import { addCard } from '@/redux/cardSlice'
import { fetchOnCondition } from '@/services/fetch'
import { createFetchQueryString } from '@/helpers/query'
import { toggleStringFilter, toggleSetFilter } from '@/helpers/filter'

export default function Home() {
  const debounceTimeInMiliseconds = 700
  const dispatch = useAppDispatch()
  const cards = useAppSelector(state => state.card.cards)
  const [filterSets, setFilterSets] = useState<Set[]>([])
  const [filterTypes, setFilterTypes] = useState<string[]>([])
  const [filterSubtypes, setFilterSubtypes] = useState<string[]>([])
  const [filterSupertypes, setFilterSupertypes] = useState<string[]>([])
  const [debouncedCardName, setDebouncedCardName] = useState('')
  const [debouncedSetName, setDebouncedSetName] = useState('')
  useEffect(() => {
    if(debouncedSetName !== ''){
      const fetchSets = async () => {
        const query = createFetchQueryString<Set>({
          name: debouncedSetName
        })
        const sets = await fetchOnCondition<Set>('sets', query)
        if(sets){
          for(const set of sets){
            dispatch(addSet(set))
          }
        }
      }
      fetchSets()
    }
  }, [debouncedSetName, dispatch])
  useEffect(() => {
    const areAnyFiltersOnTimeoutId = setTimeout(() => {
      if (
        filterSets.length > 0 ||
        filterTypes.length > 0 ||
        filterSubtypes.length > 0 ||
        filterSupertypes.length > 0 ||
        debouncedCardName !== ''
      ) {
        const fetchCards = async () => {
          const query = createFetchQueryString<Card>({
            name: debouncedCardName,
            setName: {
              ors: filterSets.map(set => set.name)
            },
            types: {
              ors: [...filterTypes]
            },
            subtypes: {
              ors: [...filterSubtypes]
            },
            supertypes: {
              ors: [...filterSupertypes]
            }
          })
          const cards = await fetchOnCondition<Card>('cards', query)
          if(cards){
            for(const card of cards){
              dispatch(addCard(card))
            }
          }
        }
        fetchCards()
      }
    }, debounceTimeInMiliseconds)
    return () => {
      clearTimeout(areAnyFiltersOnTimeoutId)
    }
  }, [filterSets, filterTypes, filterSubtypes, filterSupertypes, debouncedCardName, dispatch])
  return (
    <Layout>
      <Head>
        <title>
          MTG - Make a deck
        </title>
        <meta property="description" content="Make your own Magic the Gathering decck using cards and info provided by magicthegathering.io" />
      </Head>
      <div className="grid grid-cols-2 md:grid-cols-[1fr_2fr]">
        <Aside
          debounceTimeInMiliseconds={debounceTimeInMiliseconds}
          filterSets={filterSets}
          filterTypes={filterTypes}
          filterSubtypes={filterSubtypes}
          filterSupertypes={filterSupertypes}
          setFilterSets={(set: Set) => setFilterSets(prev => toggleSetFilter(prev, set))}
          setFilterTypes={(value: string) => setFilterTypes(prev => toggleStringFilter(prev, value))}
          setFilterSubtypes={(value: string) => setFilterSubtypes(prev => toggleStringFilter(prev, value))}
          setFilterSupertypes={(value: string) => setFilterSupertypes(prev => toggleStringFilter(prev, value))}
          setDebouncedCardName={(value: string) => setDebouncedCardName(value)}
          setDebouncedSetName={(value: string) => setDebouncedSetName(value)}
          resetFilterSets={() => setFilterSets([])}
          resetFilterTypes={() => setFilterTypes([])}
          resetFilterSubtypes={() => setFilterSubtypes([])}
          resetFilterSupertypes={() => setFilterSupertypes([])}
        />
        <main className="p-5">
          <h1 className="text-3xl mb-5">
            Add new cards
          </h1>
          <CardList forAdding={true} cards={cards} />
        </main>
      </div>
    </Layout>
  )
}
