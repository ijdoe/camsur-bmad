# Active Context: Project LINGKOD MVP Development

## 1. Current Work Focus

The primary focus is on achieving **full BMAD methodology compliance**. We have paused all new feature development to reorganize our documentation, create missing deliverables, and establish formal process gates. This is a critical step to ensure the project is built on a solid, traceable, and high-quality foundation before proceeding with further implementation.

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
*   **BMAD Compliance Initiative:** Executed a comprehensive plan to align the project with the BMAD methodology. This involved:
    *   **Process Documentation:** Created formal guides for the BMAD process, phase gates, and templates.
    *   **Documentation Reorganization:** Restructured the entire `docs` directory to align with BMAD phases.
    *   **Deliverable Creation:** Created all missing design and architecture documents, including a design system, mockup descriptions, ADRs, and security/performance specifications.
    *   **Development Pause:** Halted new feature development to focus on process alignment.

## 3. Next Steps

1.  **Conduct Formal Gate Reviews:** Proceed with the formal stakeholder reviews for the Requirements, Design, and Architecture gates using the newly created checklists.
2.  **Begin UI Component Library Implementation:** Once the Design Gate is passed, start the implementation of the design system in code using Storybook, as outlined in the implementation plan.
3.  **Resume Feature Development:** Once all gates are passed and the component library is established, resume feature development in a BMAD-compliant manner.

## 4. Important Patterns & Preferences

*   **Feedback-Driven Iteration:** The project's direction is highly responsive to stakeholder feedback.
*   **Partnership-Centric Solutions:** Solutions leverage the specific, proven strengths of our technology partners.
*   **Human-Centric Storytelling:** Proposals and project descriptions are framed with relatable narratives.
*   **Human-in-the-Loop by Default:** All public alerts require operator approval with a full audit trail.
*   **Explainability & Versioning:** Rule packs are versioned; each alert shows contributing signals and rule traces.
*   **Standards & Interoperability:** Outputs in CAP 1.2 and GeoJSON; aligns with ICS/NDRRMC SOPs.
*   **Shadow-Mode-First Validation:** Historical backtesting and shadow runs precede citizen-facing dissemination.
