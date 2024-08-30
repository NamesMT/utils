import type { Extends } from './types'

/**
 * Returns a new array with element at indexes of old array
 */
export function arrayFromIndexes(arr: any[], idxs: number[]): any[] {
  return idxs.map(idx => arr[idx])
}

type KeyedByInternal<T, S extends PropertyKey> = S extends keyof T ? {
  [K in T[S] as Extends<K, PropertyKey>]: Extends<T, Record<S, K>>
} : never

export type KeyedBy<A, S extends PropertyKey> = A extends Array<infer T>
  ? KeyedByInternal<T, S>
  : never

export function keyBy<A extends Array<Record<PropertyKey, any>>, B extends keyof A[number], I extends B | ((v: A[number]) => PropertyKey)>(array: A, iteratee: I): I extends B ? KeyedBy<A, I> : { [key: PropertyKey]: A[number] } {
  const acc: any = {}
  for (let i = 0; i < array.length; ++i) {
    acc[
      (typeof iteratee === 'function')
        ? iteratee(array[i])
        : array[i][iteratee as B]
    ] = array[i]
  }

  return acc
}
