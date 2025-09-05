import type { Meta, StoryObj } from '@storybook/react';
import { FilterDropdown, type FilterOption } from './FilterDropdown';
import { useState } from 'react';

const meta = {
  title: 'UI/FilterDropdown',
  component: FilterDropdown,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof FilterDropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

const options: FilterOption[] = [
  { value: 'option1', label: 'Option 1', count: 10 },
  { value: 'option2', label: 'Option 2', count: 5 },
  { value: 'option3', label: 'Option 3', count: 12 },
  { value: 'option4', label: 'Option 4', count: 2 },
];

const FilterDropdownWithState = ({ multiple }: { multiple: boolean }) => {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  return (
    <FilterDropdown
      label="Filter By"
      options={options}
      selectedValues={selectedValues}
      onSelectionChange={setSelectedValues}
      multiple={multiple}
    />
  );
};

export const MultiSelect: Story = {
  args: {
    label: 'Filter By',
    options: options,
    selectedValues: [],
    onSelectionChange: () => {},
    multiple: true,
  },
  render: () => <FilterDropdownWithState multiple={true} />,
};

export const SingleSelect: Story = {
    args: {
        label: 'Filter By',
        options: options,
        selectedValues: [],
        onSelectionChange: () => {},
        multiple: false,
      },
    render: () => <FilterDropdownWithState multiple={false} />,
  };
