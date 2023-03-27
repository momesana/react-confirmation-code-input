import type {
  ClipboardEventHandler,
  FocusEventHandler,
  FormEventHandler,
  KeyboardEventHandler,
} from "react";
import { createRef, useCallback, useEffect, useMemo, useRef } from "react";
import { isValid } from "./allowedPatterns";
import { useValue } from "./state";
import type {
  UseConfirmationCodeInputProps,
  UseConfirmationCodeInputResult,
} from "./types";

export function useConfirmationCodeInput(
  props: UseConfirmationCodeInputProps
): UseConfirmationCodeInputResult {
  const {
    allowedPattern = "numeric",
    autoFocus = true,
    length,
    initialValue,
    onChange,
    useValueHook = useValue,
  } = props;

  const [value, { reset, clear, update }] = useValueHook({
    length,
    initialValue,
    onChange,
  });

  const refs = useRef(value.map(() => createRef<HTMLInputElement>()));
  const lastIndex = length - 1;
  const onInput: FormEventHandler<HTMLInputElement> = useCallback(
    event => {
      const { target } = event;
      const input = (event.nativeEvent as InputEvent).data ?? "";
      const index = refs.current.findIndex(ref => ref.current === target);
      if (input && !isValid(input, allowedPattern, index, value)) {
        console.warn(`invalid input '${input}' discarded`);
        return;
      }
      update(input, index, { allowedPattern, length });
      if (input) {
        if (index < lastIndex) {
          refs.current[index + 1].current?.focus();
        } else {
          (target as HTMLInputElement).blur();
        }
      }
    },
    [allowedPattern, lastIndex, length, update, value]
  );

  const onFocus: FocusEventHandler<HTMLInputElement> = useCallback(event => {
    event.target.select();
  }, []);

  const onKeyDown: KeyboardEventHandler<HTMLInputElement> = useCallback(
    event => {
      const index = refs.current.findIndex(ref => ref.current === event.target);
      if (event.key === "Backspace" && index > 0 && value[index].length === 0) {
        refs.current[index - 1].current?.focus();
      }
    },
    [value]
  );

  const setFocus = useCallback((index: number = 0) => {
    refs.current[index].current?.focus();
  }, []);

  const onPaste: ClipboardEventHandler<HTMLInputElement> = useCallback(
    event => {
      event.preventDefault();
      const content = event.clipboardData.getData("text/plain");
      const filteredContent = [...content]
        .filter((input, index) => isValid(input, allowedPattern, index, value))
        .join("");
      if (filteredContent.length) {
        reset(filteredContent);
        refs.current[
          Math.min(length, filteredContent.length) - 1
        ].current?.focus();
      }
    },
    [allowedPattern, length, reset, value]
  );

  useEffect(() => {
    if (autoFocus) {
      refs.current[0].current?.focus();
    }
  }, [autoFocus]);

  return useMemo(
    () => ({
      refs: refs.current,
      value,
      clear,
      setFocus,
      reset,
      inputProps: {
        onFocus,
        onKeyDown,
        onPaste,
        onInput,
      },
    }),
    [clear, onFocus, onInput, onKeyDown, onPaste, reset, setFocus, value]
  );
}
