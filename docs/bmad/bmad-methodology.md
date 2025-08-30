# BMAD Methodology Guide for Project LINGKOD

## 1. Introduction

This document outlines the tailored implementation of the Business, Market, Architecture, and Development (BMAD) methodology for Project LINGKOD. Adherence to this process ensures that development is aligned with business objectives, market needs, and robust technical principles, leading to a high-quality, fit-for-purpose product.

## 2. Core Principles

- **Phase-Gated Development:** Each phase must be completed and its deliverables approved before the next phase begins.
- **Traceability:** A clear line of sight must exist from business requirements through to implementation and testing.
- **Quality by Design:** Quality is built in at every stage, not tested in at the end.
- **Stakeholder Alignment:** Continuous alignment with stakeholders is required at each phase gate.
- **Documentation-Driven:** Key decisions and specifications are formally documented and version-controlled.

## 3. BMAD Phases

### Phase 1: Business & Market Analysis (Requirements)

**Goal:** To define the "what" and "why" of the project.
**Key Activities:**
- Stakeholder Interviews & Analysis
- Market Research & Competitive Analysis
- Business Case Definition
- Product Requirements Definition (PRD)
- User Persona & Journey Mapping

**Deliverables:**
- `01-requirements/project-brief.md`
- `01-requirements/product-requirements.md`
- `01-requirements/stakeholder-requirements.md`
- `01-requirements/business-case.md`

**Gate:** Requirements Gate Review

---

### Phase 2: Design

**Goal:** To translate requirements into a detailed user experience and visual design.
**Key Activities:**
- UX Wireframing & Prototyping
- Visual Design System Creation
- High-Fidelity Mockups
- Usability Testing
- Accessibility Analysis

**Deliverables:**
- `02-design/user-experience/ux-specification.md`
- `02-design/visual-design/design-system-specification.md`
- `02-design/mockups/`
- `02-design/prototypes/`

**Gate:** Design Gate Review

---

### Phase 3: Architecture

**Goal:** To define the technical blueprint for the system.
**Key Activities:**
- System Architecture Design
- Technology Stack Selection
- Data Modeling & Schema Design
- Security & Performance Architecture
- Integration & API Specification

**Deliverables:**
- `03-architecture/system-architecture/technical-specification.md`
- `03-architecture/security/security-architecture.md`
- `03-architecture/infrastructure/deployment-architecture.md`
- `03-architecture/decisions/` (ADRs)

**Gate:** Architecture Gate Review

---

### Phase 4: Implementation (Development)

**Goal:** To build and test the system according to the approved design and architecture.
**Key Activities:**
- Sprint Planning & Execution
- Code Development
- Unit & Integration Testing
- Code Reviews
- Continuous Integration/Continuous Deployment (CI/CD)

**Deliverables:**
- Source Code
- `04-implementation/epics/`
- `04-implementation/stories/`
- Test Results

**Gate:** Implementation Gate Review

---

### Phase 5: Quality Assurance

**Goal:** To independently verify that the system meets all requirements and quality standards.
**Key Activities:**
- End-to-End (E2E) Testing
- Performance & Load Testing
- Security Penetration Testing
- User Acceptance Testing (UAT)

**Deliverables:**
- `05-quality-assurance/test-cases/`
- `05-quality-assurance/assessments/`
- Test Reports & Bug Tracking

**Gate:** QA Gate Review

---

### Phase 6: Operations

**Goal:** To deploy, monitor, and maintain the system in a production environment.
**Key Activities:**
- Production Deployment
- System Monitoring & Alerting
- Backup & Disaster Recovery
- Maintenance & Support

**Deliverables:**
- `06-operations/deployment/deployment-guide.md`
- `06-operations/monitoring/monitoring-setup.md`
- `06-operations/maintenance/maintenance-procedures.md`

**Gate:** Operations Readiness Review

---

## 4. Quality Gates

Each phase concludes with a formal Quality Gate review. The project cannot proceed to the next phase until all deliverables for the current phase are complete, reviewed, and formally signed off by the designated stakeholders. The checklists and review reports for each gate are stored in `docs/bmad/gates/` and `docs/bmad/reviews/`.
