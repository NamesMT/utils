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
