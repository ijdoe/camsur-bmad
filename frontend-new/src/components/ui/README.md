# UI Components Documentation

## Phase 2: Molecule Components

This document provides comprehensive documentation for the molecule components built in Phase 2 of the UX/UI implementation for Project LINGKOD.

## Overview

Molecule components are composite UI elements that combine atomic components into functional, reusable units. These components follow the established design system and maintain consistency with the overall application theme.

## Components

### 1. InsightCard

The cornerstone component for displaying individual insights in the priority queue.

#### Props

```typescript
interface InsightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  insight: InsightCardData;
  onClick?: () => void;
  className?: string;
}

interface InsightCardData {
  id: string;
  insightType: string;
  affectedArea: string;
  severity: number; // 1-5 scale
  confidence: number; // 0-100 percentage
  timestamp: Date;
  status: 'Draft' | 'Pending Review' | 'Approved' | 'Disseminated' | 'Rescinded';
  geometry?: any; // GeoJSON.Polygon
}
```

#### Features

- **Severity Indicators**: Color-coded left border (green/yellow/red)
- **Status Badges**: Visual status indicators with icons
- **Interactive States**: Hover, focus, and click states
- **Accessibility**: Full keyboard navigation and ARIA support
- **Responsive Design**: Adapts to different screen sizes

#### Usage Example

```tsx
import { InsightCard } from '@/components/ui';

const insight = {
  id: '1',
  insightType: 'Flood Watch',
  affectedArea: 'Brgy. San Roque, CamSur',
  severity: 4,
  confidence: 85,
  timestamp: new Date(),
  status: 'Pending Review',
};

<InsightCard
  insight={insight}
  onClick={() => handleInsightClick(insight.id)}
/>
```

---

### 2. SearchBar

Full-text search functionality for insights and data.

#### Props

```typescript
interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (query: string) => void;
  onClear?: () => void;
  className?: string;
  disabled?: boolean;
  autoFocus?: boolean;
  showClearButton?: boolean;
  size?: 'sm' | 'md' | 'lg';
}
```

#### Features

- **Real-time Search**: Triggers search on Enter key
- **Clear Functionality**: X button to clear search
- **Keyboard Navigation**: Escape to clear, Enter to search
- **Loading States**: Disabled state support
- **Responsive Sizing**: Small, medium, and large variants

#### Usage Example

```tsx
import { SearchBar } from '@/components/ui';

<SearchBar
  placeholder="Search insights, areas, or data..."
  onSearch={(query) => handleSearch(query)}
  onClear={() => handleClearSearch()}
/>
```

---

### 3. FilterDropdown

Multi-select filters for LGU, status, severity, and time range.

#### Props

```typescript
interface FilterDropdownProps {
  label: string;
  options: FilterOption[];
  selectedValues: string[];
  onSelectionChange: (values: string[]) => void;
  placeholder?: string;
  multiple?: boolean;
  className?: string;
  disabled?: boolean;
  maxHeight?: string;
}

interface FilterOption {
  value: string;
  label: string;
  count?: number;
}
```

#### Features

- **Multi-select Support**: Choose multiple options
- **Count Indicators**: Show number of items per option
- **Clear All**: Bulk clear functionality
- **Search State**: Visual indication of selected filters
- **Accessibility**: Proper ARIA attributes and keyboard support

#### Usage Example

```tsx
import { FilterDropdown } from '@/components/ui';

const options = [
  { value: 'camsur', label: 'CamSur', count: 12 },
  { value: 'albay', label: 'Albay', count: 8 },
];

<FilterDropdown
  label="LGU"
  options={options}
  selectedValues={['camsur']}
  onSelectionChange={(values) => handleFilterChange(values)}
/>
```

---

### 4. StatusIndicator

Color-coded badges for insight states and system status.

#### Props

```typescript
interface StatusIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  status: StatusType;
  label?: string;
  showIcon?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'filled' | 'outlined' | 'dot';
}

type StatusType =
  | 'normal' | 'warning' | 'critical'
  | 'draft' | 'pending' | 'approved' | 'disseminated' | 'rescinded'
  | 'active' | 'inactive' | 'online' | 'offline' | 'maintenance';
```

#### Features

- **Multiple Variants**: Filled, outlined, and dot styles
- **Icon Support**: Configurable icon display
- **Color Coding**: Consistent color scheme across variants
- **Size Options**: Small, medium, and large sizes
- **Custom Labels**: Override default status labels

#### Usage Example

```tsx
import { StatusIndicator } from '@/components/ui';

// Different variants
<StatusIndicator status="normal" />
<StatusIndicator status="warning" variant="outlined" />
<StatusIndicator status="critical" variant="dot" />

// Custom label
<StatusIndicator status="approved" label="Verified" />
```

---

### 5. DataCard

Display cards for sensor readings, CCTV events, and community intelligence.

#### Props

