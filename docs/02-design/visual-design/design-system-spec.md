# Design System Specification

## 1. Introduction

This document defines the comprehensive design system for Project LINGKOD. It serves as the single source of truth for visual design, UI components, and frontend development standards, ensuring a consistent, high-quality, and accessible user experience. This specification is derived from the `ux-specification.md`.

## 2. Color Palette

| Role | Hex Code | Tailwind Class | Usage |
|---|---|---|---|
| **Primary** | `#3B82F6` | `blue-500` | Main brand color, primary buttons, links, active states. |
| **Secondary** | `#6B7280` | `gray-500` | Secondary text, borders, disabled states. |
| **Success** | `#10B981` | `green-500` | Success messages, "Normal" status indicators. |
| **Warning** | `#F59E0B` | `yellow-500` | Warning messages, "Warning" status indicators. |
| **Danger** | `#EF4444` | `red-500` | Error messages, "Critical" status, destructive actions. |
| **Background** | `#F3F4F6` | `gray-100` | Main application background. |
| **Surface** | `#FFFFFF` | `white` | Card backgrounds, modals, panels. |
| **Text** | `#1F2937` | `gray-800` | Primary text color. |

## 3. Typography

- **Font Family:** Inter (sans-serif)
- **Base Font Size:** 16px

| Element | Font Size | Font Weight | Tailwind Class |
|---|---|---|---|
| **H1** | 36px | Bold | `text-4xl font-bold` |
| **H2** | 30px | Bold | `text-3xl font-bold` |
| **H3** | 24px | Semi-bold | `text-2xl font-semibold` |
| **H4** | 20px | Semi-bold | `text-xl font-semibold` |
| **Body** | 16px | Normal | `text-base` |
| **Small** | 14px | Normal | `text-sm` |
| **Caption**| 12px | Normal | `text-xs` |

## 4. Spacing & Sizing

- **Base Unit:** 4px
- **System:** Multiples of the base unit (e.g., 8px, 12px, 16px, 24px, 32px).
- **Tailwind Mapping:** `1` = 4px, `2` = 8px, `3` = 12px, etc.
- **Max Content Width:** 1280px (`max-w-7xl`)

## 5. Iconography

- **Library:** Heroicons
- **Style:** Outline for general use, Solid for active/selected states.
- **Size:** 24x24px for standard icons, 16x16px for inline text icons.

## 6. Components

This section will link to detailed specifications for each UI component.

- **Button:** See `components/button.md`
- **Input:** See `components/input.md`
- **Card:** See `components/card.md`
- **Modal:** See `components/modal.md`
- **Table:** See `components/table.md`
- **Alert:** See `components/alert.md`
- **Dropdown:** See `components/dropdown.md`

## 7. Layout

- **Primary Layout:** Left sidebar (280px width), main content area.
- **Responsive Breakpoints:**
    - `sm`: 640px
    - `md`: 768px
    - `lg`: 1024px
    - `xl`: 1280px
- **Grid System:** CSS Grid and Flexbox will be used for layout.

## 8. Accessibility (WCAG 2.1 AA)

- **Color Contrast:** All text must have a minimum contrast ratio of 4.5:1 against its background.
- **Keyboard Navigation:** All interactive elements must be focusable and operable via keyboard.
- **ARIA Attributes:** Use appropriate ARIA roles and attributes for all components.
- **Focus Indicators:** A clear and consistent focus style must be present for all focusable elements.
