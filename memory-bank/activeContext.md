# Active Context: Project LINGKOD Refinement

## 1. Current Work Focus

The primary focus is on the **detailed technical scoping of the pilot program**. Now that the high-level strategy and dual-mode architecture are defined, the immediate task is to create the specific technical plans required to move the project from proposal to implementation. This involves defining data schemas, API endpoints, and initial analytical rules.

## 2. Recent Changes & Decisions

*   **Adoption of Dual-Mode Architecture:** A key strategic decision was made to position the system as a dual-mode solution. This allows it to be deployed as a complete, standalone platform for clients without existing systems, or as an "intelligence engine" that feeds alerts via API into a city's homegrown command center. This decision was made to increase adoption by complementing, rather than replacing, existing infrastructure.
*   **Invalidation of "AGRI-SIGURADO":** The agricultural intelligence concept was invalidated upon the discovery that our key partner, Coram.ai, specializes in AI-powered physical security and emergency management, not satellite-based agricultural analysis.
*   **Strategic Pivot to "LINGKOD":** A new project, "LINGKOD," was conceptualized to align perfectly with Coram.ai's actual capabilities.
*   **Adoption of Multi-Layered Intelligence:** The decision was made to retain the powerful concept of satellite imagery by proposing a partnership with a dedicated provider (e.g., Planet Labs).
*   **Narrative-Driven Proposal:** Based on user feedback, the decision was made to introduce a relatable, story-based section into the proposal to better illustrate the project's human impact.
*   **GIS Integration Scoping:** The technical scope was enhanced to support integration with platforms like ArcGIS by adding GeoJSON compatibility to the complementary API feed. This decision improves the system's interoperability with advanced command centers.
*   **Detailed Workflow Definition:** A comprehensive system workflow document (`docs/System_Workflow.md`), including a visual diagram, was created to map the end-to-end logic of the `ThreatAnalysisEngine`. This provides a clear blueprint for development while other details are pending.
*   **Communication Template Drafting:** A set of initial communication templates (`docs/Communication_Templates.md`) for SMS, radio, and official alerts was created to serve as a foundation for the last-mile communication strategy.

## 3. Next Steps

1.  **Finalize Pilot Technical Scope:** Complete and expand `docs/Pilot_Technical_Scope.md` with Trust & Assurance Framework, Governance & Advisory Board, Validation & Acceptance Plan, Human-in-the-Loop Workflow, Data/Model Governance, KPIs/SLAs, Shadow Mode Plan, and CAP/GeoJSON Interface Spec. [DONE in draft]
2.  **Establish Advisory Board:** Confirm participation (PAGASA liaison, local university hydrology/DRRM expert, PDRRMO ops lead); set weekly/monthly cadence; define change control and acceptance sign-off.
3.  **Define KPIs & Acceptance Gates:** Socialize targets (lead time, precision/recall, delivery rate, operator latency) and formalize exit criteria from Shadow Mode.
4.  **Begin Pilot Development:** Stand up ingestion (Coram.ai webhooks, DMA-BD push, satellite pull), implement `ThreatAnalysisEngine` rule pack v0, and operator approval & audit trail features.
5.  **Interoperability Readiness:** Expose `/api/v1/alerts` (GeoJSON) and `/api/v1/cap/{alertId}` with auth and rate limiting; validate consumption in ArcGIS.
6.  **Capacity Building:** Prepare training curriculum, drills, and operator/governance runbooks; schedule tabletop (week 2) and live drill (week 6).
7.  **Formalize Partnerships:** Draft and sign agreements with Coram.ai, DMA-BD, and a satellite provider based on the finalized scope.
8.  **Sales Enablement:** Produce one‑pager “Why Trust Us” aligned to governance and validation plan for the Governor meeting.

## 4. Important Patterns & Preferences

*   **Feedback-Driven Iteration:** The project's direction is highly responsive to stakeholder feedback. The pivot to a dual-mode architecture is a prime example of this.
*   **Partnership-Centric Solutions:** The strategy is to build solutions that leverage the specific, proven strengths of our technology partners.
*   **Human-Centric Storytelling:** Proposals and project descriptions should be framed with relatable narratives to communicate value effectively.
*   **Human-in-the-Loop by Default:** All public alerts require operator approval with a full audit trail; operators can adjust thresholds within governed bounds.
*   **Explainability & Versioning:** Rule packs are versioned (semantic); each alert shows contributing signals and rule traces; ML components are optional and documented with model cards.
*   **Standards & Interoperability:** Outputs in CAP 1.2 and GeoJSON; aligns with ICS/NDRRMC SOPs; integrates cleanly with ArcGIS and third-party systems.
*   **Shadow-Mode-First Validation:** Historical backtesting and shadow runs precede any citizen-facing dissemination; clear exit criteria govern activation.
