# Story 7.3.4: Edit Alert Geometry and Add Notes

## Epic
[Epic 7.3: Alert Management & Workflow](docs/epics/epic-7.3-alert-management-workflow.md)

## Description
As an operator, I want to adjust the alert geometry (GeoJSON polygon) and add notes to an alert so that the information is accurate, complete, and reflects the latest ground truth. This action should be recorded for audit purposes.

## Functional Requirements
- **FR 5.3.3:** The system shall provide an operator workflow for approving, editing, or rescinding alerts.
- **FR 5.3.4:** The system shall maintain an audit trail of all operator actions on alerts.
- **FR 5.3.5:** The system shall allow operators to adjust alert geometry (GeoJSON polygon) and add notes.

## Acceptance Criteria
- **GIVEN** an operator is viewing an alert in the detail panel
- **WHEN** the operator clicks "Edit Geometry"
- **THEN** the map interface shall allow the operator to modify the GeoJSON polygon defining the affected area.
- **WHEN** the operator adds or updates notes in the alert detail panel
- **THEN** the notes shall be saved with the alert.
- **AND** all changes to geometry and notes shall be recorded in the audit trail, including the operator's ID and timestamp.

## Technical Notes
- Implement an API endpoint in the Alert Management Service for `PUT /alerts/:id` to update alert details.
- The frontend (Alert Detail Panel) should integrate a map editing tool (e.g., Mapbox GL Draw) to allow operators to modify GeoJSON polygons.
- Update the `system_alerts` data model to store `operator_notes` and track changes to `geometry`.
- Ensure audit logging captures changes to both geometry and notes.
