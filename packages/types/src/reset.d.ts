interface Array<T> {
  filter(predicate: BooleanConstructor, thisArg?: any): NonFalsy<T>[];
}

interface ReadonlyArray<T> {
  filter(predicate: BooleanConstructor, thisArg?: any): NonFalsy<T>[];
}

type NonFalsy<T> = T extends false | 0 | "" | null | undefined | 0n ? never : T;

