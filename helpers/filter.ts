import type { Set } from '@/src/types/Set'

export const toggleStringFilter = (array: string[], value: string): string[] => {
  const filter = array.find(item => item === value)
  if(filter){
    return array.filter(item => item !== filter)
  }
  else {
    return [
      ...array,
      value
    ]
  }
}
export const toggleSetFilter = (setArray: Set[], newSet: Set): Set[] => {
  const set = setArray.find(item => item.code === newSet.code)
  if(set){
    return setArray.filter(set => set.code !== newSet.code)
  }
  else {
    return [
      ...setArray,
      newSet
    ]
  }
}