# Story 7.2.3: Generate System Alerts

## Epic
[Epic 7.2: Threat Analysis Engine](docs/epics/epic-7.2-threat-analysis-engine.md)

## Description
As a backend developer, I want the system to generate `system_alerts` with appropriate severity levels, descriptions, and contributing signals when rules are triggered by correlated data, so that operators can review and act upon them.

## Functional Requirements
- **FR 5.2.3:** The system shall generate `system_alerts` with severity levels (1-5), descriptions, and contributing signals when rules are met.

## Acceptance Criteria
- **GIVEN** correlated data that triggers a rule in an LGU's rule pack
- **WHEN** the Threat Analysis Engine evaluates the data
- **THEN** a new `system_alert` shall be created in the database.
- **AND** the alert shall include a severity level (1-5), a clear description, and references to the contributing simulated data (IoT, CCTV, Satellite).
- **AND** the alert shall be published to Redis/WebSocket for real-time dashboard updates.

## Technical Notes
- Implement the alert generation logic within the Threat Analysis Engine Service.
- Ensure the `system_alerts` data model is correctly populated, including `triggered_rules` and `contributing_signals`.
- Integrate with Redis/WebSocket to push new alerts to the frontend in real-time.
- Consider mechanisms to prevent duplicate alerts for the same ongoing event.
