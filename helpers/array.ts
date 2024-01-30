export const checkIfTwoStringArraysHaveAnyMatch = (first: string[], second: string[]) => {
  let hasAnyMatch = false
  for(const value in first){
    if(hasAnyMatch) continue
    if(second.includes(value)){
      hasAnyMatch = true
    }
  }
  return hasAnyMatch
}