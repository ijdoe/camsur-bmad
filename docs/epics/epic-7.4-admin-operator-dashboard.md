# Epic 7.4: Admin/Operator Dashboard

## Description
Build the primary user interface for monitoring, managing, and interacting with the system. This epic covers the development of the Next.js/React frontend, including the interactive map, real-time data panels, alert lists, and administrative functions.

## Functional Requirements (from PRD)
- **FR 5.5.1:** The dashboard shall display an interactive map (Mapbox GL JS) showing LGU boundaries, sensor locations, and active alert polygons.
- **FR 5.5.2:** The dashboard shall provide real-time data feeds for latest sensor readings and CCTV events.
- **FR 5.5.3:** The dashboard shall include filterable and sortable lists/tables of `system_alerts`.
- **FR 5.5.4:** The dashboard shall support user management (CRUD for Admin role).
- **FR 5.5.5:** The dashboard shall support LGU management (CRUD for Admin role), including configuration of rule packs and communication settings.
- **FR 5.5.6:** The dashboard shall display basic historical data and analytics (e.g., sensor trends, alert frequency).

## Technical Specifications (from Technical Specification)
- **Frontend Framework:** Next.js 14+ (React) with TypeScript
- **Styling:** Tailwind CSS
- **Mapping:** Mapbox GL JS + Deck.gl
- **Charting:** Chart.js or Recharts
- **Layout & Navigation (from UX Spec):** Responsive, multi-column layout, sidebar navigation, top bar.
- **Components (from UX Spec):** Interactive Map (with specific overlays), Real-time Data Panels, Alert List/Table, Alert Detail Panel, User Management, LGU Management, Historical Data & Analytics.
- **Visual Design System (from UX Spec):** Adheres to defined color palette, typography, iconography, and components.

## User Stories (To be defined)
- As an operator, I want to see an interactive map displaying all relevant geospatial data (boundaries, sensors, alerts) so I can quickly understand the provincial situation.
- As an operator, I want to view real-time feeds of sensor readings and CCTV events so I can stay updated on critical data.
- As an operator, I want to filter and sort the list of alerts so I can prioritize my review.
- As an administrator, I want to manage user accounts and roles so I can control access to the system.
- As an administrator, I want to configure LGU-specific settings, including rule packs and communication channels, so that the system is tailored to each client.
- As an operator, I want to see basic historical data and trends so I can understand past events and system performance.
