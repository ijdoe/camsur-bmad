import type { Meta, StoryObj } from '@storybook/react';
import { Textarea } from './TextArea';

const meta = {
  title: 'UI/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Type your message here.',
  },
};

export const WithValue: Story = {
  args: {
    value: 'This is some text in the text area.',
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'This text area is disabled.',
    disabled: true,
  },
};
