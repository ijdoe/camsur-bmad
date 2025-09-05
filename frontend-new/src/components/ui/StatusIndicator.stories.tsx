import type { Meta, StoryObj } from '@storybook/react';
import { StatusIndicator } from './StatusIndicator';

const meta = {
  title: 'UI/StatusIndicator',
  component: StatusIndicator,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    status: {
      control: {
        type: 'select',
        options: ['Draft', 'Pending Review', 'Approved', 'Disseminated', 'Rescinded', 'critical', 'warning', 'normal', 'offline', 'inactive'],
      },
    },
  },
} satisfies Meta<typeof StatusIndicator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Critical: Story = {
  args: {
    status: 'critical',
  },
};

export const Warning: Story = {
  args: {
    status: 'warning',
  },
};

export const Normal: Story = {
  args: {
    status: 'normal',
  },
};

export const PendingReview: Story = {
    args: {
      status: 'Pending Review',
    },
  };
