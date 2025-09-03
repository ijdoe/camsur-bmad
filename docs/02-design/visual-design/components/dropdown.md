# Component Specification: Dropdown

## 1. Overview

The Dropdown component is used to present a list of options for user selection. It is used for filtering, form inputs, and navigation menus throughout the application.

## 2. Variants

| Variant | Description | Tailwind Classes |
|---|---|---|
| **Default** | Standard dropdown with border and background. | `relative inline-block text-left` |
| **Ghost** | Minimal styling for inline use. | `relative inline-block text-left` |
| **Button** | Styled as a button with dropdown arrow. | `relative inline-block text-left` |

## 3. Structure

### Trigger Button
- **Container:** `inline-flex items-center justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`
- **Width:** `min-w-[200px]` (configurable)
- **Height:** `h-10`

### Dropdown Arrow
- **Icon:** ChevronDown (Heroicon)
- **Size:** `w-5 h-5`
- **Position:** Right side of trigger
- **Rotation:** `transform rotate-0` (closed), `rotate-180` (open)

### Dropdown Menu
- **Container:** `absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none`
- **Position:** `right-0` (default), `left-0` (when near screen edge)
- **Width:** Matches trigger width
- **Max Height:** `max-h-60` with scroll

### Menu Items
- **Container:** `cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-100`
- **Text:** `block truncate text-gray-900`
- **Selected State:** `bg-blue-100 text-blue-900`
- **Check Icon:** `absolute inset-y-0 right-0 flex items-center pr-4` (for selected items)

## 4. States

| State | Description | Tailwind Classes |
|---|---|---|
| **Closed** | Default state, menu hidden. | - |
| **Open** | Menu visible, arrow rotated. | `rotate-180` |
| **Hover** | Trigger button hover state. | `hover:bg-gray-50` |
| **Focus** | Trigger button focus state. | `focus:ring-2 focus:ring-offset-2 focus:ring-blue-500` |
| **Disabled** | Dropdown not interactive. | `opacity-50 cursor-not-allowed` |

## 5. Behavior

### Opening/Closing
- **Click:** Click trigger to toggle menu
- **Outside Click:** Click outside to close menu
- **Escape Key:** Press Escape to close menu
- **Arrow Keys:** Navigate menu items with Up/Down arrows
- **Enter/Space:** Select highlighted item

### Selection
- **Single Select:** Click item to select and close menu
- **Multi-Select:** Checkbox items, separate "Apply" button
- **Search:** Type to filter options (for large lists)

### Positioning
- **Smart Positioning:** Opens below trigger, flips to above if insufficient space
- **Viewport Aware:** Adjusts left/right position to stay within viewport

## 6. Content Types

### Simple List
- Basic text options
- Single selection
- No icons or descriptions

### With Icons
- Options include leading icons
- Icon + text layout
- Consistent icon sizing

### With Descriptions
- Primary text + secondary description
- Multi-line layout
- Truncated descriptions

### Checkbox Options
- Multiple selection
- Checkboxes in menu items
- Apply/Cancel buttons

## 7. Accessibility

- **ARIA Expanded:** `aria-expanded="true/false"` on trigger
- **ARIA LabelledBy:** Links trigger to label
- **ARIA Activedescendant:** Tracks focused menu item
- **Role:** `role="listbox"` for menu, `role="option"` for items
- **Keyboard Navigation:** Full keyboard support
- **Screen Reader:** Announces open/closed state and selections

## 8. Responsive Behavior

### Mobile
- **Full Screen Overlay:** Large overlay on small screens
- **Touch Targets:** Minimum 44px touch targets
- **Swipe to Close:** Swipe down to dismiss

### Desktop
- **Hover to Open:** Optional hover behavior for navigation menus
- **Keyboard Shortcuts:** Custom shortcuts for power users

## 9. Usage Examples

### Basic Dropdown
```html
<div class="relative">
  <button type="button" class="inline-flex items-center justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" aria-expanded="false">
    Select Status
    <svg class="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
    </svg>
  </button>

  <div class="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none" role="listbox">
    <div class="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-100" role="option">
      <span class="block truncate">Pending Review</span>
    </div>
    <div class="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-100" role="option">
      <span class="block truncate">Approved</span>
    </div>
    <div class="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-100" role="option">
      <span class="block truncate">Rejected</span>
    </div>
  </div>
</div>
```

### With Selected Item
```html
<div class="relative">
  <button type="button" class="inline-flex items-center justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" aria-expanded="false">
    <span class="flex items-center">
      <span class="ml-3 block truncate">Approved</span>
    </span>
    <svg class="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
    </svg>
  </button>
</div>
```

### Multi-Select with Checkboxes
```html
<div class="relative">
  <button type="button" class="inline-flex items-center justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" aria-expanded="true">
    Filter by Severity
    <svg class="ml-2 -mr-1 w-5 h-5 transform rotate-180" fill="currentColor" viewBox="0 0 20 20">
      <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
    </svg>
  </button>

  <div class="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none">
    <div class="px-3 py-2 border-b border-gray-200">
      <div class="flex items-center justify-between">
        <button class="text-sm text-blue-600 hover:text-blue-500">Select All</button>
        <button class="text-sm text-gray-500 hover:text-gray-700">Clear All</button>
      </div>
    </div>

    <div class="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-100">
      <div class="flex items-center">
        <input type="checkbox" class="rounded border-gray-300 text-blue-600 focus:ring-blue-500">
        <span class="ml-3 block truncate">Critical</span>
      </div>
    </div>

    <div class="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-100">
      <div class="flex items-center">
        <input type="checkbox" checked class="rounded border-gray-300 text-blue-600 focus:ring-blue-500">
        <span class="ml-3 block truncate">Warning</span>
      </div>
    </div>

    <div class="px-3 py-2 border-t border-gray-200">
      <div class="flex items-center justify-end space-x-2">
        <button class="px-3 py-1 text-sm text-gray-600 hover:text-gray-800">Cancel</button>
        <button class="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">Apply</button>
      </div>
    </div>
  </div>
</div>
