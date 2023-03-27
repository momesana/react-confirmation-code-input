import { useMemo, useReducer, useRef } from "react";
import { assert } from "./errorHandling";
import type { Mutators, UpdateOptions, State, UseValueOptions } from "./types";

type Action =
  | { type: "clear" }
  | { type: "reset"; value?: string; initialValue?: string }
  | { type: "update"; input: string; index: number; options: UpdateOptions };

export function fill(size: number, value?: string): string[] {
  return Array(size)
    .fill(undefined)
    .map((_, idx) => value?.[idx] ?? "");
}

function reducer(state: State, action: Action): State {
  const { length } = state;
  switch (action.type) {
    case "clear": {
      return Array(length).fill("");
    }
    case "reset": {
      const { value, initialValue } = action;
      return fill(length, value ?? initialValue);
    }
    case "update": {
      const { input, index } = action;
      assert(input.length < 2, "input must be at most one character wide");
      const next = [...state];
      next[index] = input;
      return next;
    }
  }
}

export function useValue({
  length,
  initialValue,
  onChange,
}: UseValueOptions): [State, Mutators] {
  const onChangeRef = useRef(onChange);
  const reduce = useMemo(() => {
    return (...args: Parameters<typeof reducer>) => {
      const next = reducer(...args);
      onChangeRef.current?.(next.join(""));
      return next;
    };
  }, []);
  const [state, dispatch] = useReducer(reduce, fill(length, initialValue));

  const mutators: Mutators = useMemo(
    () => ({
      clear: () => dispatch({ type: "clear" }),
      reset: value => dispatch({ type: "reset", value, initialValue }),
      update: (input, index, options) =>
        dispatch({ type: "update", input, index, options }),
    }),
    [initialValue]
  );

  return [state, mutators];
}
