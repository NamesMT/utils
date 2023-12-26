export type {
  Awaitable,
  Nullable,
  Arrayable,
  Fn,
  Constructor,
  ElementOf,
  UnionToIntersection,
  ArgumentsType,
  MergeInsertions,
  DeepMerge,
} from '@antfu/utils'

export type FnWithArgs<T = void> = (...args: any) => T

export type Wrapped<T> = T extends (...args: infer A) => infer R
  ? (...args: A) => R
  : never
