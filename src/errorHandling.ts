export function throwError(msg: string = "unknown error"): never {
  throw Error(msg);
}

export function assert(condition: unknown, msg: string): asserts condition {
  if (!condition) {
    throwError(msg);
  }
}
