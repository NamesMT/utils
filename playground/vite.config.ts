import { defineConfig } from 'vite'
import Inspect from 'vite-plugin-inspect'
import { createLogger, debounce } from '@namesmt/utils'

export default defineConfig({
  plugins: [
    Inspect(),
  ],
})

const logger = createLogger()

const _clearer = debounce(500, () => logger.info('halo'))
