# Story 7.4.1: Interactive Map Display

## Epic
[Epic 7.4: Admin/Operator Dashboard](docs/epics/epic-7.4-admin-operator-dashboard.md)

## Description
As an operator, I want to see an interactive map displaying all relevant geospatial data (LGU boundaries, sensor locations, active alerts, simulated hazards) so I can quickly understand the provincial situation and identify areas of concern.

## Functional Requirements
- **FR 5.5.1:** The dashboard shall display an interactive map (Mapbox GL JS) showing LGU boundaries, sensor locations, and active alert polygons.

## Acceptance Criteria
- **GIVEN** the operator is logged into the Admin/Operator Dashboard
- **WHEN** the dashboard loads
- **THEN** an interactive map shall be displayed, centered on the configured region (e.g., CamSur).
- **AND** the map shall display:
    -   Base layers (satellite/street view).
    -   LGU boundaries (provinces, cities, barangays) with configurable visibility.
    -   IoT and CCTV sensor locations with color-coded status indicators.
    -   Active alert polygons (GeoJSON from `system_alerts`), color-coded by severity.
    -   Simulated hazard overlays (e.g., flood extent, storm surge).
- **AND** the operator shall be able to zoom, pan, and click on map elements to view details.

## Technical Notes
- Implement the map component using Mapbox GL JS and Deck.gl for advanced visualizations.
- Integrate with the Geospatial Service (`GET /geospatial/barangays`, `GET /geospatial/municipalities`, `GET /geospatial/rivers`) to fetch boundary data.
- Fetch sensor locations and statuses from relevant backend services.
- Fetch active `system_alerts` from the Alert Management Service.
- Implement logic for rendering simulated hazard overlays based on demo scenarios.
- Ensure map interactivity allows for selection of elements to trigger detail panels (as per UX Spec).
