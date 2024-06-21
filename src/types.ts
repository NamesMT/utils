export type FnWithArgs<T = void> = (...args: any) => T

export type Wrapped<T> = T extends (...args: infer A) => infer R
  ? (...args: A) => R
  : never
