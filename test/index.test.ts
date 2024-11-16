import { expect, it } from 'vitest'
import { arrayFromIndexes } from '~/array'

it('array/arrayFromIndexes', () => {
  const arr = ['a', 'b', 'c', 'd']
  expect(arrayFromIndexes(arr, [1, 3])).toEqual(['b', 'd'])
})
