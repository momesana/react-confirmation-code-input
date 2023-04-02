import type { Meta, StoryFn } from "@storybook/react";
import ConfirmationCodeInput from "../ConfirmationCodeInput";
import type { UseConfirmationCodeInputProps } from "../types";
import { ContainerWithHandles } from "./ContainerWithHandles";

const meta: Meta<typeof ConfirmationCodeInput> = {
  title: "Components/ConfirmationCodeInput",
  component: ConfirmationCodeInput,
};

export default meta;

type Story = StoryFn<typeof ConfirmationCodeInput>;

const Template: Story = (args: UseConfirmationCodeInputProps) => (
  <ContainerWithHandles>
    {ref => {
      return <ConfirmationCodeInput ref={ref} {...args} />;
    }}
  </ContainerWithHandles>
);

export const Numeric: Story = Template.bind({});

Numeric.args = {
  length: 5,
  allowedPattern: "numeric",
};

export const Alpha: Story = Template.bind({});

Alpha.args = {
  length: 9,
  allowedPattern: "alpha",
};

export const Alphanumeric: Story = Template.bind({});

Alphanumeric.args = {
  length: 9,
  allowedPattern: "alphanumeric",
};

export const WithInitialValue: Story = Template.bind({});

WithInitialValue.args = {
  length: 9,
  allowedPattern: "alphanumeric",
  initialValue: "abcde0123",
};

export const AsPassword: Story = Template.bind({});

AsPassword.args = {
  length: 5,
  allowedPattern: "numeric",
  isPassword: true,
};

export const AsDisabled: Story = Template.bind({});

AsDisabled.args = {
  length: 5,
  allowedPattern: "numeric",
  disabled: true,
};

export const WithCustomStyling: Story = (
  args: UseConfirmationCodeInputProps
) => (
  <>
    <ContainerWithHandles>
      {ref => {
        return (
          <ConfirmationCodeInput
            containerCls="cci-container"
            inputCls="cci-input"
            ref={ref}
            {...args}
          />
        );
      }}
    </ContainerWithHandles>
    <style>
      {`
        .cci-container {
          border: 1px solid #ccc;
          padding: 1rem;
        }
        .cci-input {
          border: 1px dashed #aaa;
          border-radius: 50%;
          font-weight: bold;
        }
        .cci-input:hover {
          border: 1px solid green;
        }
  `}
    </style>
  </>
);

WithCustomStyling.args = {
  length: 5,
  allowedPattern: "numeric",
};
