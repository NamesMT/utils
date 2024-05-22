export {
  objectMap,
  isKeyOf,
  objectKeys,
  objectEntries,
  deepMerge,
  deepMergeWithArray,
  objectPick,
  clearUndefined,
  hasOwnProperty,
} from '@antfu/utils'

/**
 * Simple no recursive object get by path with `create` option
 */
export function objectGet<R = any>(obj: any, path: string | string[], create?: boolean): R {
  if (Object(obj) !== obj)
    throw new Error('Invalid \'obj\'')

  if (!path?.length)
    return obj

  path = Array.isArray(path) ? path : path.split('.')

  return path.reduce((prev, curr) => {
    if (create && prev)
      prev[curr] = prev[curr] ?? {}

    return prev && prev[curr]
  }, obj)
}

/**
 * Simple no recursive object set by path with `create` option
 */
export function objectSet<I = any, R = I>(obj: I, path: string | string[], value: any, create = true): R {
  if (Object(obj) !== obj)
    throw new Error('Invalid \'obj\'')

  if (!path?.length)
    throw new Error('Invalid \'path\'')

  path = Array.isArray(path) ? path : path.split('.')

  // Remove last index and assign to _path
  const _path = path.splice(-1)[0]

  // Get object omit the last index
  const _obj = objectGet(obj, path, create)

  // Set value for last index
  _obj[_path] = value

  return obj as any as R
}

/**
 * An alternate object get version that aligns with lodash
 * 
 * https://gist.github.com/andrewchilds/30a7fb18981d413260c7a36428ed13da?permalink_comment_id=4433741#gistcomment-4433741
 */
export function object_Get<T>(
  obj: unknown,
  query: string | Array<string | number>,
  defaultVal: (T | undefined) = undefined,
): (T | undefined) {
  const splitQuery = Array.isArray(query) ? query : query.replace(/(\[(\d)\])/g, '.$2').replace(/^\./, '').split('.')

  if (!splitQuery.length || splitQuery[0] === undefined)
    return obj as T

  const key = splitQuery[0]

  if (
    typeof obj !== 'object'
    || obj === null
    || !(key in obj)
    || (obj as Record<string | number, unknown>)[key] === undefined
  )
    return defaultVal

  return object_Get((obj as Record<string | number, unknown>)[key], splitQuery.slice(1), defaultVal)
}

export function keyBy<A extends Record<any, any>, B extends keyof A>(array: A[], iteratee: ((value: A) => PropertyKey) | B): { [K: PropertyKey]: A } {
  const acc: any = {}
  for (let i = 0; i < array.length; ++i) {
    acc[
      (typeof iteratee === 'function')
        ? iteratee(array[i])
        : array[i][iteratee]
    ] = array[i]
  }

  return acc
}
