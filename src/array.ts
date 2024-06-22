/**
 * Returns a new array with element at indexes of old array
 */
export function arrayFromIndexes(arr: any[], idxs: number[]): any[] {
  return idxs.map(idx => arr[idx])
}
