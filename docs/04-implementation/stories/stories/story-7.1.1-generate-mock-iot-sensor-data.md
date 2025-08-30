# Story 7.1.1: Generate Mock IoT Sensor Data

## Epic
[Epic 7.1: Data Ingestion & Simulation](docs/epics/epic-7.1-data-ingestion-simulation.md)

## Description
As a developer, I want to generate realistic mock IoT sensor data (AWLG, ARG, AWS) so that the Threat Analysis Engine has data to process and the dashboard can display real-time readings. This data should be configurable for different regions and hazard scenarios.

## Functional Requirements
- **FR 5.1.3:** The system shall simulate ingestion of DMA-BD IoT sensor data (AWLG, ARG, AWS) with time-series capabilities.
- **FR 5.1.4:** The system shall support configurable mock data generation for various regions (CamSur, Metro Manila) and hazard scenarios (typhoon, flood).

## Acceptance Criteria
- **GIVEN** a configured region (e.g., CamSur) and hazard scenario (e.g., normal, typhoon, flood)
- **WHEN** the mock data generator is activated
- **THEN** realistic time-series data for AWLG, ARG, and AWS sensors shall be generated
- **AND** the generated data shall be published to the Data Ingestion Service for processing.
- **AND** the generated data shall reflect the chosen hazard scenario (e.g., higher water levels/rainfall for flood scenario).

## Technical Notes
- Implement a dedicated mock data generation service or module.
- Use a configuration file or environment variables to define regions and scenarios.
- Data should be generated at a configurable frequency (e.g., every 15 minutes as per `techContext.md`).
- Publish data to the message queue (Kafka/BullMQ) as specified in the Technical Specification.
- Consider using a library for time-series data generation or simple mathematical models.
