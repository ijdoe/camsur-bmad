# Epic 7.1: Data Ingestion & Simulation

## Description
Establish the foundation for feeding simulated data into the system, enabling realistic demo scenarios. This epic covers the development of mock data generators and the ingestion services that mimic external data sources (satellite, CCTV, IoT sensors).

## Functional Requirements (from PRD)
- **FR 5.1.1:** The system shall simulate ingestion of satellite imagery data (e.g., soil moisture, vegetation index).
- **FR 5.1.2:** The system shall simulate ingestion of Coram.ai CCTV alerts (e.g., rapid water level rise, landslide detection).
- **FR 5.1.3:** The system shall simulate ingestion of DMA-BD IoT sensor data (AWLG, ARG, AWS) with time-series capabilities.
- **FR 5.1.4:** The system shall support configurable mock data generation for various regions (CamSur, Metro Manila) and hazard scenarios (typhoon, flood).

## Technical Specifications (from Technical Specification)
- **Backend Service:** Data Ingestion Service
    - **Endpoints:** `POST /ingest/cctv`, `POST /ingest/iot`, `GET /ingest/satellite`
    - **Logic:** Validates incoming data, enriches with geospatial context, publishes to Kafka/BullMQ for processing.
- **Data Models:** `sensor_readings`, `cctv_alerts`, `satellite_imagery`
- **Simulated Data:** Generate realistic time-series data for AWLG, ARG, AWS based on historical weather patterns and configurable scenarios (normal, typhoon, flood). Placeholder URLs and basic analysis results for satellite imagery.

## User Stories (To be defined)
- As a developer, I want to generate realistic mock IoT sensor data so that the Threat Analysis Engine has data to process.
- As a developer, I want to simulate CCTV alerts so that the system can demonstrate real-time event detection.
- As a developer, I want to simulate satellite imagery data so that the system can demonstrate macro-level environmental analysis.
- As a developer, I want to configure data generation for different regions and hazard scenarios so that the MVP can be demonstrated effectively for various clients.
