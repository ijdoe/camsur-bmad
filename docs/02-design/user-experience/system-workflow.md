# Project LINGKOD: System Workflow

## 1. Overview

This document details the end-to-end workflow of the Project LINGKOD system, from data ingestion to alert dissemination. It defines the core logic of the `ThreatAnalysisEngine` and the processes for both standalone and complementary operational modes.

## 2. Workflow Diagram

```mermaid
graph TD
    subgraph "Data Ingestion Layer"
        A[Satellite Imagery API]
        B[Coram.ai CCTV Webhooks]
        C[DMA-BD IoT Sensor Push]
    end

    subgraph "Threat Analysis Engine"
        D[Data Fusion & Correlation]
        E{Rule Evaluation}
        F[Alert Object Generation]
    end

    subgraph "Output & Dissemination Layer"
        G[Standalone Mode: Coram.ai EMS]
        H[Complementary Mode: API Feed for ArcGIS]
        I[Last-Mile Communication]
    end

    A --> D
    B --> D
    C --> D
    D --> E

    E -- Rule Met --> F
    E -- Rule Not Met --> D

    F --> G
    F --> H

    G -- Operator Verification --> I

    subgraph "Last-Mile Channels"
        J[SMS Gateway]
        K[Radio Broadcast Scripts]
        L[Barangay Official Alerts]
    end

    I --> J
    I --> K
    I --> L

    style F fill:#9cf,stroke:#333,stroke-width:2px
    style G fill:#ccf,stroke:#333,stroke-width:2px
    style H fill:#ccf,stroke:#333,stroke-width:2px
```

## 3. Data Ingestion Layer

This layer is responsible for receiving data from all external sources.

### 2.1. Satellite Imagery
- **Source:** [Provider TBD]
- **Frequency:** Daily
- **Process:** The system will pull the latest provincial imagery via API.
- **Initial Analysis:** Pre-processing for change detection, vegetation stress, and soil moisture.

### 2.2. AI-Powered CCTV Alerts
- **Source:** Coram.ai Platform
- **Frequency:** Real-time
- **Process:** The system receives push notifications (webhooks) for critical events.
- **Data Points:** Event type (e.g., "RapidWaterLevelRise"), location, timestamp, severity.

### 2.3. IoT Sensor Network
- **Source:** DMA-BD Sensor Stations
- **Frequency:** Every 15 minutes
- **Process:** The system receives data pushed from the sensor network's central server.
- **Data Points:** Water level (AWLG), rainfall rate (ARG), weather data (AWS).

## 3. Threat Analysis Engine

This is the core processing layer where data is fused and predictive alerts are generated.

### 3.1. Data Correlation
- The engine correlates data streams based on geographic proximity and time.
- **Example:** An IoT sensor's high rainfall reading is correlated with a nearby CCTV alert for rising water levels.

### 3.2. Rule-Based Alerting
- The engine applies a set of predefined rules to the correlated data.
- **Initial Pilot Rules:**
    1.  **Flash Flood Rule:** `(ARG > 20mm/hr for 1hr)` AND `(AWLG increase > 0.5m in 15min)` -> **Severity 3 Alert**.
    2.  **Sustained Rainfall Rule:** `(ARG > 10mm/hr for 3hrs)` -> **Severity 2 Alert**.
- **Future Rules:** [To be developed, e.g., landslide risk based on soil saturation from satellite data and rainfall].

### 3.3. Alert Generation
- When a rule's conditions are met, a structured alert object is created.
- **Alert Object Schema:** Contains `alertId`, `timestamp`, `area` (municipality, barangay), `geometry` (GeoJSON), `description`, and `severity`.

## 4. Output & Dissemination Layer

This layer handles the delivery of alerts to the appropriate channels.

### 4.1. Standalone Mode (Coram.ai EMS)
- **Target:** PDRRMO Operator
- **Process:** The generated alert object is sent to the Coram.ai EMS API.
- **Visualization:** The alert is displayed on the EMS map dashboard, highlighting the affected area using the GeoJSON geometry.
- **Action:** The operator verifies the alert and triggers the "last-mile" communication workflow.

### 4.2. Complementary Mode (API Feed)
- **Target:** Existing City-Level Command Centers (e.g., ArcGIS-based)
- **Process:** The generated alert object is made available via the secure `/api/v1/alerts` endpoint.
- **Consumption:** Third-party systems can poll this endpoint to ingest high-fidelity, actionable alerts directly into their own platforms.

### 4.3. Last-Mile Communication (Triggered from Standalone Mode)
- **Process:** Based on the verified alert, the Emergency Command Platform generates targeted messages.
- **Channels:**
    1.  **SMS Gateway:** Sends pre-formatted warnings to registered residents in the affected barangay.
    2.  **Radio Broadcast:** Generates a script for local radio stations with clear, simple instructions.
    3.  **Barangay Officials:** Sends a detailed alert and instructions directly to local leaders.

## 5. Operator Review, Approval & Audit

- States: Draft -> Pending Review -> Approved -> Disseminated -> Rescinded.
- Approval gate: All citizen-facing alerts are gated behind operator approval in the EMS.
- Evidence panel (per alert): correlated sensor readings (ARG/AWLG/AWS), CCTV event snapshots/metadata, satellite-derived indicators (if any), rule trace (which rules fired), thresholds, and confidence score.
- Operator actions: verify geometry and affected barangays, add instructions, adjust severity (within governed bounds), approve/deny with reason.
- Audit trail: every action is logged (user, timestamp, fields changed, reason); immutable event log supports after-action reviews and governance audits.
- Escalation: conflicting signals or high severity auto-page a senior operator; SLA timers highlight pending approvals breaching thresholds.

## 6. Feedback Loop to Rule Packs

- Post-event review: after-action reviews compare alerts vs. observed impacts and PAGASA bulletins; misclassifications are labeled.
- Tuning workflow: proposed threshold/rule changes are captured as change requests; Advisory Board reviews/approves; rule packs are versioned (semantic versioning) and scheduled for rollout.
- Shadow evaluation: candidate rule changes run in shadow mode before activation to measure impact on precision/recall and lead time.

## 7. Data & Model Governance Overview

- Rule packs: YAML/JSON, version-controlled; each alert records the rule pack version used.
- ML components (if any): documented via model cards with training data provenance; can be toggled off per rule; evaluation reports attached to change requests.
- Security & retention: access-controlled EMS/API; encryption in transit/at rest; retention and deletion policies aligned with PDRRMO guidance.
- Monitoring: dashboards for data freshness, ingestion lag, and sensor anomalies; alerts for stale feeds.

## 8. Standards, Interoperability, and CAP/GeoJSON Notes

- Complementary mode: Alerts available as GeoJSON features for ArcGIS and other GIS tools.
- CAP 1.2: Per-alert CAP documents are generated/mapped (headline, severity, effective/expires, area polygons/refs, status/msgType).
- Traceability: CAP/GeoJSON outputs include references to the internal alertId and rulePackVersion for end-to-end traceability.
