# Component Specification: Table

## 1. Overview

The Table component is used to display tabular data in a structured, accessible format. It is primarily used for the Alerts List view and other data-heavy interfaces.

## 2. Variants

| Variant | Description | Tailwind Classes |
|---|---|---|
| **Default** | Standard table with borders and hover effects. | `border border-gray-200 rounded-lg overflow-hidden` |
| **Compact** | Reduced padding for dense data display. | `border border-gray-200 rounded-lg overflow-hidden` (with smaller padding) |
| **Borderless** | Clean table without borders for embedded use. | `rounded-lg overflow-hidden` |

## 3. Structure

### Header Row
- **Background:** `bg-gray-50`
- **Text Color:** `text-gray-900`
- **Font Weight:** `font-semibold`
- **Padding:** `px-6 py-3`
- **Border:** `border-b border-gray-200`

### Data Rows
- **Background:** `bg-white` (alternating with `bg-gray-50` for readability)
- **Hover State:** `hover:bg-gray-100`
- **Padding:** `px-6 py-4`
- **Border:** `border-b border-gray-200`

### Cell Content
- **Text Color:** `text-gray-900`
- **Font Size:** `text-sm`
- **Line Height:** `leading-5`

## 4. States

| State | Description | Tailwind Classes |
|---|---|---|
| **Default** | Normal table state. | - |
| **Loading** | Shows loading skeleton or spinner. | `opacity-50` |
| **Empty** | No data to display. | - |
| **Error** | Data loading failed. | - |

## 5. Interactive Elements

### Sortable Columns
- **Indicator:** Up/down chevron icons in header
- **Active State:** `text-blue-600` for sorted column
- **Hover State:** `hover:text-blue-500`

### Row Selection
- **Checkbox:** In first column for multi-select
- **Selected State:** `bg-blue-50` background
- **Border:** `border-blue-200`

### Row Actions
- **Menu Button:** Three-dot menu in last column
- **Dropdown:** Context menu with actions

## 6. Responsive Behavior

### Mobile (sm breakpoint)
- **Horizontal Scroll:** `overflow-x-auto`
- **Sticky Header:** Header remains visible while scrolling
- **Minimum Width:** `min-w-full`

### Desktop (md+ breakpoint)
- **Full Width:** `w-full`
- **Flexible Columns:** Auto-sizing based on content

## 7. Accessibility

- **Semantic HTML:** Uses `<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, `<td>`
- **ARIA Labels:** `aria-label` for table purpose
- **Keyboard Navigation:** Arrow keys for cell navigation
- **Screen Reader:** Proper table headers and data relationships
- **Focus Management:** Visible focus indicators on interactive elements

## 8. Usage Examples

### Basic Table
```html
<table class="min-w-full divide-y divide-gray-200">
  <thead class="bg-gray-50">
    <tr>
      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Alert ID
      </th>
      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Severity
      </th>
      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Status
      </th>
    </tr>
  </thead>
  <tbody class="bg-white divide-y divide-gray-200">
    <tr class="hover:bg-gray-50">
      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        ALERT-001
      </td>
      <td class="px-6 py-4 whitespace-nowrap">
        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
          Critical
        </span>
      </td>
      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        Pending Review
      </td>
    </tr>
  </tbody>
</table>
```

### With Sorting and Selection
```html
<table class="min-w-full divide-y divide-gray-200">
  <thead class="bg-gray-50">
    <tr>
      <th class="px-6 py-3 text-left">
        <input type="checkbox" class="rounded border-gray-300">
      </th>
      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-blue-600">
        Timestamp
        <svg class="ml-1 w-4 h-4 inline">↑</svg>
      </th>
      <!-- Additional columns -->
    </tr>
  </thead>
  <!-- Table body with selectable rows -->
</table>
