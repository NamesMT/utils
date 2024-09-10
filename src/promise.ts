import type { FnWithArgs, Wrapped } from './types'

/**
 * Provides a clean interface to progressively add promises and call all/race on it
 */
export class PromiseList {
  // Pre-bind functions for less overhead on multiple calls
  #allFn = Promise.all.bind(Promise)
  #raceFn = Promise.race.bind(Promise)

  promises: Promise<any>[] = []

  constructor(...promises: Promise<any>[]) {
    this.add(...promises)
  }

  add(...promises: Promise<any>[]) {
    this.promises.push(...promises)
  }

  returnClear(fn: (promises: Promise<any>[]) => Promise<any>) {
    const called = fn(this.promises)
    this.promises.length = 0
    return called
  }

  all() {
    return this.returnClear(this.#allFn)
  }

  race() {
    return this.returnClear(this.#raceFn)
  }
}

export async function getPromiseState<T>(promise: Promise<T>) {
  const pending = {
    state: 'pending',
  }
  return Promise.race([promise, pending]).then(
    (value) => {
      if (value === pending)
        return value

      return {
        state: 'resolved',
        value,
      }
    },
    reason => ({ state: 'rejected', reason }),
  ) as Promise<{ state: 'pending' } | { state: 'resolved', value: T } | { state: 'rejected', reason: any }>
}

const _uniquePromiseStore = {} as { [key: string]: Promise<any> }
/**
 * Execute a unique(singleton) instance of the promise,  
 * multiple calls will all returns the same Promise while it haven't settled
 * 
 * Similar to `createSingletonPromise` but tracked by key instead of a wrapper scope
 * 
 * @param key - defaults to function name + args
 * @param promiseCallback - a function that will return a promise
 */
export function uniquePromise<T extends Promise<unknown>>(key: string, promiseCallback: FnWithArgs<T>): T {
  if (typeof _uniquePromiseStore[key] !== 'undefined')
    return _uniquePromiseStore[key] as T

  return _uniquePromiseStore[key] = promiseCallback().finally(() => { delete _uniquePromiseStore[key] }) as T
}
type Uniquified<T> = Wrapped<T>
/**
 * Wraps function with uniquePromise
 *
 * @param fn - Source function
 * 
 * @param key - Additionally set key prefix in case we have other functions with same name.
 */
// eslint-disable-next-line ts/no-unsafe-function-type
export function uniquify<T extends Function>(fn: T, key?: string): Uniquified<T> {
  const newFn = async function (this: any, ...args: any[]) {
    return uniquePromise(key + fn.name + JSON.stringify(args), () => fn.apply(this, args))
  } as any

  return Object.defineProperty(newFn, 'name', { value: fn.name, writable: false })
}
