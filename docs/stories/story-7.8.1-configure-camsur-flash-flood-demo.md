# Story 7.8.1: Configure CamSur Flash Flood Demo Scenario

## Epic
[Epic 7.8: Demo Scenarios & Polish](docs/epics/epic-7.8-demo-scenarios-polish.md)

## Description
As a sales representative, I want to easily configure the MVP to demonstrate a flash flood scenario in CamSur so I can showcase its hyper-local prediction capabilities and the full alert workflow to potential clients.

## Functional Requirements
- **FR 5.1.4:** The system shall support configurable mock data generation for various regions (CamSur, Metro Manila) and hazard scenarios (typhoon, flood).
- **NFR 6.6.3:** Demo scenarios shall clearly illustrate the system's value proposition.

## Acceptance Criteria
- **GIVEN** the MVP is running
- **WHEN** a sales representative selects the "CamSur Flash Flood" demo scenario
- **THEN** the system shall load pre-configured mock data for CamSur, simulating:
    -   Heavy rainfall from ARG sensors.
    -   Rapid water level increase from AWLG sensors.
    -   CCTV alerts for rapid water level rise at critical points.
    -   Satellite data indicating high soil saturation.
- **AND** the Threat Analysis Engine shall generate a critical flash flood alert for a specific barangay in CamSur.
- **AND** the Admin/Operator Dashboard shall visually represent this scenario on the map and in the alert list.
- **AND** the operator workflow (review, approve, communication preview) shall be demonstrable for this scenario.

## Technical Notes
- Implement a configuration mechanism for demo scenarios (e.g., JSON files, database entries).
- The mock data generation service should be able to load and execute these scenario configurations.
- Ensure the Threat Analysis Engine's rules are designed to trigger correctly for this scenario.
- The frontend should have a clear way to select and activate demo scenarios.
- Prepare specific geospatial data (barangay boundaries, river networks) for CamSur.
