# Story 7.1.2: Simulate CCTV Alerts

## Epic
[Epic 7.1: Data Ingestion & Simulation](docs/epics/epic-7.1-data-ingestion-simulation.md)

## Description
As a developer, I want to simulate Coram.ai CCTV alerts so that the system can demonstrate real-time event detection and feed into the Threat Analysis Engine. These alerts should be configurable for different regions and hazard scenarios.

## Functional Requirements
- **FR 5.1.2:** The system shall simulate ingestion of Coram.ai CCTV alerts (e.g., rapid water level rise, landslide detection).
- **FR 5.1.4:** The system shall support configurable mock data generation for various regions (CamSur, Metro Manila) and hazard scenarios (typhoon, flood).

## Acceptance Criteria
- **GIVEN** a configured region (e.g., CamSur) and hazard scenario (e.g., flood)
- **WHEN** the mock data generator is activated
- **THEN** realistic CCTV alerts (e.g., 'RapidWaterLevelRise', 'LandslideDetected') shall be generated
- **AND** the generated alerts shall be published to the Data Ingestion Service for processing.
- **AND** the generated alerts shall reflect the chosen hazard scenario (e.g., more frequent or severe alerts for flood scenario).

## Technical Notes
- Extend the mock data generation service/module to include CCTV alert simulation.
- Define alert types, severities, and associated metadata (e.g., source camera ID, location).
- Ensure alerts are published to the message queue (Kafka/BullMQ) as specified in the Technical Specification.
- Consider linking CCTV alerts to simulated IoT data for more realistic correlation scenarios.
