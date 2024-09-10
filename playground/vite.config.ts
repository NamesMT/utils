import { debounce } from '@namesmt/utils'
import { defineConfig } from 'vite'
import Inspect from 'vite-plugin-inspect'

export default defineConfig({
  plugins: [
    Inspect(),
  ],
})

// eslint-disable-next-line no-console
const _debounced = debounce(500, () => console.info('halo'))
