/**
 * @module logger
 * 
 * Requires `std-env` and `consola`
 */

import { isDevelopment } from 'std-env'
import { LogLevels, createConsola } from 'consola'

import type { Wrapped } from '~/types'

export * from 'consola'

export const createLoggerConsola: Wrapped<typeof createConsola> = function (options) {
  return createConsola({
    level: isDevelopment ? LogLevels.debug : undefined,
    ...options,
  })
}
