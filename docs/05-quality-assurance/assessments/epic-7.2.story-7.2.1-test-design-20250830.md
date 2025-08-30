# Test Design: Story 7.2.1 - Implement Data Correlation Logic

**Date:** August 30, 2025

**Story:** [Story 7.2.1: Implement Data Correlation Logic](docs/stories/story-7.2.1-implement-data-correlation-logic.md)
**Epic:** [Epic 7.2: Threat Analysis Engine](docs/epics/epic-7.2-threat-analysis-engine.md)
**Related Risk Profile:** [Risk Profile: Story 7.2.1 - Implement Data Correlation Logic](docs/qa/assessments/epic-7.2.story-7.2.1-risk-profile-20250830.md)

## 1. Overview

This test design outlines the strategy for validating the data correlation logic within the Threat Analysis Engine. Given the critical nature of geospatial accuracy and performance identified in the risk profile, the testing will focus heavily on these areas.

## 2. Test Scenarios & Acceptance Criteria Mapping

| Scenario ID | Acceptance Criterion | Test Level | Priority | Description |
|---|---|---|---|---|
| TS-7.2.1.1 | `THEN` the engine shall successfully identify and group related data points based on their timestamp and geographical location. | Unit, Integration | P0 | Verify correct grouping of IoT, CCTV, and Satellite data within defined time/proximity windows. |
| TS-7.2.1.2 | `AND` the correlated data shall be available for rule evaluation. | Integration | P0 | Confirm that the output of the correlation logic is correctly structured and accessible by the rule engine. |
| TS-7.2.1.3 | `GIVEN` simulated IoT sensor data, CCTV alerts, and satellite imagery data are ingested into the system | Unit, Integration | P0 | Verify correct grouping of IoT, CCTV, and Satellite data within defined time/proximity windows. |
| TS-7.2.1.4 | `WHEN` the Threat Analysis Engine processes this data | Unit, Integration | P0 | Confirm that the output of the correlation logic is correctly structured and accessible by the rule engine. |
| TS-7.2.1.5 | `THEN` the engine shall successfully identify and group related data points based on their timestamp and geographical location. | Unit, Integration | P0 | Verify correct grouping of IoT, CCTV, and Satellite data within defined time/proximity windows. |
| TS-7.2.1.6 | `AND` the correlated data shall be available for rule evaluation. | Integration | P0 | Confirm that the output of the correlation logic is correctly structured and accessible by the rule engine. |

## 3. Test Levels & Strategy

### 3.1. Unit Tests (P0)
- **Focus:** Individual functions for geospatial calculations (e.g., distance, point-in-polygon), time window checks, and data grouping logic.
- **Tools:** Jest/Vitest (for TypeScript backend).
- **Coverage:** High coverage expected for core correlation algorithms.

### 3.2. Integration Tests (P0)
- **Focus:** Interaction between the Data Ingestion Service, message queue, and Threat Analysis Engine's correlation module. Verification that correlated data is correctly passed to the rule evaluation module.
- **Tools:** Supertest (for API endpoints), test containers for PostgreSQL/TimescaleDB/Kafka.
- **Scenarios:**
    -   Verify end-to-end flow from mock data generation to correlated data availability.
    -   Test correlation with various combinations of IoT, CCTV, and Satellite data.
    -   Test edge cases: data points exactly on boundaries, data outside time windows, missing data.

### 3.3. Performance Tests (P1)
- **Focus:** Measure the time taken for data correlation under high data volumes.
- **Tools:** K6, JMeter.
- **Scenarios:**
    -   Simulate ingestion of 1000 sensor readings/CCTV alerts per second (NFR 6.1.1).
    -   Measure the correlation processing time to ensure it meets NFR 6.1.2 (within 5 seconds).
    -   Identify bottlenecks in geospatial queries or data processing.

## 4. Test Data Requirements

-   **Geospatial Data:**
    -   Mock LGU boundaries (polygons) for CamSur and Metro Manila.
    -   Mock IoT sensor locations (points) within and near LGU boundaries.
    -   Mock CCTV camera locations (points) at critical infrastructure.
-   **Time-Series Data:**
    -   Realistic time-series data for AWLG, ARG, AWS, simulating normal conditions, rapid changes, and sustained events.
    -   CCTV alerts with varying event types and severities.
    -   Satellite imagery metadata with different capture dates and analysis results.
-   **Edge Cases:** Data points with identical timestamps, overlapping locations, data gaps.

## 5. Test Environment

-   Dedicated test environment mirroring production setup (Docker Compose for MVP).
-   Access to PostgreSQL/PostGIS, TimescaleDB, Redis, and Kafka/BullMQ instances.

## 6. Quality Gates (from BMAD Method)

-   **PASS:** All P0 unit and integration tests pass. Performance tests show correlation within NFRs. Geospatial correlation is accurate for all tested scenarios.
-   **CONCERNS:** Minor performance deviations, non-critical edge cases not fully covered.
-   **FAIL:** Critical tests fail (e.g., incorrect geospatial grouping, NFRs violated).

## 7. Traceability Matrix (Example)

| Requirement | Test Scenario ID | Test Level | Status |
|---|---|---|---|
| FR 5.2.1 | TS-7.2.1.1, TS-7.2.1.3, TS-7.2.1.5 | Unit, Integration | Pending |
| FR 5.2.1 | TS-7.2.1.2, TS-7.2.1.4, TS-7.2.1.6 | Integration | Pending |
| NFR 6.1.1 | Performance Test 1 | Performance | Pending |
| NFR 6.1.2 | Performance Test 2 | Performance | Pending |

## 8. Next Steps for Development

-   Implement unit tests for geospatial and time-based correlation logic.
-   Develop integration tests for the data processing pipeline.
-   Collaborate with QA to define specific performance test cases and data sets.
</content>
<task_progress>
- [x] Finalize prototype technical architecture
- [x] Create detailed technical specifications document
- [x] Step 1: Create Product Requirements Document (PRD)
- [x] Step 2: Create UX/Frontend Specification
- [x] Step 3: Update Architecture with UX Integration
- [x] Step 4: Master Checklist Review
- [x] Step 5: Shard PRD into Epics (Create directory)
- [x] Step 5: Shard PRD into Epics (Create epic files)
- [x] Step 6: Shard Epics into User Stories (Create directory)
- [x] Step 6: Shard Epics into User Stories (Create story files)
- [x] Step 7: Establish QA Framework (Create assessments directory)
- [x] Step 7: Establish QA Framework (Create gates directory)
- [x] Step 8: Risk Profile High-Risk Stories
- [x] Step 9: Create Test Design for High-Risk Stories
- [ ] Step 10: Set Up Development Environment
- [ ] Step 11: Create Database Schema
- [ ] Step 12-16: Implement Core Stories (5 Major Stories)
- [ ] Step 17: Create Multi-Region Demo Scenarios
- [ ] Step 18: Final QA & Polish
</task_progress>