```typescript
interface DataCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  value?: string | number;
  subtitle?: string;
  status?: 'normal' | 'warning' | 'critical' | 'offline';
  icon?: string;
  trend?: {
    value: number;
    label: string;
    direction: 'up' | 'down' | 'neutral';
  };
  metadata?: Array<{
    label: string;
    value: string | number;
  }>;
  actions?: Array<{
    label: string;
    onClick: () => void;
    variant?: 'default' | 'outline' | 'ghost';
  }>;
  variant?: 'default' | 'compact' | 'detailed';
  loading?: boolean;
}
```

#### Features

- **Trend Indicators**: Visual trend arrows with percentage changes
- **Status Integration**: Built-in status indicator
- **Action Buttons**: Configurable action buttons
- **Loading States**: Skeleton loading animation
- **Metadata Display**: Key-value pairs for detailed view
- **Responsive Variants**: Default, compact, and detailed layouts

#### Usage Example

```tsx
import { DataCard } from '@/components/ui';

<DataCard
  title="River Level"
  value="12.5m"
  subtitle="San Miguel River"
  status="warning"
  icon="ChartBarIcon"
  trend={{
    value: 15,
    label: 'from yesterday',
    direction: 'up',
  }}
  actions={[
    { label: 'View Details', onClick: handleViewDetails },
    { label: 'Alert', onClick: handleAlert, variant: 'outline' },
  ]}
  variant="detailed"
/>
```

## Design System Integration

All molecule components follow the established design system:

