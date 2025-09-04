# Product Requirements Document (PRD): Project LINGKOD MVP

## 1. Introduction

This Product Requirements Document (PRD) outlines the core features, functionalities, and non-functional requirements for the Minimum Viable Product (MVP) of Project LINGKOD. The primary goal of this MVP is to serve as a compelling sales demonstration platform, showcasing the system's capabilities in multi-hazard prediction, real-time situational awareness, and targeted communication across various regions (e.g., CamSur, Metro Manila).

## 2. Project Goal (from Project Brief)

To develop and propose a single, high-impact, technology-driven solution for Camarines Sur that directly addresses the practical needs of its citizens and leadership, with a primary focus on enhancing provincial disaster resilience and response capabilities. The MVP will demonstrate this capability for sales.

## 3. Problem Statement (from Product Context)

During natural disasters, a significant "last-mile" information gap exists. Communities lack hyper-local, timely, and actionable information. Disaster managers struggle to synthesize data in real-time, and warnings often don't reach the most vulnerable citizens effectively. Project LINGKOD aims to solve this by providing proactive, data-driven intelligence.

## 4. Target Users & Personas

### 4.1. PDRRMO Operator (Primary User - Standalone Mode)
- **Needs:** A single, clear dashboard that automatically flags critical threats, data-driven recommendations for action, ability to disseminate alerts directly.
- **Goals:** Reduce cognitive load, focus on decision-making, proactive response.

### 4.2. City Command Center Operator (Secondary User - Complementary Mode)
- **Needs:** High-fidelity, specific, and actionable alerts from LINGKOD integrated into existing software (e.g., ArcGIS).
- **Goals:** Enhance existing response protocols without switching systems.

### 4.3. Barangay Captain (Indirect User - Alert Recipient)
- **Needs:** Direct, unambiguous SMS alerts with specific instructions.
- **Goals:** Lead community with confidence, ensure timely evacuation/preparation.

### 4.4. Citizen (Indirect User - Alert Recipient)
- **Needs:** Timely, easy-to-understand warnings in local dialect via SMS or radio.
- **Goals:** Secure property, livestock, and family.

## 5. Functional Requirements (FRs)

### 5.1. Data Ingestion & Simulation
- **FR 5.1.1:** The system shall simulate ingestion of satellite imagery data (e.g., soil moisture, vegetation index).
- **FR 5.1.2:** The system shall simulate ingestion of Coram.ai CCTV alerts (e.g., rapid water level rise, landslide detection).
- **FR 5.1.3:** The system shall simulate ingestion of DMA-BD IoT sensor data (AWLG, ARG, AWS) with time-series capabilities.
- **FR 5.1.4:** The system shall support configurable mock data generation for various regions (CamSur, Metro Manila) and hazard scenarios (typhoon, flood).

### 5.2. Insight Generation & Management (Threat Analysis Engine)

This section defines the core value proposition of the LINGKOD platform: the generation of actionable, predictive insights.

- **FR 5.2.1: Insight Correlation:** The system shall correlate simulated data from national advisories (PAGASA), CCTV, IoT sensors, and static hazard maps based on time and geospatial proximity.
- **FR 5.2.2: Rule-Based Insight Generation:** The system shall apply predefined, configurable rule packs to correlated data to generate insights from the official **Phase 1 Insight Catalog**.
- **FR 5.2.3: Insight Attributes:** Each generated insight shall have a defined set of attributes, including severity, confidence, a time window (e.g., "in the next 2-6 hours"), a list of affected barangays, and an estimate of the exposed population.
- **FR 5.2.4: Evidence Panel:** Each insight must be accompanied by an explainable evidence panel that includes contributing data signals, the rule pack version, and the specific thresholds that were met.
- **FR 5.2.5: Operator Workflow:** The system shall provide a clear workflow for operators to review, approve, or rescind insights before they are classified as official, public-facing alerts. All operator actions must be recorded in an immutable audit trail.
- **FR 5.2.6: Priority Queue:** The system shall display insights in a priority queue, ranked by a **Hotspot Escalation Score** that factors in severity, confidence, and the size of the exposed population.
- **FR 5.2.7: Recommendation Engine:** Upon approval, the system shall generate recommended actions and pre-fill communication templates (SMS, radio) based on the insight type and severity.

### 5.4. Communication & Dissemination
- **FR 5.4.1:** The system shall generate localized SMS content based on approved alerts and predefined templates.
- **FR 5.4.2:** The system shall generate pre-formatted radio broadcast scripts based on approved alerts and templates.
- **FR 5.4.3:** The system shall generate official alerts for barangay officials based on approved alerts and templates.
- **FR 5.4.4:** The system shall support multi-language generation for communication templates (for demo purposes).
- **FR 5.4.5:** The system shall *simulate* sending of SMS alerts and radio broadcasts for demo purposes.

