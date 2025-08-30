# Story 7.1.3: Simulate Satellite Imagery Data

## Epic
[Epic 7.1: Data Ingestion & Simulation](docs/epics/epic-7.1-data-ingestion-simulation.md)

## Description
As a developer, I want to simulate satellite imagery data (metadata and analysis results) so that the system can demonstrate macro-level environmental analysis and feed into the Threat Analysis Engine. This data should be configurable for different regions and hazard scenarios.

## Functional Requirements
- **FR 5.1.1:** The system shall simulate ingestion of satellite imagery data (e.g., soil moisture, vegetation index).
- **FR 5.1.4:** The system shall support configurable mock data generation for various regions (CamSur, Metro Manila) and hazard scenarios (typhoon, flood).

## Acceptance Criteria
- **GIVEN** a configured region (e.g., CamSur) and hazard scenario (e.g., typhoon)
- **WHEN** the mock data generator is activated
- **THEN** realistic satellite imagery metadata (e.g., capture date, provider, image URL) and analysis results (e.g., soil moisture, vegetation index) shall be generated
- **AND** the generated data shall be published to the Data Ingestion Service for processing.
- **AND** the generated data shall reflect the chosen hazard scenario (e.g., higher soil saturation for typhoon scenario).

## Technical Notes
- Extend the mock data generation service/module to include satellite imagery simulation.
- Define metadata fields and analysis result structures.
- Use placeholder URLs for image_url for demo purposes.
- Ensure data is published to the message queue (Kafka/BullMQ) as specified in the Technical Specification.
- Consider how satellite data can be correlated with IoT and CCTV data for comprehensive threat analysis.
