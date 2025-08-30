# Story 7.2.1: Implement Data Correlation Logic

## Epic
[Epic 7.2: Threat Analysis Engine](docs/epics/epic-7.2-threat-analysis-engine.md)

## Description
As a backend developer, I want to implement data correlation logic within the Threat Analysis Engine so that the system can combine information from different simulated sources (IoT, CCTV, Satellite) based on time and geospatial proximity.

## Functional Requirements
- **FR 5.2.1:** The system shall correlate simulated data from satellite, CCTV, and IoT sensors based on time and geospatial proximity.

## Acceptance Criteria
- **GIVEN** simulated IoT sensor data, CCTV alerts, and satellite imagery data are ingested into the system
- **WHEN** the Threat Analysis Engine processes this data
- **THEN** the engine shall successfully identify and group related data points based on their timestamp and geographical location.
- **AND** the correlated data shall be available for rule evaluation.

## Technical Notes
- Implement a data processing pipeline that consumes data from the message queue (Kafka/BullMQ).
- Utilize PostGIS functions for efficient geospatial proximity calculations.
- Define a correlation window (e.g., time duration, radius) for grouping related events.
- Store correlated data temporarily or pass it directly to the rule evaluation module.
