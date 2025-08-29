# Project LINGKOD: Pilot Program Technical Scope

## 1. Introduction

This document outlines the technical specifications for the pilot deployment of Project LINGKOD. The goal of the pilot is to validate the core functionality of the dual-mode intelligence engine in a limited, real-world environment.

## 2. Pilot Municipalities

*   **[Municipality 1]:** [Reason for selection, e.g., high flood risk, existing sensor infrastructure]
*   **[Municipality 2]:** [Reason for selection, e.g., diverse geography, strong LGU cooperation]

## 3. Data Integration Plan

### 3.1. Coram.ai - AI CCTV Alerts
*   **API Endpoint:** `[TBD]`
*   **Authentication:** `[TBD]`
*   **Data Schema (JSON):**
    ```json
    {
      "alertId": "string",
      "timestamp": "datetime",
      "location": {
        "lat": "float",
        "lon": "float"
      },
      "eventType": "string", // e.g., "RapidWaterLevelRise"
      "severity": "integer", // 1-5
      "sourceCameraId": "string"
    }
    ```

### 3.2. DMA-BD - IoT Sensor Network
*   **Data Push URL:** `[To be provided to DMA-BD]`
*   **Data Schema (JSON):**
    ```json
    {
      "stationId": "string",
      "timestamp": "datetime",
      "sensors": [
        { "type": "AWLG", "value": "float", "unit": "meters" },
        { "type": "ARG", "value": "float", "unit": "mm/hr" },
        { "type": "AWS", "temperature": "float", "humidity": "float", "windSpeed": "float" }
      ]
    }
    ```

### 3.3. Satellite Imagery Provider
*   **Provider:** `[TBD]`
*   **API Endpoint:** `[TBD]`
*   **Data Format:** `[e.g., GeoTIFF]`
*   **Frequency:** `[e.g., Daily]`

## 4. Sensor Deployment Plan

*   **New AWLG/ARG Stations:** `[Number]`
*   **Proposed Locations:**
    *   `[Location 1: Justification]`
    *   `[Location 2: Justification]`

## 5. Threat Analysis Engine: Initial Rules

The pilot will focus on a primary use case: flash flood prediction.

*   **Rule 1: Rapid Water Level Rise**
    *   **Trigger:** `AWLG reading increases by > 0.5m in 15 minutes.`
    *   **AND** `ARG reading > 10mm/hr.`
    *   **Action:** Generate `Severity 3` alert for the corresponding barangay.

*   **Rule 2: Sustained High Rainfall**
    *   **Trigger:** `ARG reading > 20mm/hr for 1 hour.`
    *   **Action:** Generate `Severity 2` alert for the municipality.

## 6. Outputs

### 6.1. Standalone Mode (Coram.ai EMS)
*   Alerts will be visualized on the main dashboard map.
*   SMS and Radio scripts will be generated based on predefined templates.

