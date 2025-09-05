import type { Meta, StoryObj } from '@storybook/react';
import { DataCard } from './DataCard';

const meta = {
  title: 'UI/DataCard',
  component: DataCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    status: {
      control: {
        type: 'select',
        options: ['normal', 'warning', 'critical'],
      },
    },
    icon: {
        control: {
            type: 'select',
            options: ['GlobeAltIcon', 'ComputerDesktopIcon', 'DocumentIcon', 'ArrowLeftIcon', 'Bars3Icon'],
        }
    }
  },
} satisfies Meta<typeof DataCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
  args: {
    title: 'Active Users',
    value: '1,234',
    icon: 'GlobeAltIcon',
    status: 'normal',
  },
};

export const Warning: Story = {
  args: {
    title: 'System Latency',
    value: '450ms',
    icon: 'ComputerDesktopIcon',
    status: 'warning',
  },
};

export const Critical: Story = {
  args: {
    title: 'Failed Reports',
    value: '12',
    icon: 'DocumentIcon',
    status: 'critical',
  },
};
