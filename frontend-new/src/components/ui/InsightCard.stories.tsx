import type { Meta, StoryObj } from '@storybook/react';
import { InsightCard, type InsightCardData } from './InsightCard';

const meta = {
  title: 'UI/InsightCard',
  component: InsightCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof InsightCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const baseInsight: InsightCardData = {
  id: '1',
  insightType: 'Barangay Flood Watch',
  affectedArea: 'Brgy. San Roque, Nabua',
  severity: 4,
  confidence: 85,
  timestamp: new Date(),
  status: 'Pending Review',
  hotspotScore: 92,
};

export const Default: Story = {
  args: {
    insight: baseInsight,
    isSelected: false,
    onAction: (id, action) => console.log({ id, action }),
  },
};

export const Selected: Story = {
  args: {
    insight: baseInsight,
    isSelected: true,
    onAction: (id, action) => console.log({ id, action }),
  },
};

export const Disseminated: Story = {
    args: {
      insight: {
        ...baseInsight,
        status: 'Disseminated',
      },
      isSelected: false,
      onAction: (id, action) => console.log({ id, action }),
    },
  };
