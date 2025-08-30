# Story 7.5.2: Generate Pre-formatted Radio Broadcast Scripts

## Epic
[Epic 7.5: Communication & Dissemination](docs/epics/epic-7.5-communication-dissemination.md)

## Description
As an operator, I want the system to generate pre-formatted radio broadcast scripts for an approved alert so I can provide clear, standardized instructions to local radio stations for immediate dissemination.

## Functional Requirements
- **FR 5.4.2:** The system shall generate pre-formatted radio broadcast scripts based on approved alerts and templates.
- **FR 5.4.4:** The system shall support multi-language generation for communication templates (for demo purposes).

## Acceptance Criteria
- **GIVEN** an approved `system_alert` is available
- **AND** a predefined radio broadcast template exists for the relevant LGU/language
- **WHEN** the operator requests to generate a radio script (e.g., from the Alert Detail Panel)
- **THEN** the system shall generate a script that is localized to the affected area's language/dialect (for demo purposes).
- **AND** the script shall be based on the approved alert's details (description, affected area, severity).
- **AND** the generated radio script shall be displayed for preview, including clear instructions for broadcasters.

## Technical Notes
- Implement an API endpoint in the Communication Service (`POST /communications/generate-radio`).
- Store communication templates (e.g., in `lgus.configuration` JSONB or a dedicated `communication_templates` table).
- Implement logic to dynamically select the correct template based on LGU and language settings.
- Use a templating engine or string interpolation to populate the template with alert data.
- The frontend (Alert Detail Panel) should display the generated radio script for preview.
