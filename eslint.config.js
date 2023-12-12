import antfu from '@antfu/eslint-config'

export default antfu(
  {
    unocss: true,
    ignores: [
      // eslint ignore globs here
    ],
  },
  {
    rules: {
      'style/no-trailing-spaces': ['error', { ignoreComments: true }],
      'style/max-statements-per-line': ['error', { max: 2 }],
      'ts/ban-ts-comment': 'warn',
    },
  },
  {
    files: ['*.md'],
    rules: {
      'style/no-trailing-spaces': 'off',
    },
  },
)
