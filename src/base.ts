import type { Awaitable } from '@antfu/utils'
import { isBrowser, isFunction, sleep } from '@antfu/utils'

/**
 * @deprecated use `uint8array-extras` instead
 */
export function toBase64(v: any) {
  if (typeof v !== 'string')
    v = JSON.stringify(v)

  // eslint-disable-next-line node/prefer-global/buffer
  return isBrowser ? btoa(v) : globalThis.Buffer.from(v).toString('base64')
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

export function escapeRegex(str: string) {
  return str.replace(/[/\-\\^$*+?.()|[\]{}]/g, '\\$&')
}

export type VariablePrefixed<I extends string | ReadonlyArray<any> | Record<string, any>, P extends string = '', S extends string = ''>
= I extends string
  ? `${P}${I}${S}`
  : I extends ReadonlyArray<any>
    ? { [E in keyof I]: VariablePrefixed<I[E] extends string | ReadonlyArray<any> | Record<string, any> ? I[E] : never, P, S> }
    : I extends Record<string, any>
      ? { [K in keyof I as `${P}${K & string}${S}`]: I[K] }
      : never
export function variablePrefix<I extends string | ReadonlyArray<any> | Record<string, any>, P extends string = '', S extends string = ''>(
  variable: I,
  prefix?: P,
  suffix?: S,
): VariablePrefixed<I, P, S> {
  prefix = (prefix ?? '') as P
  suffix = (suffix ?? '') as S

  if (typeof variable === 'string') {
    return `${prefix}${variable}${suffix}` as VariablePrefixed<I, P, S>
  }
  else if (Array.isArray(variable)) {
    return variable.map(v => variablePrefix(v, prefix, suffix)) as any as VariablePrefixed<I, P, S>
  }
  else if (typeof variable === 'object' && variable !== null) {
    const _var = variable as Record<string, any>
    const result: Record<string, any> = {}
    Object.keys(_var as Record<string, any>).forEach((key) => {
      result[`${prefix}${key}${suffix}`] = _var[key]
    })
    return result as VariablePrefixed<I, P, S>
  }

  throw new Error(`variable type not supported: ${typeof variable}`)
}

export class DetailedError extends Error {
  /**
   * Additional `message` that will be logged AND returned to client
   */
  public detail?: any
  /**
   * Additional `code` that will be logged AND returned to client
   */
  public code?: any
  /**
   * Additional value that will be logged AND NOT returned to client
   */
  public log?: any
  /**
   * Optionally set the status code to return, in a web server context
   */
  public statusCode?: any

  constructor(message: string, options: { detail?: any, code?: any, statusCode?: number, log?: any } = {}) {
    super(message)
    this.name = 'DetailedError'
    this.log = options.log
    this.detail = options.detail
    this.code = options.code
    this.statusCode = options.statusCode
  }
}
