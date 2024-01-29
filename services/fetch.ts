const baseApiUrl = 'https://api.magicthegathering.io/v1'
const queries: string[] = []

export const fetchOnCondition = async <T>(collection: string, query: string): Promise<T[] | undefined> => {
  if(!queries.includes(query)){
    interface TResponse {
      [key: string]: T[]
    }
    try {
      const url = new URL(`${baseApiUrl}/${collection}?${query}`)
      const res = await fetch(url)
      if(!res.ok){
        throw new Error(`Error while fetching ${collection}`)
      }
      const data = await (res.json() as Promise<TResponse>)
      if(data && Object.hasOwn(data, collection)){
        queries.push(query)
        return data[collection]
      }
    }
    catch(error){
      console.error(`Error while fetching ${collection}: ${error}`)
      return
    }
  }
}