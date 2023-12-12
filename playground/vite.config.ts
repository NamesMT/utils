import { defineConfig } from 'vite'
import Inspect from 'vite-plugin-inspect'
import { debounce, logger } from '@namesmt/utils'

export default defineConfig({
  plugins: [
    Inspect(),
  ],
})

const _clearer = debounce(500, () => logger.info('halo'))
