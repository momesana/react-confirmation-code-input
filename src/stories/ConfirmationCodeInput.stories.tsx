import type { Meta, StoryObj } from "@storybook/react";
import ConfirmationCodeInput from "../ConfirmationCodeInput";
import { ContainerWithHandles } from "./ContainerWithHandles";

const meta: Meta<typeof ConfirmationCodeInput> = {
  title: "Components/ConfirmationCodeInput",
  component: ConfirmationCodeInput,
};

export default meta;
type Story = StoryObj<typeof ConfirmationCodeInput>;

export const Default: Story = {
  render: () => {
    return (
      <ContainerWithHandles>
        {ref => {
          return <ConfirmationCodeInput length={9} ref={ref} />;
        }}
      </ContainerWithHandles>
    );
  },
};