- **Colors**: Primary blue (#3B82F6), success green (#10B981), warning yellow (#F59E0B), danger red (#EF4444)
- **Typography**: Inter font family with consistent sizing scale
- **Spacing**: 4px base unit with multiples (8px, 12px, 16px, 24px, 32px)
- **Shadows**: Consistent shadow system for depth and elevation
- **Border Radius**: 6px for cards, 4px for smaller elements

## Accessibility

All components include comprehensive accessibility features:

- **Keyboard Navigation**: Full keyboard support with proper focus management
- **ARIA Attributes**: Appropriate ARIA roles, labels, and states
- **Color Contrast**: WCAG AA compliance (4.5:1 minimum contrast ratio)
- **Screen Reader Support**: Semantic HTML and descriptive labels
- **Focus Indicators**: Clear visual focus indicators

## Testing

Components are tested for:

- **Functionality**: All props and interactions work as expected
- **Accessibility**: Keyboard navigation and screen reader compatibility
- **Responsiveness**: Proper display across different screen sizes
- **Performance**: Efficient rendering and state management

## Import Statement

```typescript
import {
  InsightCard,
  SearchBar,
  FilterDropdown,
  StatusIndicator,
  DataCard,
  // Types
  type InsightCardData,
  type FilterOption,
  type StatusType,
} from '@/components/ui';
```

## Phase 3: Organism Components

Organism components have been successfully implemented! These complex UI sections combine molecule components into functional, larger-scale interface elements:

### 1. MainNavigationSidebar

The primary navigation component for the application dashboard.

#### Features

- **Collapsible Sidebar**: Expandable/collapsible navigation with smooth transitions
- **LGU Selector**: Dropdown for multi-tenancy demo scenarios
- **Navigation Items**: Dashboard, Insights, Community Intelligence, Sensors, CCTV, Users, LGUs, Settings
- **User Profile**: Display current user information with logout functionality
- **Badge Support**: Notification badges for navigation items
- **Responsive Design**: Adapts to different screen sizes

#### Usage Example

```tsx
import { MainNavigationSidebar } from '@/components';

const user = { name: 'John Doe', role: 'PDRRMO Operator' };
const lgu = { id: 'camsur', name: 'Camarines Sur' };
const lguOptions = [{ id: 'camsur', name: 'Camarines Sur' }];

<MainNavigationSidebar
  currentPath="/dashboard"
  user={user}
  lgu={lgu}
  lguOptions={lguOptions}
  onNavigate={(path) => handleNavigation(path)}
  onLGUChange={(lguId) => handleLGUChange(lguId)}
  onLogout={() => handleLogout()}
/>
```

---

### 2. InsightPriorityQueue

A comprehensive list view for managing and prioritizing insights.

#### Features

- **Advanced Filtering**: Filter by LGU, status, severity, and time range
- **Full-text Search**: Search across insight types, areas, and descriptions
- **Multiple Sorting**: Sort by priority, timestamp, severity, or confidence
- **View Modes**: Switch between list and grid layouts
- **Real-time Updates**: Live filtering and sorting
- **Insight Statistics**: Display counts and filter status

#### Usage Example

```tsx
import { InsightPriorityQueue } from '@/components';

<InsightPriorityQueue
  insights={insights}
  onInsightClick={(id) => handleInsightClick(id)}
  onInsightAction={(id, action) => handleInsightAction(id, action)}
/>
```

---

### 3. InteractiveMapContainer

An interactive map interface with controls and data overlays.

#### Features

- **Layer Controls**: Toggle visibility of LGU boundaries, sensors, alerts, and satellite imagery
- **Sensor Statistics**: Real-time sensor status dashboard
- **Interactive Overlays**: Clickable sensor and insight markers
- **Quick Actions**: Zoom to alerts, reset view, refresh data
- **Selected Item Details**: Detailed information panels for clicked items
- **Responsive Controls**: Collapsible control panel

#### Usage Example

```tsx
import { InteractiveMapContainer } from '@/components';

<InteractiveMapContainer
  sensors={sensorData}
  insights={insightOverlays}
  lguBoundaries={boundaryData}
  onSensorClick={(sensor) => handleSensorClick(sensor)}
  onInsightClick={(insight) => handleInsightClick(insight)}
  height="600px"
/>
```

---

### 4. InsightDetailPanel

Comprehensive insight details with tabbed interface.

#### Features

- **Tabbed Interface**: Overview, Evidence, Recommendations, Notes
- **Evidence Panel**: Display contributing data sources with confidence scores
- **Recommendation Engine**: Communication recommendations with priority levels
- **Operator Notes**: Add and manage notes for insights
- **Action Buttons**: Approve, Rescind, Edit Geometry
- **Loading States**: Skeleton loading for better UX

#### Usage Example

```tsx
import { InsightDetailPanel } from '@/components';

<InsightDetailPanel
  insight={selectedInsight}
  onApprove={(id) => handleApprove(id)}
  onRescind={(id) => handleRescind(id)}
  onEditGeometry={(id) => handleEditGeometry(id)}
  onAddNote={(id, note) => handleAddNote(id, note)}
  onClose={() => setSelectedInsight(null)}
/>
```

---

### 5. RealTimeDataPanels

Real-time data display for sensors, CCTV events, and community reports.

#### Features

- **Auto-refresh**: Configurable automatic data updates
- **Tabbed Views**: Sensors, CCTV Events, Community Reports
- **Sensor Statistics**: Visual status breakdown with counts
- **Trend Indicators**: Rising/falling/stable indicators for sensor readings
- **Event Thumbnails**: Visual previews for CCTV events
- **Community Verification**: Verified/unverified status for reports
- **Tag System**: Categorized tags for community reports

#### Usage Example

```tsx
import { RealTimeDataPanels } from '@/components';

<RealTimeDataPanels
  sensorReadings={sensorData}
  cctvEvents={cctvEvents}
  communityReports={communityReports}
  onSensorClick={(sensor) => handleSensorClick(sensor)}
  onCCTVEventClick={(event) => handleCCTVEventClick(event)}
  onCommunityReportClick={(report) => handleCommunityReportClick(report)}
  autoRefresh={true}
  refreshInterval={30000}
/>
```

## Component Architecture

### Design System Integration

All organism components follow the established design system:

- **Consistent Spacing**: 4px base unit with responsive scaling
- **Typography Hierarchy**: Inter font family with proper heading scales
- **Color Palette**: Primary blue, success green, warning yellow, danger red
- **Component Composition**: Built from existing molecule components
- **Accessibility**: Full keyboard navigation and ARIA support

### State Management

- **Local State**: Component-specific state (filters, active tabs, etc.)
- **Prop-based**: Data and actions passed through props
- **Callback Pattern**: Event handlers for user interactions
- **TypeScript**: Full type safety with exported interfaces

### Performance Considerations

- **Memoization**: React.useMemo for expensive computations
- **Efficient Rendering**: Conditional rendering and early returns
- **Optimized Re-renders**: Proper dependency arrays in useEffect
- **Lazy Loading**: Components designed for code splitting

## Integration Guidelines

### Import Statement

```typescript
import {
  MainNavigationSidebar,
  InsightPriorityQueue,
  InteractiveMapContainer,
  InsightDetailPanel,
  RealTimeDataPanels,
  // Types
  type Insight,
  type SensorData,
  type User,
} from '@/components';
```

### Layout Integration

These organism components are designed to work together in the main dashboard layout:

```tsx
<div className="flex h-screen">
  <MainNavigationSidebar className="w-64" />
  <div className="flex-1 flex">
    <div className="flex-1 flex flex-col">
      <InteractiveMapContainer height="50%" />
      <RealTimeDataPanels className="flex-1" />
    </div>
    <InsightPriorityQueue className="w-96" />
    {selectedInsight && (
      <InsightDetailPanel
        insight={selectedInsight}
        className="w-96"
      />
    )}
  </div>
</div>
```

## Next Steps

Phase 3: Organisms is now complete! The project is ready to proceed to:

- **Phase 4: Templates** - Page layouts combining organisms
- **Integration Testing** - End-to-end component integration
- **Performance Optimization** - Bundle analysis and optimization
- **Documentation Updates** - API documentation and usage guides
