import { variablePrefix } from '@namesmt/utils'
import { defineConfig } from 'vite'
import Inspect from 'vite-plugin-inspect'

export default defineConfig({
  plugins: [
    Inspect(),
  ],
})

const _prefixedArr = variablePrefix(['str'], 'prefix-')
const _prefixedObj = variablePrefix({ str: 'str' }, 'prefix-')
