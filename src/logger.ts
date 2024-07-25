import { isDevelopment } from 'std-env'
import type { ConsolaInstance, ConsolaOptions } from 'consola'
import { LogLevels, createConsola } from 'consola'

export function createLogger(options?: Partial<ConsolaOptions>): ConsolaInstance {
  return createConsola({
    level: isDevelopment ? LogLevels.debug : undefined,
    ...options,
  })
}
