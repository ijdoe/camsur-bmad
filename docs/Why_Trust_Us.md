# Project LINGKOD — Why Trust Us

We don’t replace your disaster managers or PAGASA. We empower them with a reliable intelligence and integration layer that makes expert decisions faster, clearer, and more targeted — with full human oversight and measurable outcomes.

## 30-Second Answer Script
“We don’t replace PAGASA or your disaster managers. We integrate their data and your SOPs into one engine that flags what matters, when it matters. The core pieces are already proven at scale — DMA-BD’s 800+ river stations, Coram.ai’s EMS, and commercial satellite imagery. Every public alert is reviewed by your operator, audit-logged, and measured against clear KPIs like lead time and spatial accuracy. Our job is to make your experts faster and more effective — not replace them.”

## 2-Minute Expanded Answer
- Proven components in production:
  - DMA-BD’s river network (800+ sites, <1% deviation vs manual),
  - Coram.ai EMS deployments,
  - Commercial satellite imagery from established providers.
- Human-in-the-loop by default: All citizen-facing alerts require operator approval in EMS, with audit logs and override controls.
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

## Summary
Trust is earned through transparency, control, and results. LINGKOD bakes these into the pilot: operator approval gates, explainable alerts, independent governance, and hard KPIs — powered by components already proven at national scale.
