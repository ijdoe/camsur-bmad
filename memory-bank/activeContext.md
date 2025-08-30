# Active Context: Project LINGKOD MVP Development

## 1. Current Work Focus

The primary focus is on the **development of the Minimum Viable Product (MVP) for sales demonstrations**, specifically implementing the core backend services and beginning the frontend dashboard. We have successfully completed the planning phase, the initial setup of the development environment, and the entire Data Ingestion & Simulation (Epic 7.1), Threat Analysis Engine (Epic 7.2), Alert Management & Workflow (Epic 7.3), and Communication & Dissemination (Epic 7.5) epics. The core interactive map component of the dashboard (Epic 7.4) is also implemented. We have now completed the backend implementation for **Secure User Login (Epic 7.6)**.

## 2. Recent Changes & Decisions

*   **Strategic Shift to Sales MVP:** The project focus has shifted from immediate pilot implementation to developing a robust MVP for sales demonstrations, recognizing the need to secure contracts before further development.
*   **Multi-Region Demo Capability:** The MVP is designed to support demo scenarios for diverse regions, including complex urban environments like Metro Manila, showcasing the system's adaptability and scalability.
*   **Enterprise-Grade Tech Stack Selection:** A modern, future-proof tech stack has been selected, including NestJS (Node.js/TypeScript) for the backend, Next.js (React/TypeScript) with Tailwind CSS for the frontend, and a robust data layer (PostgreSQL/PostGIS, TimescaleDB, Redis, Elasticsearch).
*   **Detailed Technical Specification Created:** A comprehensive technical specification document (`docs/Project_LINGKOD_MVP_Technical_Specification.md`) has been created, outlining the architecture, data models, service specifications, and development guidelines for the MVP.
*   **Adoption of Dual-Mode Architecture:** A key strategic decision was made to position the system as a dual-mode solution. This allows it to be deployed as a complete, standalone platform for clients without existing systems, or as an "intelligence engine" that feeds alerts via API into a city's homegrown command center. This decision was made to increase adoption by complementing, rather than replacing, existing infrastructure.
*   **Invalidation of "AGRI-SIGURADO":** The agricultural intelligence concept was invalidated upon the discovery that our key partner, Coram.ai, specializes in AI-powered physical security and emergency management, not satellite-based agricultural analysis.
*   **Strategic Pivot to "LINGKOD":** A new project, "LINGKOD," was conceptualized to align perfectly with Coram.ai's actual capabilities.
*   **Adoption of Multi-Layered Intelligence:** The decision was made to re-integrate satellite imagery from a new, dedicated provider.
*   **Narrative-Driven Proposal:** Based on user feedback, the decision was made to introduce a relatable, story-based section into the proposal to better illustrate the project's human impact.
*   **GIS Integration Scoping:** The technical scope was enhanced to support integration with platforms like ArcGIS by adding GeoJSON compatibility to the complementary API feed.
*   **Detailed Workflow Definition:** A comprehensive system workflow document (`docs/System_Workflow.md`), including a visual diagram, was created to map the end-to-end logic of the `ThreatAnalysisEngine`.
*   **Communication Template Drafting:** Initial communication templates (`docs/Communication_Templates.md`) for SMS, radio, and official alerts were created.
*   **Strategic Clarification:** `systemPatterns.md` was updated to distinguish Project LINGKOD's role as a proactive "Intelligence Engine" from a reactive 911 dispatch system.
*   **BMAD Planning Phase Completed:** All PRD, UX Spec, and Architecture documents are aligned. Epics and User Stories have been sharded. QA Framework (directories, initial risk profile, and test design) has been established.
*   **Development Environment Ready:** Backend (NestJS) and Frontend (Next.js) projects initialized, and all core dependencies installed. Database schema (`database/schema.sql`) created.
*   **Data Ingestion & Simulation Epic (7.1) Implemented:** Mock data generation, ingestion endpoints, and database storage for IoT, CCTV, and Satellite data are functional.
*   **Threat Analysis Engine Epic (7.2) Implemented:** Core logic for data correlation, rule pack loading, rule evaluation, alert generation, and versioning/traceability is functional.
*   **Alert Management & Workflow Epic (7.3) Implemented:** All backend services and controller endpoints for alert lifecycle management (list, view, approve, rescind, update) are functional, including TypeORM repository integration and DTOs.
*   **Interactive Dashboard Interface Epic (7.4) - Core Map Component Implemented:** Basic dashboard layout and the interactive map component with placeholder data for LGU boundaries, sensor locations, and active alerts are functional.
*   **Communication & Dissemination Epic (7.5) Implemented:** All backend services and controller endpoints for generating localized SMS, radio scripts, and official barangay alerts are functional, including TypeORM repository integration and DTOs.
*   **Frontend Stability Achieved:** Resolved persistent frontend compilation errors by strategically downgrading Next.js to `14.2.3` and React to `18.2.0`. This addressed critical compatibility issues with `react-map-gl` and other dependencies, stabilizing the development environment.
*   **End-to-End Login Flow Implemented (Epic 7.6):** Successfully implemented the complete user authentication flow. This includes:
    *   **Frontend:** A functional login page that captures user credentials and communicates with the backend.
    *   **Backend Integration:** The frontend now correctly calls the `/auth/login` endpoint.
    *   **JWT Handling:** Securely receives and stores the JWT in `localStorage` upon successful authentication.
    *   **Protected Routes:** The dashboard is now a protected route, redirecting unauthenticated users to the login page.

