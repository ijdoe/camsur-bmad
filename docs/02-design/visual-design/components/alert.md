# Component Specification: Alert

## 1. Overview

The Alert component is used to display important messages to users, including success confirmations, warnings, and error states. It is primarily used for toast notifications and inline alerts.

## 2. Variants

| Variant | Description | Tailwind Classes |
|---|---|---|
| **Success** | For positive actions and confirmations. | `bg-green-50 border-green-200 text-green-800` |
| **Warning** | For cautionary messages and non-critical issues. | `bg-yellow-50 border-yellow-200 text-yellow-800` |
| **Error** | For critical errors and failures. | `bg-red-50 border-red-200 text-red-800` |
| **Info** | For general information and neutral messages. | `bg-blue-50 border-blue-200 text-blue-800` |

## 3. Types

| Type | Description | Use Case |
|---|---|---|
| **Toast** | Temporary, dismissible notifications. | Alert approvals, form submissions. |
| **Inline** | Persistent alerts within page content. | Form validation errors, status messages. |
| **Banner** | Full-width alerts at page top/bottom. | System-wide notifications, maintenance alerts. |

## 4. Structure

### Toast Alert
- **Container:** `fixed top-4 right-4 z-50 max-w-sm`
- **Background:** Variant-specific background color
- **Border:** `border-l-4` with variant-specific color
- **Padding:** `p-4`
- **Shadow:** `shadow-lg`
- **Border Radius:** `rounded-md`

### Inline Alert
- **Container:** `w-full`
- **Background:** Variant-specific background color
- **Border:** `border` with variant-specific color
- **Padding:** `p-4`
- **Border Radius:** `rounded-md`

### Banner Alert
- **Container:** `w-full`
- **Background:** Variant-specific background color
- **Border:** `border-b` with variant-specific color
- **Padding:** `px-4 py-3`

## 5. Content Elements

### Icon
- **Position:** Left side of alert
- **Size:** `w-5 h-5`
- **Color:** Variant-specific text color
- **Library:** Heroicons (CheckCircle, ExclamationTriangle, XCircle, InformationCircle)

### Title (Optional)
- **Font Weight:** `font-medium`
- **Font Size:** `text-sm`
- **Color:** Variant-specific text color

### Message
- **Font Size:** `text-sm`
- **Color:** Variant-specific text color
- **Line Height:** `leading-5`

### Dismiss Button
- **Position:** Top-right corner
- **Icon:** X mark (Heroicon)
- **Size:** `w-5 h-5`
- **Hover State:** `hover:opacity-75`

## 6. States

| State | Description | Tailwind Classes |
|---|---|---|
| **Default** | Normal alert display. | - |
| **Hover** | When user hovers over dismissible alerts. | `hover:shadow-md` |
| **Focus** | When dismiss button is focused. | `focus:ring-2 focus:ring-offset-2 focus:ring-blue-500` |
| **Animating** | Fade in/out animations for toasts. | `transition-opacity duration-300` |

## 7. Behavior

### Toast Alerts
- **Auto-dismiss:** After 5 seconds (configurable)
- **Manual dismiss:** Click X button or click alert
- **Animation:** Slide in from right, fade out
- **Stacking:** Multiple toasts stack vertically with 8px gap

### Inline Alerts
- **Persistent:** Remain until manually dismissed or condition changes
- **Contextual:** Appear near related form fields or content

### Banner Alerts
- **Sticky:** Remain visible during scroll
- **Dismissible:** Can be dismissed but may reappear

## 8. Accessibility

- **ARIA Live Region:** `aria-live="polite"` for dynamic content
- **ARIA Role:** `role="alert"` for critical messages
- **Screen Reader:** Icon + title + message announced
- **Keyboard Navigation:** Tab to dismiss button
- **Color Independence:** Meaning conveyed through icons and text, not just color

## 9. Usage Examples

### Success Toast
```html
<div class="fixed top-4 right-4 z-50 max-w-sm bg-green-50 border-l-4 border-green-400 p-4 rounded-md shadow-lg">
  <div class="flex">
    <div class="flex-shrink-0">
      <svg class="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
      </svg>
    </div>
    <div class="ml-3">
      <p class="text-sm font-medium text-green-800">
        Alert Approved
      </p>
      <p class="text-sm text-green-700">
        Alert ALERT-001 has been successfully approved.
      </p>
    </div>
    <div class="ml-auto pl-3">
      <button class="inline-flex text-green-400 hover:text-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </button>
    </div>
  </div>
</div>
```

### Error Inline Alert
```html
<div class="bg-red-50 border border-red-200 rounded-md p-4">
  <div class="flex">
    <div class="flex-shrink-0">
      <svg class="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
      </svg>
    </div>
    <div class="ml-3">
      <h3 class="text-sm font-medium text-red-800">
        Approval Failed
      </h3>
      <p class="text-sm text-red-700 mt-1">
        Unable to approve alert. Please check your connection and try again.
      </p>
    </div>
  </div>
</div>
```

### Warning Banner
```html
<div class="bg-yellow-50 border-b border-yellow-200 px-4 py-3">
  <div class="flex">
    <div class="flex-shrink-0">
      <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
      </svg>
    </div>
    <div class="ml-3">
      <p class="text-sm text-yellow-700">
        <strong>System Maintenance:</strong> The alert system will be unavailable for 30 minutes starting at 2:00 AM.
      </p>
    </div>
    <div class="ml-auto pl-3">
      <button class="inline-flex text-yellow-400 hover:text-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500">
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </button>
    </div>
  </div>
</div>
