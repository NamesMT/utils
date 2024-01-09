import { Buffer } from 'node:buffer'

import type { Awaitable } from '.'
import { isBrowser, isFunction, sleep } from '.'

export {
  assert,
  toString,
  getTypeName,
  noop,
} from '@antfu/utils'

export async function toBase64(v: any) {
  if (typeof v !== 'string')
    v = JSON.stringify(v)

  return isBrowser
    ? btoa(v)
    : Buffer.from(v).toString('base64')
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
