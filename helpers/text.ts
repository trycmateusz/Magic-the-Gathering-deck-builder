export const capitalizeFirstLetter = (string: string) => {
  return string[0].toUpperCase().concat(string.slice(1))
}

export const removeLastCharacter = (string: string) => {
  return string.substring(0, string.length - 1)
}

export const removeTwoLastCharacters = (string: string) => {
  return string.substring(0, string.length - 2)
}