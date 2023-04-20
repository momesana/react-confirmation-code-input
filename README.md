<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->

<a name="readme-top"></a>

<!-- PROJECT SHIELDS -->
<div align="center">

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

</div>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <h3 align="center">React Confirmation Code Input</h3>

  <p align="center">
    React hook and component for integrating a confirmation code input into your application 
    <br />
    <a href="https://github.com/momesana/react-confirmation-code-input/"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://stackblitz.com/edit/react-ts-ecwebf">View Demo</a>
    ·
    <a href="https://github.com/momesana/react-confirmation-code-input/issues">Report Bug</a>
    ·
    <a href="https://github.com/momesana/react-confirmation-code-input/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

This library provides a hook that lets you write a confirmation code input component while the library manages the refs and some interactions like focusing the next input element when an input has been entered. It can thus be considered headless.

The library also provides you with a component implemented on top of that hook. It lets you override the input and container elements' styling by passing respective class names of your choice as properties to the component.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

### Prerequisites

This is a react library primarily providing a headles react hook for you to implement your own confirmation code input whilst delegating the handling of the element refs and some of the behaviour to said hook. You therefore need a react version as a peer dependency that has support for hooks i.e. any version of react >= 16.8.

### Installation

#### NPM

`npm install react-confirmation-code-input`

#### Yarn

`yarn add react-confirmation-code-input`

#### PNPM

`pnpm add react-confirmation-code-input`

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

### Usage utilizing the hook

```typescript
import * as React from "react";
import { useConfirmationCodeInput } from "react-confirmation-code-input";
import "./style.css";

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
    allowedPattern: "numeric",
    initialValue: "01234",
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

### Using the provided Component

```typescript
import * as React from "react";
import {
  ConfirmationCodeInput,
  ConfirmationCodeInputHandles as Handles,
} from "react-confirmation-code-input";
import "./style.css";

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

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- API -->

## API

### hook version

The hook takes an object as parameter and returns an object as a result:

```ts
useConfirmationCodeInput(options: UseConfirmationCodeInputProps) => UseConfirmationCodeInputResult
```

#### `UseConfirmationCodeInputProps`:

    allowedPattern?: AllowedPattern;
    autoFocus?: boolean;
    useValueHook?: UseValue;
    initialValue?: string;
    length: number;
    onChange?: (value: string) => void;

| Parameter      | Description                                      | Type                    | Required | Default   |
| -------------- | ------------------------------------------------ | ----------------------- | -------- | --------- |
| allowedPattern | Accepted pattern                                 | AllowedPattern          | no       | "numeric" |
| useValueHook   | The hook to store and modify the input value     | UseValue                | no       |           |
| autoFocus      | wheter to put focus on first input upon mounting | boolean                 | no       | true      |
| initialValue   | Initial value as string                          | string                  | no       |           |
| length         | Number of individual inputs                      | number                  | yes      |           |
| onChange       | method called when the value changes             | (value: string) => void | no       |           |

#### `AllowedPattern`:

Allowed Pattern is either one of the predefined patterns `"numeric" | "alpha" | "alphanumeric"`, a `RegExp` or a function with the following signature:

```ts
(input: string, index: number, value: string[]) => boolean;
```

#### `UseValue`

Only provide this if you want to intercept/modify the input or the way it is stored. The signature is as follows:

```ts
(options: UseValueOptions) => [string[], Mutators];
```

`UseValueOptions` and `Mutators` are described below. You need to provide the same signature if you want to pass in a custom `useValue` parameter.

#### `UseValueOptions`:

An object of the shape `{ allowedPattern: AllowedPattern, length: number }`:

| Property       | Description                  |
| -------------- | ---------------------------- |
| allowedPattern | The pattern for valid inputs |
| length         | The length of a valid code   |

#### `Mutators`:

An object of the shape:

```ts
{
    clear: () => void;
    reset: (value?: string) => void;
    update: (input: string, index: number, options: UpdateOptions) => void;
}

```

