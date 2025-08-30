# Component Specification: Modal

## 1. Overview

The Modal component is used to display content in a layer above the main page, requiring user interaction to dismiss.

## 2. Structure

| Part | Description | Tailwind Classes |
|---|---|---|
| **Overlay** | The backdrop that covers the page. | `fixed inset-0 bg-gray-500 bg-opacity-75` |
| **Panel** | The main modal container. | `bg-white rounded-lg shadow-xl` |
| **Title** | The title of the modal. | `text-lg font-medium leading-6 text-gray-900` |
| **Body** | The main content area. | `mt-2 text-sm text-gray-500` |
| **Footer** | The area for action buttons. | `mt-4 flex justify-end space-x-2` |

## 3. Behavior

- Modals should be dismissible by clicking the overlay, pressing the Escape key, or clicking a close button.
- Focus should be trapped within the modal while it is open.
- The page behind the modal should not be scrollable.

## 4. Accessibility

- Use `role="dialog"` and `aria-modal="true"`.
- Use `aria-labelledby` to link the modal title to the panel.
- Manage focus appropriately when the modal opens and closes.

## 5. Usage Example

```html
<div class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
  <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
    <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
    <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
      <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <div class="sm:flex sm:items-start">
          <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
              Confirm Action
            </h3>
            <div class="mt-2">
              <p class="text-sm text-gray-500">
                Are you sure you want to proceed? This action cannot be undone.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
        <button type="button" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 sm:ml-3 sm:w-auto sm:text-sm">
          Confirm
        </button>
        <button type="button" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:w-auto sm:text-sm">
          Cancel
        </button>
      </div>
    </div>
  </div>
</div>
