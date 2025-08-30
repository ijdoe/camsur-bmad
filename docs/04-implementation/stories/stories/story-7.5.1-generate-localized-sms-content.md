# Story 7.5.1: Generate Localized SMS Content

## Epic
[Epic 7.5: Communication & Dissemination](docs/epics/epic-7.5-communication-dissemination.md)

## Description
As an operator, I want the system to generate localized SMS content for an approved alert so I can quickly prepare messages for affected communities, ensuring clarity and relevance.

## Functional Requirements
- **FR 5.4.1:** The system shall generate localized SMS content based on approved alerts and predefined templates.
- **FR 5.4.4:** The system shall support multi-language generation for communication templates (for demo purposes).

## Acceptance Criteria
- **GIVEN** an approved `system_alert` is available
- **AND** a predefined SMS template exists for the relevant LGU/language
- **WHEN** the operator requests to generate SMS content (e.g., from the Alert Detail Panel)
- **THEN** the system shall generate SMS content that is localized to the affected area's language/dialect (for demo purposes).
- **AND** the content shall be based on the approved alert's details (description, affected area, severity).
- **AND** the generated SMS content shall be displayed for preview.

## Technical Notes
- Implement an API endpoint in the Communication Service (`POST /communications/generate-sms`).
- Store communication templates (e.g., in `lgus.configuration` JSONB or a dedicated `communication_templates` table).
- Implement logic to dynamically select the correct template based on LGU and language settings.
- Use a templating engine or string interpolation to populate the template with alert data.
- The frontend (Alert Detail Panel) should display the generated SMS content for preview.