| Property | Description                                               | Type                                                             |
| -------- | --------------------------------------------------------- | ---------------------------------------------------------------- |
| clear    | A method to clear the value                               | () => void                                                       |
| reset    | A method to reset the value to either the given value     | `(value?: string) => void`                                       |
| update   | A method to update the value upon a given input character | `(input: string, index: number, options: UpdateOptions) => void` |

#### `UseConfirmationCodeInputResult`:

The result of calling `useConfirmationCodeInput` is an option adhering to the following interface:

```ts
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
```

| Property   | Description                                                                       | Type                                 |
| ---------- | --------------------------------------------------------------------------------- | ------------------------------------ |
| refs       | An array of refs each of which needs to be passed to the respective input element | `Array<RefObject<HTMLInputElement>>` |
| value      | The current value as a string array with each value comprising a single character | `string[]`                           |
| reset      | see `Mutators`                                                                    | `(value?: string) => void`           |
| clear      | see `Mutators`                                                                    | `() => void`                         |
| setFocus   | see `Mutators`                                                                    | `(index?: number) => void`           |
| inputProps | The object with properties that must be passed to each individual input           | `InputProps`                         |

#### `InputProps`

The `inputProps` returned by the `useConfirmationCodeInputResult` hook are supposed to be spread into each of the input elements. They comprise needed event handlers on which the hook relies in order to react to user events.

| Property  | Description             | Type                                      |
| --------- | ----------------------- | ----------------------------------------- |
| onFocus   | onFocus event handler   | `FocusEventHandler<HTMLInputElement>`     |
| onKeyDown | onKeyDown event handler | `KeyboardEventHandler<HTMLInputElement>`  |
| onPaste   | onPaste event handler   | `ClipboardEventHandler<HTMLInputElement>` |
| onInput   | onInput event handler   | `FormEventHandler<HTMLInputElement>`      |

### Component

The component takes the following parameters:

| Property       | Description                                                   | Type                                                 | Required | Default   |
| -------------- | ------------------------------------------------------------- | ---------------------------------------------------- | -------- | --------- |
| ref            | reference to get access to the exposed Mutators               | React.MutableRefObject<ConfirmationCodeInputHandles> | no       |           |
| length         | See corresponding hook param                                  | `number`                                             | yes      |           |
| allowedPattern | See corresponding hook param                                  | `AllowedPattern`                                     | no       | `numeric` |
| initialValue   | See corresponding hook param                                  | `string`                                             | no       |           |
| onChange       | See corresponding hook param                                  | `(value: string) => void`                            | no       |           |
| autoFocus      | See corresponding hook param                                  | `boolean`                                            | no       |           |
| containerCls   | CSS class to be appended to the input container's class names | `string`                                             | no       |           |
| inputCls       | CSS class to be appended to the input's class names           | `string`                                             | no       |           |
| disabled       | Whether the inputs are disabled                               | `boolean`                                            | no       |           |
| isPassword     | Whether the inputs are of type `password`                     | `boolean`                                            | no       |           |

<!-- LICENSE -->

## License

Distributed under the MIT License. See [`LICENSE`](LICENSE) for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Project Link: [https://github.com/momesana/react-confirmation-code-input](https://github.com/momesana/react-confirmation-code-input/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->

[contributors-shield]: https://img.shields.io/github/contributors/momesana/react-confirmation-code-input.svg?style=for-the-badge
[contributors-url]: https://github.com/momesana/react-confirmation-code-input/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/momesana/react-confirmation-code-input.svg?style=for-the-badge
[forks-url]: https://github.com/momesana/react-confirmation-code-input/network/members
[stars-shield]: https://img.shields.io/github/stars/momesana/react-confirmation-code-input.svg?style=for-the-badge
[stars-url]: https://github.com/momesana/react-confirmation-code-input/stargazers
[issues-shield]: https://img.shields.io/github/issues/momesana/react-confirmation-code-input.svg?style=for-the-badge
[issues-url]: https://github.com/momesana/react-confirmation-code-input/issues
[license-shield]: https://img.shields.io/github/license/momesana/react-confirmation-code-input.svg?style=for-the-badge
[license-url]: https://github.com/momesana/react-confirmation-code-input/blob/master/LICENSE.txt
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
