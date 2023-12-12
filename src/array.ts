export {
  toArray,
  flattenArrayable,
  mergeArrayable,
  partition,
  uniq,
  uniqueBy,
  last,
  remove,
  at,
  range,
  move,
  clampArrayRange,
  sample,
  shuffle,
} from '@antfu/utils'

/**
 * Returns a new array with element at indexes of old array
 */
export function arrayFromIndexes(arr: any[], idxs: number[]) {
  const _arr: typeof arr = []
  idxs.forEach((idx, i) => { _arr[i] = arr[idx] })

  return _arr
}
