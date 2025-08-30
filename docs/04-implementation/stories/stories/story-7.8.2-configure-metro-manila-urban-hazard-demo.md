# Story 7.8.2: Configure Metro Manila Urban Hazard Demo Scenario

## Epic
[Epic 7.8: Demo Scenarios & Polish](docs/epics/epic-7.8-demo-scenarios-polish.md)

## Description
As a sales representative, I want to easily configure the MVP to demonstrate an urban hazard scenario in Metro Manila so I can highlight its adaptability to complex urban environments and diverse data sources.

## Functional Requirements
- **FR 5.1.4:** The system shall support configurable mock data generation for various regions (CamSur, Metro Manila) and hazard scenarios (typhoon, flood).
- **NFR 6.6.3:** Demo scenarios shall clearly illustrate the system's value proposition.

## Acceptance Criteria
- **GIVEN** the MVP is running
- **WHEN** a sales representative selects the "Metro Manila Urban Hazard" demo scenario
- **THEN** the system shall load pre-configured mock data for Metro Manila, simulating:
    -   Urban flooding conditions.
    -   CCTV alerts for traffic congestion, debris, or specific urban events.
    -   Relevant IoT sensor data for an urban environment.
    -   Satellite data relevant to urban areas (e.g., infrastructure damage, population density).
- **AND** the Threat Analysis Engine shall generate relevant alerts for urban hazards.
- **AND** the Admin/Operator Dashboard shall visually represent this scenario on the map and in the alert list.
- **AND** the operator workflow (review, approve, communication preview) shall be demonstrable for this scenario.

## Technical Notes
- Extend the configuration mechanism for demo scenarios to include Metro Manila-specific data.
- Develop mock data generators that simulate urban-specific events and sensor readings.
- Ensure the Threat Analysis Engine's rules can handle urban hazard conditions.
- Prepare specific geospatial data (city boundaries, key infrastructure) for Metro Manila.
- The frontend should be able to dynamically load and display Metro Manila-specific map data and overlays.
