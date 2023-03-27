import type {
  ClipboardEventHandler,
  FocusEventHandler,
  FormEventHandler,
  KeyboardEventHandler,
  RefObject,
} from "react";

export type PredefinedPattern = "numeric" | "alpha" | "alphanumeric";

export type AllowedPattern =
  | PredefinedPattern
  | RegExp
  | ((input: string, index: number, value: string[]) => boolean);

export interface UseConfirmationCodeInputProps {
  allowedPattern?: AllowedPattern;
  autoFocus?: boolean;
  useValueHook?: UseValue;
  initialValue?: string;
  length: number;
  onChange?: (value: string) => void;
}

export interface UseConfirmationCodeInputResult {
  refs: Array<RefObject<HTMLInputElement>>;
  value: string[];
  reset: (value?: string) => void;
  clear: () => void;
  setFocus: (index?: number) => void;
  inputProps: {
    onFocus: FocusEventHandler<HTMLInputElement>;
    onKeyDown: KeyboardEventHandler<HTMLInputElement>;
    onPaste: ClipboardEventHandler<HTMLInputElement>;
    onInput: FormEventHandler<HTMLInputElement>;
  };
}

export interface UpdateOptions {
  length: number;
  allowedPattern: AllowedPattern;
}

export type UpdateHandler = (
  input: string,
  index: number,
  options: UpdateOptions
) => void;

export interface UseValueOptions {
  length: number;
  initialValue?: string;
  onChange?: (value: string) => void;
}

export type State = string[];

export interface Mutators {
  clear: () => void;
  reset: (value?: string) => void;
  update: (input: string, index: number, options: UpdateOptions) => void;
}

export type UseValue = (options: UseValueOptions) => [State, Mutators];
