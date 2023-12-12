export type {
  SingletonPromiseReturn,
  ControlledPromise,
} from '@antfu/utils'
export {
  createSingletonPromise,
  createPromiseLock,
  createControlledPromise,
} from '@antfu/utils'

export function sleep(milliseconds: number): Promise<void> {
  return new Promise((resolve) => { setTimeout(resolve, milliseconds) })
}

/**
 * Provides a clean interface to progressively add promises and call all/race on it
 */
export class promiseList {
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

export async function getPromiseState(promise: Promise<any>) {
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
  )
}
