# Story 7.3.3: Approve/Rescind Alerts

## Epic
[Epic 7.3: Alert Management & Workflow](docs/epics/epic-7.3-alert-management-workflow.md)

## Description
As an operator, I want to approve an alert so that it can be disseminated to affected communities, or rescind an alert if it is no longer valid or was a false alarm. This action should be recorded for audit purposes.

## Functional Requirements
- **FR 5.3.3:** The system shall provide an operator workflow for approving, editing, or rescinding alerts.
- **FR 5.3.4:** The system shall maintain an audit trail of all operator actions on alerts.

## Acceptance Criteria
- **GIVEN** an operator is viewing an alert in the detail panel
- **WHEN** the operator clicks "Approve"
- **THEN** the alert status shall change to "Approved".
- **AND** the system shall record the operator's ID and timestamp of approval in the audit trail.
- **AND** the system shall *simulate* the dissemination of communications for the approved alert.
- **WHEN** the operator clicks "Rescind"
- **THEN** the alert status shall change to "Rescinded".
- **AND** the system shall record the operator's ID and timestamp of rescission in the audit trail.
- **AND** the system shall prevent further simulated dissemination of the rescinded alert.

## Technical Notes
- Implement API endpoints in the Alert Management Service for `POST /alerts/:id/approve` and `POST /alerts/:id/rescind`.
- Update the `system_alerts` data model to include `status`, `approved_by`, and `approved_at` fields.
- Implement audit logging for all state transitions and operator actions.
- The frontend (Alert Detail Panel) should provide clear buttons for these actions and confirmation dialogs.
- Integrate with the Communication Service to trigger simulated dissemination upon approval.