### 6.2. Complementary Mode (API)
*   **API Endpoint:** `/api/v1/alerts`
*   **Authentication:** `Bearer Token`
*   **Output Schema (JSON):**
    ```json
    {
      "alertId": "string",
      "timestamp": "datetime",
      "area": {
        "municipality": "string",
        "barangay": "string"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": "array" // GeoJSON coordinates array
      },
      "description": "string", // e.g., "Flash flood warning for Barangay San Roque"
      "severity": "integer"
    }
    ```

    ## 7. Trust & Assurance Framework
    - Proven components: DMA-BD river monitoring (>800 sites, <1% deviation), Coram.ai EMS deployments, commercial satellite providers.
    - Human-in-the-loop: All citizen-facing alerts require operator approval in EMS; every action recorded with user, timestamp, reason.
    - Transparent logic: Versioned rule packs; per-alert evidence panel showing signals, thresholds fired, confidence.
    - Standards & interoperability: Outputs as CAP 1.2 and GeoJSON; integrates with ArcGIS; aligns to ICS/NDRRMC processes.
    - Local capacity: Training, playbooks, drills; capability transfer plan for PDRRMO.
    - Measured results: KPIs tracked during pilot; shadow mode before public alerts.

    ## 8. Governance & Advisory Board
    - Composition: PAGASA liaison (advisory), local university hydrology/DRRM expert, PDRRMO operations lead, Synthesiq lead engineer (secretariat).
    - Responsibilities: Threshold governance, validation cadence, change control, incident review, acceptance sign-off.
    - Cadence: Weekly pilot review; after-action reviews post-event; monthly governance meeting.

    ## 9. Validation & Acceptance Plan
    - Phase 0 — Historical backtesting: Re-play past typhoon events; measure precision/recall, lead time vs PAGASA bulletins and field logs.
    - Phase 1 — Shadow mode: Live ingestion, alerts not released to public; weekly validation with PDRRMO; tuning of rule packs.
    - Phase 2 — Limited production: Restricted LGU set; human approval required; rollback triggers defined.
    - Exit criteria from Shadow Mode:
      - Lead time ≥ 30 minutes at barangay level for Severity ≥ 2 alerts (median).
      - Precision ≥ 0.75, Recall ≥ 0.6 for pilot-targeted events.
      - Delivery success rate (SMS) ≥ 99%.
      - Operator approval-to-send median time ≤ 3 minutes.

    ## 10. Human-in-the-Loop Workflow
    - States: Draft -> Pending Review -> Approved -> Disseminated -> Rescinded.
    - Operator actions in EMS: verify geometry, add instructions, assign severity, approve/deny; all audit-logged.
    - Evidence panel: correlated sensor readings, CCTV event snapshots, satellite-derived indicators, rule trace, confidence score.
    - Escalation: On conflicting signals, route to senior operator; SLA timers and paging.

    ## 11. Data & Model Governance
    - Rule packs: YAML/JSON versioned sets of thresholds and logic; semantic versioning; change requests via Advisory Board.
    - ML components (if any): model cards, training data provenance, evaluation report; can be switched off per rule.
    - Data retention & security: Government tenancy, access controls, encryption in transit/at rest; retention policy defined with PDRRMO.
    - Monitoring: Data freshness SLOs, ingestion lag dashboards, anomaly detection on sensor feeds.

    ## 12. KPIs & SLAs (Pilot)
    - Lead time: target 30–60 minutes before hazardous condition onset.
    - Geospatial accuracy: barangay-level polygon hit-rate.
    - Alert quality: precision/recall for Severity ≥ 2.
    - Delivery: SMS delivery success ≥ 99%; API latency p95 ≤ 1s; EMS availability ≥ 99.5% (pilot).
    - Operations: median operator approval time ≤ 3 minutes; false alarm follow-up completed within 24h.

    ## 13. Shadow Mode Plan
    - Scope: [Municipalities TBD], duration 4–8 weeks crossing at least one severe weather event.
    - Reporting: Weekly validation report with KPIs, false positive/negative analysis, tuning decisions.

    ## 14. CAP/GeoJSON Interface Specification
    - Endpoint: GET /api/v1/alerts (GeoJSON); GET /api/v1/cap/{alertId} (CAP 1.2); Authentication: Bearer token.
    - Rate limits: 60 req/min per client during pilot.
    - GeoJSON Alert schema (subset):
      ```json
      {
        "type": "Feature",
        "id": "string",
        "properties": {
          "alertId": "string",
          "severity": 1,
          "headline": "Flash flood warning for Barangay San Roque",
          "onset": "ISO8601",
          "expires": "ISO8601",
          "confidence": 0.82,
          "status": "Actual|Exercise|Test",
          "msgType": "Alert|Update|Cancel"
        },
        "geometry": { "type": "Polygon", "coordinates": [[[...]]]}
      }
      ```
    - CAP mapping: headline->info.headline, severity->info.severity, onset/expires->info.effective/expires, area->info.area, geometry link as references.

    ## 15. Training & Handover Plan
    - Curriculum: EMS operations, evidence interpretation, SOP alignment, CAP/GeoJSON consumption.
    - Drills: Tabletop exercise in week 2; live drill in week 6; after-action review templates.
    - Documentation: Operator guide, governance handbook, runbooks; knowledge transfer sessions; final handover checklist.
