import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from './Icon';

const meta = {
  title: 'UI/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: {
        type: 'select',
        options: ['GlobeAltIcon', 'ComputerDesktopIcon', 'DocumentIcon', 'ArrowLeftIcon', 'Bars3Icon'],
      },
    },
    size: {
      control: {
        type: 'select',
        options: ['sm', 'md', 'lg'],
      },
    },
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'GlobeAltIcon',
    size: 'md',
  },
};

export const Large: Story = {
    args: {
      name: 'ComputerDesktopIcon',
      size: 'lg',
    },
  };

  export const Small: Story = {
    args: {
      name: 'DocumentIcon',
      size: 'sm',
    },
  };
