# react-confirmation-code-input

This library provides a hook that lets you write a confirmation code input component while the library manages the refs and some interactions like focusing the next input element when an input has been entered. It can thus be considered headless.

The library also provides you a component implemented on top of that hook. It lets you override the input and container elements' styling by passing respective class names of your choice as properties to the component.


# Using the hook to create your own component
```typescript
import * as React from 'react';
import { useConfirmationCodeInput } from 'react-confirmation-code-input';
import './style.css';

export default function App() {
  const {
    refs,
    value: inputs,
    clear,
    setFocus,
    reset,
    inputProps,
  } = useConfirmationCodeInput({
    length: 5,
    allowedPattern: 'numeric',
    initialValue: '01234',
    autoFocus: true,
  });

  // reset and setFocus take optional params so we can't pass them directly
  // to onClick but have to eliminate the optional parameter first
  const onReset = React.useCallback(() => reset(), []);
  const onSetFocus = React.useCallback(() => setFocus(), []);

  return (
    <main>
      <div className="input-container">
        {refs.map((ref, index) => (
          <input key={index} value={inputs[index]} ref={ref} {...inputProps} />
        ))}
      </div>
      <div className="button-box">
        <button onClick={onReset}>Reset</button>
        <button onClick={clear}>Clear</button>
        <button onClick={onSetFocus}>Focus</button>
      </div>
    </main>
  );
}

```
[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/edit/react-ts-ecwebf)


# Using the predefined component
```typescript
import * as React from 'react';
import {
  ConfirmationCodeInput,
  ConfirmationCodeInputHandles as Handles,
} from 'react-confirmation-code-input';
import './style.css';

export default function App() {
  const handlesRef = React.useRef<Handles>(null);
  const { reset, clear, setFocus } = React.useMemo(
    () => ({
      reset: () => handlesRef.current.reset(),
      clear: () => handlesRef.current.clear(),
      setFocus: () => handlesRef.current.setFocus(),
    }),
    []
  );

  return (
    <main>
      <ConfirmationCodeInput
        ref={handlesRef}
        length={5}
        allowedPattern="numeric"
        autoFocus
        initialValue="01234"
      />
      <div className="button-box">
        <button onClick={reset}>Reset</button>
        <button onClick={clear}>Clear</button>
        <button onClick={setFocus}>Focus</button>
      </div>
    </main>
  );
}
```


[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/edit/react-ts-sfjq5u)