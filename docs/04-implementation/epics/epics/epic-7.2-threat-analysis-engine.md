# Epic 7.2: Insight Generation Engine

## Description
Develop the core intelligence that processes and correlates data to generate predictive, actionable **insights**. This epic focuses on implementing the rule-based logic for the **Phase 1 Insight Catalog**, the data correlation mechanisms, and the generation of insights with full evidence and recommendations. This epic was formerly known as the "Threat Analysis Engine."

## Functional Requirements (from PRD)
- **FR 5.2.1: Insight Correlation:** The system shall correlate simulated data from national advisories (PAGASA), CCTV, IoT sensors, and static hazard maps based on time and geospatial proximity.
- **FR 5.2.2: Rule-Based Insight Generation:** The system shall apply predefined, configurable rule packs to correlated data to generate insights from the official **Phase 1 Insight Catalog**.
- **FR 5.2.3: Insight Attributes:** Each generated insight shall have a defined set of attributes, including severity, confidence, a time window, a list of affected barangays, and an estimate of the exposed population.
- **FR 5.2.4: Evidence Panel:** Each insight must be accompanied by an explainable evidence panel that includes contributing data signals, the rule pack version, and the specific thresholds that were met.
- **FR 5.2.7: Recommendation Engine:** Upon approval, the system shall generate recommended actions and pre-fill communication templates (SMS, radio) based on the insight type and severity.

## Technical Specifications (from Technical Specification)
- **Backend Service:** Insight Generation Service (formerly Threat Analysis Engine)
    - **Consumers:** Subscribes to Kafka/BullMQ for raw data signals.
    - **Logic:** Data Correlation, Rule Evaluation (for Insight Catalog), Insight Generation, Evidence Assembly, Recommendation Generation.
    - **Publishers:** Publishes generated insights to Redis/WebSocket for the dashboard.
- **Data Models:** `Insight` (replaces `system_alert`), `Evidence`, `Recommendation`.
- **Performance:** Process and generate insights within 5 seconds of receiving critical simulated data.

## User Stories
- As a backend developer, I want to implement data correlation logic so that the system can fuse information from PAGASA, hazard maps, and simulated sensors.
- As a backend developer, I want to implement the rule-based logic for the **Barangay Flood Watch** insight, so that the system can generate predictive flood warnings.
- As a backend developer, I want to implement the rule-based logic for the **Barangay Landslide Watch** insight, so that the system can generate predictive landslide warnings.
- As a backend developer, I want to implement the logic for the **Quake Rapid Impact Estimation** insight, so that the system can provide immediate post-earthquake analysis.
- As a backend developer, I want to generate a complete **Evidence Panel** for each insight, so that all generated intelligence is transparent and explainable.
- As a backend developer, I want to implement the **Recommendation Engine** to generate pre-filled communication templates, so that operator workload is reduced.
