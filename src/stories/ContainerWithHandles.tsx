import type { MutableRefObject, ReactElement } from "react";
import { useRef } from "react";
import styled from "styled-components";
import type { Handles } from "../ConfirmationCodeInput";
import ActionBox from "./ActionBox";

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export function ContainerWithHandles({
  children,
}: {
  children: (ref: MutableRefObject<Handles | null>) => ReactElement;
}): ReactElement {
  const ref = useRef<Handles>(null);

  return (
    <Root>
      {children(ref)}
      <ActionBox handleRef={ref} />
    </Root>
  );
}
