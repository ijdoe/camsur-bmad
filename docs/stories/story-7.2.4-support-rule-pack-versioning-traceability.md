# Story 7.2.4: Support Rule Pack Versioning and Traceability

## Epic
[Epic 7.2: Threat Analysis Engine](docs/epics/epic-7.2-threat-analysis-engine.md)

## Description
As a backend developer, I want to ensure rule packs are versioned and rule traces are available for each generated alert so that alerts are explainable, auditable, and changes to rules can be tracked over time.

## Functional Requirements
- **FR 5.2.4:** The system shall support versioning of rule packs and display rule traces for explainability.

## Acceptance Criteria
- **GIVEN** a `system_alert` has been generated
- **WHEN** an operator views the alert details
- **THEN** the alert shall clearly indicate which version of the rule pack triggered it.
- **AND** the alert's "evidence panel" shall include a trace of the specific rules that fired.
- **GIVEN** an administrator updates a rule pack
- **WHEN** the rule pack is saved
- **THEN** a new version of the rule pack shall be recorded, and previous versions shall be retrievable.

## Technical Notes
- Implement a versioning mechanism for rule packs (e.g., semantic versioning).
- Store rule pack versions in the database, linked to `lgus` or a dedicated `rule_packs` table.
- Ensure the `system_alerts` data model includes `rule_pack_version` and `triggered_rules` fields.
- The Threat Analysis Engine should record the active rule pack version and the specific rules that fired when generating an alert.
- The frontend (Alert Detail Panel) should be able to display this version and trace information.
