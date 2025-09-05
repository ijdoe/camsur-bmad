import type { Meta, StoryObj } from '@storybook/react';
import { SearchBar } from './SearchBar';
import { useState } from 'react';

const meta = {
  title: 'UI/SearchBar',
  component: SearchBar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SearchBar>;

export default meta;
type Story = StoryObj<typeof meta>;

const SearchBarWithState = () => {
  const [value, setValue] = useState('');

  return (
    <SearchBar
      value={value}
      onChange={setValue}
      onClear={() => setValue('')}
      placeholder="Search..."
    />
  );
};

export const Default: Story = {
  args: {
    value: '',
    onChange: () => {},
    onClear: () => {},
    placeholder: 'Search...',
  },
  render: () => <SearchBarWithState />,
};

const SearchBarWithInitialValue = () => {
    const [value, setValue] = useState('Initial Value');
  
    return (
      <SearchBar
        value={value}
        onChange={setValue}
        onClear={() => setValue('')}
        placeholder="Search..."
      />
    );
  };

  export const WithValue: Story = {
    args: {
        value: 'Initial Value',
        onChange: () => {},
        onClear: () => {},
        placeholder: 'Search...',
      },
    render: () => <SearchBarWithInitialValue />,
  };
