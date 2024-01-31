const baseApiUrl = 'https://api.magicthegathering.io/v1'
import type { CardPageSize } from '@/src/types/Card'

export const fetchOnCondition = async <T>(collection: string, query: string): Promise<T[] | undefined> => {
  interface TResponse {
    [key: string]: T[]
  }
  try {
    const pageSize: CardPageSize = 40
    const url = new URL(`${baseApiUrl}/${collection}?${query}&pageSize=${pageSize}`)
    const res = await fetch(url)
    if(!res.ok){
      throw new Error(`Error while fetching ${collection}`)
    }
    const data = await (res.json() as Promise<TResponse>)
    if(data && Object.hasOwn(data, collection)){
      return data[collection]
    }
  }
  catch(error){
    console.error(`Error while fetching ${collection}: ${error}`)
    return
  }
}