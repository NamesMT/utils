import type { Awaitable } from '.'
import { isFunction, sleep, stringToBase64 } from '.'

export {
  assert,
  toString,
  getTypeName,
  noop,
} from '@antfu/utils'

export function toBase64(v: any) {
  if (typeof v !== 'string')
    v = JSON.stringify(v)

  return stringToBase64(v)
}

export async function whileWithTimeout(condition: Awaitable<boolean> | (() => Awaitable<boolean>), callback: () => void | Promise<void>, timeout = 3000) {
  let timedout = false
  sleep(timeout).then(() => timedout = true)

  while (await (isFunction(condition) ? condition() : condition)) {
    if (timedout)
      throw new Error('whileWithTimeout: timed out')

    await callback()
  }
}
