import { arrayFromIndexes } from '#src/array.js'
import { expect, it } from 'vitest'

it('array/arrayFromIndexes', () => {
  const arr = ['a', 'b', 'c', 'd']
  expect(arrayFromIndexes(arr, [1, 3])).toEqual(['b', 'd'])
})
