# Component Specification: Button

## 1. Overview

The Button component is used to trigger an action or event, such as submitting a form, opening a dialog, or canceling an action.

## 2. Variants

| Variant | Description | Tailwind Classes |
|---|---|---|
| **Primary** | For the principal call to action on the page. | `bg-blue-500 text-white hover:bg-blue-600` |
| **Secondary** | For secondary actions. | `bg-white text-gray-800 border border-gray-300 hover:bg-gray-100` |
| **Danger** | For actions that can have destructive consequences. | `bg-red-500 text-white hover:bg-red-600` |
| **Ghost** | For less prominent actions. | `bg-transparent text-gray-800 hover:bg-gray-100` |

## 3. Sizes

| Size | Description | Tailwind Classes |
|---|---|---|
| **Small** | For tight spaces. | `px-2 py-1 text-sm` |
| **Medium** | Default button size. | `px-4 py-2 text-base` |
| **Large** | For primary calls to action. | `px-6 py-3 text-lg` |

## 4. States

| State | Description | Tailwind Classes |
|---|---|---|
| **Default** | The button's normal state. | - |
| **Hover** | When the user's cursor is over the button. | `hover:*` |
| **Focus** | When the button is focused via keyboard. | `focus:ring-2 focus:ring-offset-2 focus:ring-blue-500` |
| **Disabled** | When the button's action is unavailable. | `opacity-50 cursor-not-allowed` |
| **Loading** | When the button's action is in progress. | `cursor-wait` (with loading spinner icon) |

## 5. Accessibility

- Buttons must have a clear, descriptive text label.
- Icon-only buttons must have an `aria-label`.
- All buttons must be focusable and operable via keyboard.
- The `disabled` attribute must be used for disabled buttons.

## 6. Usage Examples

### Primary Button
```html
<button class="px-4 py-2 text-base bg-blue-500 text-white hover:bg-blue-600 rounded-md">
  Approve Alert
</button>
```

### Danger Button with Icon
```html
<button class="px-4 py-2 text-base bg-red-500 text-white hover:bg-red-600 rounded-md flex items-center">
  <svg class="w-5 h-5 mr-2" ...> <!-- Heroicon trash icon --> </svg>
  Rescind
</button>
