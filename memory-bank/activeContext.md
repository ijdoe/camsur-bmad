# Active Context: Project LINGKOD Refinement

## 1. Current Work Focus

The primary focus is on the **development of a Minimum Viable Product (MVP) for sales demonstrations**. This MVP will showcase Project LINGKOD's capabilities in multi-hazard prediction, real-time situational awareness, and targeted communication, adaptable for various regions (e.g., CamSur, Metro Manila). The immediate task is to translate the architectural plan into a detailed technical specification to guide development.

## 2. Recent Changes & Decisions

*   **Strategic Shift to Sales MVP:** The project focus has shifted from immediate pilot implementation to developing a robust MVP for sales demonstrations, recognizing the need to secure contracts before further development.
*   **Multi-Region Demo Capability:** The MVP is designed to support demo scenarios for diverse regions, including complex urban environments like Metro Manila, showcasing the system's adaptability and scalability.
*   **Enterprise-Grade Tech Stack Selection:** A modern, future-proof tech stack has been selected, including NestJS (Node.js/TypeScript) for the backend, Next.js (React/TypeScript) with Tailwind CSS for the frontend, and a robust data layer (PostgreSQL/PostGIS, TimescaleDB, Redis, Elasticsearch).
*   **Detailed Technical Specification Created:** A comprehensive technical specification document (`docs/Project_LINGKOD_MVP_Technical_Specification.md`) has been created, outlining the architecture, data models, service specifications, and development guidelines for the MVP.
*   **Adoption of Dual-Mode Architecture:** A key strategic decision was made to position the system as a dual-mode solution. This allows it to be deployed as a complete, standalone platform for clients without existing systems, or as an "intelligence engine" that feeds alerts via API into a city's homegrown command center. This decision was made to increase adoption by complementing, rather than replacing, existing infrastructure.
*   **Invalidation of "AGRI-SIGURADO":** The agricultural intelligence concept was invalidated upon the discovery that our key partner, Coram.ai, specializes in AI-powered physical security and emergency management, not satellite-based agricultural analysis.
*   **Strategic Pivot to "LINGKOD":** A new project, "LINGKOD," was conceptualized to align perfectly with Coram.ai's actual capabilities.
*   **Adoption of Multi-Layered Intelligence:** The decision was made to retain the powerful concept of satellite imagery by proposing a partnership with a dedicated provider (e.g., Planet Labs).
*   **Narrative-Driven Proposal:** Based on user feedback, the decision was made to introduce a relatable, story-based section into the proposal to better illustrate the project's human impact.
*   **GIS Integration Scoping:** The technical scope was enhanced to support integration with platforms like ArcGIS by adding GeoJSON compatibility to the complementary API feed. This decision improves the system's interoperability with advanced command centers.
*   **Detailed Workflow Definition:** A comprehensive system workflow document (`docs/System_Workflow.md`), including a visual diagram, was created to map the end-to-end logic of the `ThreatAnalysisEngine`. This provides a clear blueprint for development while other details are pending.
    *   **Communication Template Drafting:** A set of initial communication templates (`docs/Communication_Templates.md`) for SMS, radio, and official alerts was created to serve as a foundation for the last-mile communication strategy.
    *   **Strategic Clarification:** Following a key discussion, the `systemPatterns.md` document was updated to explicitly distinguish Project LINGKOD's role as a proactive "Intelligence Engine" from that of a traditional, reactive 911 dispatch system. This reinforces the core value proposition and aligns the team on the product's identity.

## 3. Next Steps

1.  **Build Core ThreatAnalysisEngine:** Implement the rule-based logic and data correlation mechanisms as defined in the technical specification.
2.  **Create Realistic Multi-Region Data Simulation Layer:** Develop a robust data generator for sensor readings, CCTV alerts, and satellite data, configurable for various regions and hazard scenarios.
3.  **Develop Interactive Dashboard Interface:** Build the Admin/Operator Dashboard using Next.js, React, and Tailwind CSS, incorporating interactive maps, real-time data feeds, and the operator approval workflow.
4.  **Implement API Endpoints for External Integration:** Develop the `/api/v1/alerts` (GeoJSON) and `/api/v1/cap/{alertId}` endpoints with authentication and rate limiting.
5.  **Create Multi-Region Demo Scenarios:** Develop specific demo scripts and data configurations for CamSur, Metro Manila ("Perfect Storm"), and other provincial scenarios.
6.  **Build Enterprise-Grade Authentication and Multi-Tenancy:** Implement JWT-based authentication, RBAC, and strict data isolation for LGUs.
7.  **Test and Polish for Sales Demonstrations:** Conduct thorough testing, performance tuning, and UI/UX refinement to ensure a compelling demo experience.
8.  **Prepare RFP/Development Team Selection Criteria:** Based on the technical specification, prepare documentation to aid in selecting a development partner.

## 4. Important Patterns & Preferences

*   **Feedback-Driven Iteration:** The project's direction is highly responsive to stakeholder feedback. The pivot to a dual-mode architecture is a prime example of this.
*   **Partnership-Centric Solutions:** The strategy is to build solutions that leverage the specific, proven strengths of our technology partners.
*   **Human-Centric Storytelling:** Proposals and project descriptions should be framed with relatable narratives to communicate value effectively.
*   **Human-in-the-Loop by Default:** All public alerts require operator approval with a full audit trail; operators can adjust thresholds within governed bounds.
*   **Explainability & Versioning:** Rule packs are versioned (semantic); each alert shows contributing signals and rule traces; ML components are optional and documented with model cards.
*   **Standards & Interoperability:** Outputs in CAP 1.2 and GeoJSON; aligns with ICS/NDRRMC SOPs; integrates cleanly with ArcGIS and third-party systems.
*   **Shadow-Mode-First Validation:** Historical backtesting and shadow runs precede any citizen-facing dissemination; clear exit criteria govern activation.
