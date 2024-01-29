import type { FetchConditions } from '@/src/types/FetchConditions'
import { removeLastCharacter, removeTwoLastCharacters } from '@/helpers/text'

export const createFetchQueryString = <T>(condition: FetchConditions< Partial<T> >): string => {
  const queryKeys = Object.keys(condition) as (keyof T)[]
  let query = ''
  queryKeys.forEach(key => {
    const currentCondition = condition[key]
    if(typeof currentCondition === 'string'){
      query += `${key.toString()}=${currentCondition}||`
    }
    else if(Object.hasOwn(currentCondition, 'ors') && currentCondition.ors.length > 0 || (currentCondition.ands && currentCondition.ands.length > 0)) {
      query += `${key.toString()}=`
      if(currentCondition.ors.length > 0){
        currentCondition.ors.forEach(or => {
          query += `${or},`
        })
      }
      if(query[query.length - 1] === ','){
        query = removeLastCharacter(query)
      }
      currentCondition.ands?.forEach(and => {
        query += `${and}|`
      })
      if(query[query.length - 1] === '|'){
        query = removeLastCharacter(query)
      }
    }
  })
  if(query.slice(query.length - 2) === '||'){
    query = removeTwoLastCharacters(query)
  }
  return query
}