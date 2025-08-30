# Story 7.3.2: View Alert Details with Evidence Panel

## Epic
[Epic 7.3: Alert Management & Workflow](docs/epics/epic-7.3-alert-management-workflow.md)

## Description
As an operator, I want to view detailed information for a selected alert, including all contributing data in an "evidence panel," so I can make an informed decision about its validity and necessary actions.

## Functional Requirements
- **FR 5.3.2:** The system shall allow operators to view detailed information for each alert, including an "evidence panel" of contributing data.
- **FR 5.2.4:** The system shall support versioning of rule packs and display rule traces for explainability.

## Acceptance Criteria
- **GIVEN** an operator selects an alert from the dashboard list or map
- **WHEN** the alert detail panel is displayed
- **THEN** the panel shall show the alert's description, severity, affected area (GeoJSON polygon), and status.
- **AND** an "evidence panel" shall display:
    -   List of contributing simulated sensor readings (timestamp, type, value).
    -   Simulated CCTV snapshots/video links.
    -   The rule pack version and trace of the specific rules that triggered the alert.
- **AND** the panel shall include a preview of the generated communication messages.

## Technical Notes
- Implement a dedicated frontend component for the Alert Detail Panel.
- Fetch alert details from the Alert Management Service (`GET /alerts/:id`).
- Dynamically render contributing data from `system_alerts.contributing_signals` and `system_alerts.triggered_rules`.
- Integrate with the Communication Service to display communication previews.
- Ensure the UI clearly distinguishes between different types of evidence.
