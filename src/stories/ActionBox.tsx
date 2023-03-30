import type { MutableRefObject, ReactElement } from "react";
import styled from "styled-components";
import type { Handles } from "../ConfirmationCodeInput";

const Root = styled.div`
  padding: 1rem;
`;

const ButtonBoxContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const Button = styled.button`
  background-color: #1677ff;
  color: white;
  border-radius: 25px;
  border: none;
  padding: 8px 30px;

  &:hover {
    background-color: #4096ff;
  }
`;

export default function ActionBox({
  handleRef,
}: {
  handleRef: MutableRefObject<Handles | null>;
}): ReactElement {
  return (
    <Root>
      <ButtonBoxContainer>
        <Button
          onClick={() => {
            handleRef.current?.clear();
          }}
        >
          clear
        </Button>
        <Button
          onClick={() => {
            handleRef.current?.reset();
          }}
        >
          reset
        </Button>
        <Button
          onClick={() => {
            handleRef.current?.setFocus();
          }}
        >
          focus
        </Button>
      </ButtonBoxContainer>
    </Root>
  );
}
