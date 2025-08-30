# Component Specification: Input

## 1. Overview

The Input component is used for collecting user-provided data in a text format.

## 2. Variants

| Variant | Description | Tailwind Classes |
|---|---|---|
| **Default** | Standard text input. | `border-gray-300 focus:ring-blue-500 focus:border-blue-500` |
| **Error** | To indicate a validation error. | `border-red-500 text-red-600 focus:ring-red-500 focus:border-red-500` |

## 3. States

| State | Description | Tailwind Classes |
|---|---|---|
| **Default** | The input's normal state. | `border-gray-300` |
| **Focus** | When the input is focused. | `focus:ring-2 focus:ring-offset-2 focus:ring-blue-500` |
| **Disabled** | When the input is not available for interaction. | `bg-gray-100 cursor-not-allowed` |
| **Read Only** | When the input's value cannot be changed. | `bg-gray-100` |

## 4. Layout

- Inputs should be paired with a `label` for accessibility.
- Validation error messages should be displayed below the input.

## 5. Accessibility

- Each input must have a corresponding `label` with a `for` attribute matching the input's `id`.
- Use `aria-describedby` to link error messages to the input.
- Use the `disabled` attribute for disabled inputs.

## 6. Usage Example

```html
<div>
  <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
  <div class="mt-1">
    <input
      type="text"
      name="username"
      id="username"
      class="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
      placeholder="johndoe"
    />
  </div>
  <p class="mt-2 text-sm text-red-600" id="username-error">Username is required.</p>
</div>
