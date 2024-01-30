import type { FetchConditions } from '@/src/types/FetchConditions'
import { removeLastCharacter, removeTwoLastCharacters } from '@/helpers/text'

export const createFetchQueryString = <T>(condition: FetchConditions< Partial<T> >): string => {
  const queryKeys = Object.keys(condition) as (keyof T)[]
  let query = ''
  for(const key of queryKeys) {
    const currentCondition = condition[key]
    if(typeof currentCondition === 'string'){
      query += `${key.toString()}=${currentCondition}||`
    }
    else if(Object.hasOwn(currentCondition, 'ors') && currentCondition.ors.length > 0 || (currentCondition.ands && currentCondition.ands.length > 0)) {
      query += `${key.toString()}=`
      if(currentCondition.ors.length > 0){
        for(const or of currentCondition.ors) {
          query += `${or},`
        }
      }
      if(query[query.length - 1] === ','){
        query = removeLastCharacter(query)
      }
      if(currentCondition.ands){
        for(const and of currentCondition.ands) {
          query += `${and},`
        }
      }
      if(query[query.length - 1] === '|'){
        query = removeLastCharacter(query)
      }
    }
  }
  if(query.slice(query.length - 2) === '||'){
    query = removeTwoLastCharacters(query)
  }
  return query
}