## 3. Next Steps

1.  **Re-enable TimescaleDB functionality:** Investigate how to correctly install and configure TimescaleDB for PostgreSQL@14, or consider upgrading PostgreSQL to version 17.
2.  **Implement Role-Based Access Control (Epic 7.6):** Develop authorization features based on user roles.
3.  **Implement Multi-Tenancy Data Isolation (Epic 7.6):** Ensure data is isolated per LGU.
4.  **Implement External Integration (Epic 7.7):** Develop API endpoints for third-party system integration.
5.  **Develop Interactive Dashboard Interface (Epic 7.4 - Remaining):** Implement real-time data feeds, user/LGU management, and basic historical data and analytics.
6.  **Create Multi-Region Demo Scenarios & Polish (Epic 7.8):** Develop specific demo scripts and refine the MVP for sales presentations.
7.  **Prepare RFP/Development Team Selection Criteria:** Prepare documentation to aid in selecting a development partner.
3.  **Re-enable TimescaleDB functionality:** Investigate how to correctly install and configure TimescaleDB for PostgreSQL@14, or consider upgrading PostgreSQL to version 17.
4.  **Implement Role-Based Access Control (Epic 7.6):** Develop authorization features based on user roles.
5.  **Implement Multi-Tenancy Data Isolation (Epic 7.6):** Ensure data is isolated per LGU.
6.  **Implement External Integration (Epic 7.7):** Develop API endpoints for third-party system integration.
7.  **Develop Interactive Dashboard Interface (Epic 7.4 - Remaining):** Implement real-time data feeds, user/LGU management, and basic historical data and analytics.
8.  **Create Multi-Region Demo Scenarios & Polish (Epic 7.8):** Develop specific demo scripts and refine the MVP for sales presentations.
9.  **Prepare RFP/Development Team Selection Criteria:** Prepare documentation to aid in selecting a development partner.

## 4. Important Patterns & Preferences

*   **Feedback-Driven Iteration:** The project's direction is highly responsive to stakeholder feedback.
*   **Partnership-Centric Solutions:** Solutions leverage the specific, proven strengths of our technology partners.
*   **Human-Centric Storytelling:** Proposals and project descriptions are framed with relatable narratives.
*   **Human-in-the-Loop by Default:** All public alerts require operator approval with a full audit trail.
*   **Explainability & Versioning:** Rule packs are versioned; each alert shows contributing signals and rule traces.
*   **Standards & Interoperability:** Outputs in CAP 1.2 and GeoJSON; aligns with ICS/NDRRMC SOPs.
*   **Shadow-Mode-First Validation:** Historical backtesting and shadow runs precede citizen-facing dissemination.
