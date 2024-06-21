/**
 * Returns a new array with element at indexes of old array
 */
export function arrayFromIndexes(arr: any[], idxs: number[]): any[] {
  const _arr: typeof arr = []
  idxs.forEach((idx, i) => { _arr[i] = arr[idx] })

  return _arr
}
