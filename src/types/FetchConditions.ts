interface FetchCondition {
  ors: string[]
  ands?: string[]
}

export type FetchConditions<T> = {
  [key in keyof T]: FetchCondition | string
}