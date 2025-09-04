# Project LINGKOD — Why Trust Us

We don’t replace your disaster managers or PAGASA. We empower them with a reliable intelligence and integration layer that makes expert decisions faster, clearer, and more targeted — with full human oversight and measurable outcomes.

## 30-Second Answer Script
“We provide the **LINGKOD Emergency Command Platform**, an AI-powered intelligence engine that makes your disaster managers faster and more effective. It integrates data from PAGASA, local CCTV, sensors, and community reports into a single **Insight Generation Engine** that flags what matters, when it matters. Every insight is reviewed by your operator on the **Dynamic Insight Briefing Dashboard** before being sent out via the **Communication Hub**, ensuring full human control. We don’t replace your experts; we empower them with predictive, actionable insights.”

## 2-Minute Expanded Answer
- **The Platform:** We deliver the **LINGKOD Emergency Command Platform**, a complete solution with modules for multi-source data fusion, community intelligence, an AI-powered insight generation engine, a dynamic operator dashboard, and last-mile communication.
- **Proven Components:** The platform is built on proven, production-grade components, including DMA-BD’s river network (800+ sites), Coram.ai's AI analytics, and commercial satellite imagery.
- **Human-in-the-Loop by Default:** All citizen-facing alerts require approval by your operator in the Dynamic Insight Briefing Dashboard, with full audit logs and override controls.
- Transparent, explainable logic: Versioned rule packs; per-alert evidence panel (signals, thresholds, rule trace, confidence).
- Standards and interoperability: Outputs in CAP 1.2 and GeoJSON; integrates cleanly with ArcGIS; aligned to ICS/NDRRMC processes.
- Local capacity and ownership: Government data tenancy, open APIs, training and playbooks; we co-manage initially and hand over.
- Measured results: We run in shadow mode first, then track lead time, precision/recall, delivery rates, and operator workload reduction.

## Credibility Pillars
1) Proven Components: DMA-BD IoT river stack, Coram.ai EMS, commercial satellite imagery.  
2) Human-in-the-Loop: Operator approval gates; full audit trail (who/when/why).  
3) Explainability: Rule packs (semantic versioning), evidence panel, model cards where ML is used.  
4) Standards & Interop: CAP 1.2, GeoJSON, ArcGIS-friendly, ICS/NDRRMC-aligned.  
5) Local Capacity: Training curriculum, drills, runbooks, and capability transfer plan.  
6) Measured Outcomes: KPIs tracked from Day 1; “shadow mode” before any public alerts.

## Pilot Design Commitments (Trust by Design)
- Phase 0 — Historical Backtesting:
  - Replay past typhoon events; measure lead time vs PAGASA bulletins and field logs; evaluate precision/recall.
- Phase 1 — Shadow Mode (No Public Alerts):
  - Live ingestion, weekly validation with PDRRMO; tune rule packs and thresholds.
- Phase 2 — Limited Production:
  - Restricted LGU set; human approvals mandatory; rollback triggers defined and tested.

## Governance & Advisory Board
- Composition: PAGASA liaison (advisory), local university hydrology/DRRM expert, PDRRMO operations lead, Synthesiq lead engineer (secretariat).
- Responsibilities: Threshold governance, validation cadence, change control, incident review, acceptance sign-off.
- Cadence: Weekly pilot review, post-event AARs, monthly governance meetings.

## Validation KPIs & Acceptance Gates
- Lead time: ≥ 30–60 minutes before hazardous condition onset (median) for Severity ≥ 2.  
- Spatial accuracy: Barangay-level polygon hit-rate.  
- Alert quality: Precision ≥ 0.75, Recall ≥ 0.6 (pilot targets).  
- Delivery: SMS success rate ≥ 99%; API p95 latency ≤ 1s; EMS availability ≥ 99.5% (pilot).  
- Operations: Median operator approval time ≤ 3 minutes; false alarm reviews within 24 hours.

## Interoperability & Data Ownership
- APIs:
  - GET /api/v1/alerts (GeoJSON), GET /api/v1/cap/{alertId} (CAP 1.2), Bearer auth, rate-limited.
- Data Ownership: Deployed under government tenancy; open documentation enables operational independence; no vendor lock-in.

## Why This Works for CamSur
- Aligns with existing SOPs and command systems.
- Uses proven, robust tech components — not experimental hardware.
- Builds the province’s capacity while delivering fast, measurable impact.

## Demo Script Beats (Insight-Driven Narrative)

This script outlines a narrative flow for a 5-minute demo, focusing on the "insight, not just data" value proposition.

1.  **The "Before" State (The Problem):**
    *   Show a generic PAGASA advisory. "This is a typical PAGASA Orange Rainfall Warning. It's critical, but it covers a huge area. The key question for a disaster manager is: 'Where do I focus my limited resources *right now*?'"

2.  **Introducing the LINGKOD Platform (The Solution):**
    *   Switch to the LINGKOD Dashboard. "This is the LINGKOD Emergency Command Platform. It ingests that same PAGASA warning but fuses it with local data to provide actionable, barangay-level insights."

3.  **Demonstrating the Insight (The "Aha!" Moment):**
    *   Show a "Barangay Flood Watch" insight card. "Instead of just a warning, the platform generates a specific **Flood Watch** for three barangays. It gives a time window, estimates the exposed population, and, most importantly, provides a clear recommendation."
    *   Click the insight to show the **Evidence Panel**. "And it's fully explainable. Here you can see the exact signals that triggered this insight: the PAGASA warning, the MGB flood hazard map, and the river network data. This builds trust and allows for confident decision-making."

4.  **From Insight to Action (The Workflow):**
    *   Show the **Hotspot Priority List**. "The platform automatically ranks the most critical hotspots, so your team knows exactly where to focus."
    *   Demonstrate the **Approval Workflow**. "The operator reviews the insight and the evidence. With one click, they approve it."
    *   Show the **Communication Hub**. "The system then automatically generates pre-filled, localized SMS and radio scripts. The operator gives the final approval, and the warning is sent to the right people, in the right language, at the right time."

5.  **The "After" State (The Outcome):**
    *   "So, in less than two minutes, we've gone from a broad regional warning to a specific, actionable, and fully audited local alert. That's the power of the LINGKOD platform: it gives your team the confidence to make faster, smarter decisions when every second counts."

## Summary
Trust is earned through transparency, control, and results. LINGKOD bakes these into the pilot: operator approval gates, explainable alerts, independent governance, and hard KPIs — powered by components already proven at national scale.
