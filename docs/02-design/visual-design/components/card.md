# Component Specification: Card

## 1. Overview

The Card component is a flexible container for displaying content in a structured way.

## 2. Structure

A card typically consists of a header, a body, and a footer.

| Part | Description | Tailwind Classes |
|---|---|---|
| **Wrapper** | The main card container. | `bg-white shadow-md rounded-lg` |
| **Header** | Optional header section. | `px-4 py-5 border-b border-gray-200 sm:px-6` |
| **Body** | Main content area. | `p-4 sm:p-6` |
| **Footer** | Optional footer section. | `px-4 py-4 sm:px-6` |

## 3. Variants

- **Default:** Standard card with shadow and rounded corners.
- **Clickable:** A card that acts as a link, with a hover effect. (`hover:shadow-lg hover:border-gray-300`)

## 4. Accessibility

- The card header should use an appropriate heading level (e.g., `h3`).
- If the entire card is clickable, it should be wrapped in an `a` tag or have a `role="link"` and be keyboard focusable.

## 5. Usage Example

```html
<div class="bg-white shadow-md rounded-lg overflow-hidden">
  <div class="px-4 py-5 border-b border-gray-200 sm:px-6">
    <h3 class="text-lg leading-6 font-medium text-gray-900">
      Alert Summary
    </h3>
  </div>
  <div class="p-4 sm:p-6">
    <p>Content goes here.</p>
  </div>
  <div class="px-4 py-4 bg-gray-50 sm:px-6">
    <a href="#" class="text-sm font-medium text-blue-600 hover:text-blue-500">
      View details
    </a>
  </div>
</div>
