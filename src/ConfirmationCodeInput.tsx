import type { ForwardedRef } from "react";
import { forwardRef, useImperativeHandle } from "react";
import type { UseConfirmationCodeInputProps } from "./types";
import { useConfirmationCodeInput } from "./useConfirmationCodeInput";
import "./ConfirmationCodeInput.css";

export interface Handles {
  clear: () => void;
  reset: (value?: string) => void;
  setFocus: (n?: number) => void;
}

interface Props extends UseConfirmationCodeInputProps {
  containerCls?: string;
  inputCls?: string;
  disabled?: boolean;
}

export default forwardRef(function ConfirmationCodeInput(
  { containerCls = "", inputCls = "", disabled, ...hookProps }: Props,
  ref: ForwardedRef<Handles>
): JSX.Element {
  const { refs, value, inputProps, setFocus, clear, reset } =
    useConfirmationCodeInput(hookProps);
  const inputValues = [...value];

  useImperativeHandle(
    ref,
    () => ({
      setFocus,
      clear,
      reset,
    }),
    [setFocus, clear, reset]
  );

  return (
    <div className={`vci-container ${containerCls}`}>
      {refs.map((ref, index) => (
        <input
          disabled={disabled}
          className={`vci-input ${inputCls}`}
          value={inputValues[index]}
          key={index}
          ref={ref}
          {...inputProps}
        />
      ))}
    </div>
  );
});
