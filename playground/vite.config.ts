import { defineConfig } from 'vite'
import Inspect from 'vite-plugin-inspect'
import { debounce } from '@namesmt/utils'
import { createLoggerConsola } from '@namesmt/utils/logger'

export default defineConfig({
  plugins: [
    Inspect(),
  ],
})

const logger = createLoggerConsola()

const logIt = debounce(500, () => logger.info('halo'))
logIt()
