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
      "description": "string", // e.g., "Flash flood warning for Barangay San Roque"
      "severity": "integer"
    }
