const baseApiUrl = 'https://api.magicthegathering.io/v1'

export const fetchCollection = async <T>(collection: string): Promise<T[] | undefined> => {
  interface TResponse {
    [key: string]: T[]
  }
  try {
    const res = await fetch(`${baseApiUrl}/${collection}`)
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