### 5.5. Admin/Operator Dashboard
- **FR 5.5.1:** The dashboard shall display an interactive map (Mapbox GL JS) showing LGU boundaries, sensor locations, and active alert polygons.
- **FR 5.5.2:** The dashboard shall provide real-time data feeds for latest sensor readings and CCTV events.
- **FR 5.5.3:** The dashboard shall include filterable and sortable lists/tables of `system_alerts`.
- **FR 5.5.4:** The dashboard shall support user management (CRUD for Admin role).
- **FR 5.5.5:** The dashboard shall support LGU management (CRUD for Admin role), including configuration of rule packs and communication settings.
- **FR 5.5.6:** The dashboard shall display basic historical data and analytics (e.g., sensor trends, alert frequency).

### 5.6. External Integration (Complementary Mode)
- **FR 5.6.1:** The system shall expose a secure REST API endpoint (`/api/v1/alerts`) for external command centers to retrieve active, approved alerts in GeoJSON format.
- **FR 5.6.2:** The system shall expose a secure REST API endpoint (`/api/v1/cap/{alertId}`) for retrieving Common Alerting Protocol (CAP 1.2) XML for specific alerts.
- **FR 5.6.3:** The API endpoints shall implement JWT-based authentication and rate limiting.

### 5.7. Authentication & Authorization
- **FR 5.7.1:** The system shall provide JWT-based user authentication (login/logout).
- **FR 5.7.2:** The system shall implement Role-Based Access Control (RBAC) for different user roles (Admin, Operator, Viewer).
- **FR 5.7.3:** The system shall support multi-tenancy with strict data isolation between LGUs.

## 6. Non-Functional Requirements (NFRs)

### 6.1. Performance
- **NFR 6.1.1:** Data Ingestion: The system shall simulate handling up to 1000 sensor readings/CCTV alerts per second.
- **NFR 6.1.2:** Threat Analysis: The system shall process and generate alerts within 5 seconds of receiving critical simulated data.
- **NFR 6.1.3:** Dashboard Latency: Real-time updates (via WebSockets) shall occur within 1 second.
- **NFR 6.1.4:** API Response Time: P95 latency shall be less than 200ms for core API endpoints.

### 6.2. Scalability
- **NFR 6.2.1:** The architecture shall support scaling to hundreds of LGUs and millions of citizens (demonstrated through design).

### 6.3. Security
- **NFR 6.3.1:** Data shall be encrypted in transit (HTTPS/TLS) and at rest.
- **NFR 6.3.2:** API endpoints shall be protected with rate limiting and input validation.
- **NFR 6.3.3:** The system shall protect against common web vulnerabilities (OWASP Top 10).

### 6.4. Reliability & Availability
- **NFR 6.4.1:** The system shall be designed for high availability (demonstrated through cloud-native architecture).

### 6.5. Maintainability
- **NFR 6.5.1:** The codebase shall adhere to TypeScript/JavaScript best practices, ESLint, and Prettier.
- **NFR 6.5.2:** Comprehensive JSDoc/TSDoc for code and OpenAPI/Swagger for APIs shall be maintained.

### 6.6. Usability (for Demo)
- **NFR 6.6.1:** The Admin/Operator Dashboard shall be intuitive and easy to navigate for new users.
- **NFR 6.6.2:** The UI shall be responsive and visually appealing across different screen sizes.
- **NFR 6.6.3:** Demo scenarios shall clearly illustrate the system's value proposition.

## 7. Epics

### 7.1. Data Ingestion & Simulation
- **Description:** Establish the foundation for feeding simulated data into the system, enabling realistic demo scenarios.

### 7.2. Threat Analysis Engine
- **Description:** Develop the core intelligence that processes and correlates data to generate predictive alerts.

### 7.3. Alert Management & Workflow
- **Description:** Implement the full lifecycle of alerts, from generation to operator approval and audit.

### 7.4. Admin/Operator Dashboard
- **Description:** Build the primary user interface for monitoring, managing, and interacting with the system.

### 7.5. Communication & Dissemination
- **Description:** Develop the capabilities for generating and simulating the delivery of targeted alerts.

### 7.6. Security & Multi-Tenancy
- **Description:** Implement robust authentication, authorization, and data isolation for multiple LGUs.

### 7.7. External Integration
- **Description:** Expose secure APIs for complementary integration with third-party command centers.

### 7.8. Demo Scenarios & Polish
- **Description:** Create compelling, multi-region demo scenarios and refine the MVP for sales presentations.

## 8. Out of Scope for MVP

- Live integration with actual Coram.ai, DMA-BD, or satellite provider APIs.
- Actual sending of SMS messages or radio broadcasts.
- Full public information portal (beyond basic map view).
- Advanced machine learning models for threat prediction (initially rule-based).
- Complex reporting and analytics beyond basic historical trends.
