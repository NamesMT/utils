export type FnWithArgs<T = void> = (...args: any) => T

export type Wrapped<T> = T extends (...args: infer A) => infer R
  ? (...args: A) => R
  : never

export type Extends<T1, T2> = T1 extends T2 ? T1 : never
