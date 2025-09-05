# UX/UI Implementation Plan: Project LINGKOD MVP

**Date:** September 5, 2025

**Author:** UX Expert (Cline)

---

## 1. Introduction & Goals

### 1.1. Purpose
This document provides a comprehensive, actionable plan for translating the approved UX/UI designs from the `docs/02-design/user-experience/ux-specification.md` into developer-ready assets. The goal is to create high-fidelity mockups and detailed component specifications that will serve as the blueprint for the frontend development team.

### 1.2. Primary Goals
- **Accuracy:** Ensure all UI components and screens faithfully represent the approved designs and user workflows.
- **Consistency:** Establish a unified design system that maintains visual and interaction consistency across all components.
- **Usability:** Champion user-centered design principles, ensuring the interface is intuitive, accessible, and efficient for PDRRMO operators.
- **Developer-Ready:** Produce specifications and mockups that provide clear, unambiguous guidance for implementation.

### 1.3. Alignment with Project Context
This plan builds upon the solid foundation established by the BMAD methodology compliance initiative. With the Requirements, Design, and Architecture gates passed, we now focus on the precise implementation of the Operator Dashboard and core user workflows.

---

## 2. Component Implementation Strategy (Atomic Design)

We will adopt the Atomic Design methodology to ensure a systematic, scalable approach to component development. This methodology organizes UI components into hierarchical levels, from basic elements to complex compositions.

### 2.1. Phase 1: Atoms (Foundational Elements)
Build the basic building blocks that will be used throughout the application.

**Priority Components:**
- **Colors & Typography:** Define the color palette (primary blue, accent green/yellow/red, neutrals) and typography scale (headings, body text, captions).
- **Buttons:** Primary, secondary, danger, and disabled states with appropriate hover/focus states.
- **Input Fields:** Text inputs, text areas, select dropdowns, checkboxes, and radio buttons.
- **Icons:** Consistent icon set for navigation, actions, and data visualization (e.g., sensor types, severity levels).
- **Loading States:** Spinners, skeleton screens, and progress indicators.

### 2.2. Phase 2: Molecules (Simple Composites)
Combine atoms into functional, reusable components.

**Priority Components:**
- **Insight Card:** The cornerstone component for displaying individual insights in the priority queue.
- **Search Bar:** Full-text search functionality for insights and data.
- **Filter Dropdowns:** Multi-select filters for LGU, status, severity, and time range.
- **User Profile Menu:** User avatar, role display, and logout functionality.
- **Status Indicators:** Color-coded badges for insight status (Pending, Approved, Disseminated, Rescinded).
- **Data Display Cards:** For sensor readings, CCTV events, and community intelligence feeds.

### 2.3. Phase 3: Organisms (Complex UI Sections)
Assemble molecules into larger, functional sections of the interface.

**Priority Components:**
- **Main Navigation Sidebar:** Left sidebar with navigation menu, LGU selector, and user profile.
- **Insight Priority Queue:** The scrollable list of Insight Cards with sorting and filtering capabilities.
- **Interactive Map Container:** Mapbox GL JS integration with data overlays and controls.
- **Insight Detail Panel:** Comprehensive view with evidence panel, recommendation preview, and action buttons.
- **Real-time Data Panels:** Sensor readings, CCTV events, and insight summaries.

### 2.4. Phase 4: Templates (Page Layouts)
Define the overall page structures and layouts.

**Priority Templates:**
- **Dashboard Template:** Main operator dashboard layout with sidebar, map, and data panels.
- **Login Page Template:** Authentication form with branding and error handling.
- **Settings Template:** Administrative settings for LGU configuration and API management.

---

## 3. Detailed Component Specification: "Insight Card"

### 3.1. Overview
The Insight Card is the primary interface element for the "Insight Review & Approval Workflow." It serves as the entry point for operators to triage and review generated insights. Each card represents a single insight from the Threat Analysis Engine and provides a summary of critical information to enable quick decision-making.

**Purpose in User Workflow:**
- Display in the Priority Queue, sorted by Hotspot Escalation Score
- Allow operators to quickly scan multiple insights
- Provide click-through access to the detailed Insight Detail Panel
- Support visual differentiation based on severity and status

### 3.2. Data Schema
The Insight Card will display the following data points from the `system_insights` table:

```typescript
interface InsightCardData {
  id: string;                    // insight_id
  insightType: string;           // e.g., "Flood Watch", "Landslide Watch"
  affectedArea: string;          // municipality + barangay
  severity: number;              // 1-5 scale
  confidence: number;            // percentage (0-100)
  timestamp: Date;               // created_at
  status: 'Draft' | 'Pending Review' | 'Approved' | 'Disseminated' | 'Rescinded';
  geometry: GeoJSON.Polygon;     // For map highlighting
}
```

### 3.3. Visual States

#### 3.3.1. Default State (Pending Review)
- **Background:** White with subtle border
- **Severity Indicator:** Left border colored by severity:
  - Green (low): #10B981
  - Yellow (medium): #F59E0B
  - Red (high): #EF4444
- **Typography:**
  - Insight Type: Bold, 16px
  - Affected Area: Regular, 14px
  - Severity/Confidence: Small, 12px
  - Timestamp: Small, muted gray
- **Layout:** Compact card with 16px padding, max-width 320px

#### 3.3.2. Approved State
- **Background:** Light green tint (#F0FDF4)
- **Border:** Green accent border
- **Icon:** Green checkmark in top-right corner
- **Typography:** Same as default, with "Approved" badge

#### 3.3.3. Disseminated State
- **Background:** Light blue tint (#EFF6FF)
- **Border:** Blue accent border
- **Icon:** Blue send icon in top-right corner
- **Typography:** Same as default, with "Disseminated" badge

#### 3.3.4. Rescinded State
- **Background:** Light gray tint (#F9FAFB)
- **Border:** Gray accent border
- **Icon:** Gray X icon in top-right corner
- **Typography:** Same as default, with "Rescinded" badge (muted)

### 3.4. Interactive Behavior

#### 3.4.1. Hover State
- **Background:** Subtle elevation (box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1))
- **Cursor:** Pointer
- **Border:** Slightly darker accent color

#### 3.4.2. Click Behavior
- **Target:** Entire card surface
- **Action:** Navigate to Insight Detail Panel
- **Feedback:** Visual press effect (scale: 0.98) during click

#### 3.4.3. Focus State (Keyboard Navigation)
- **Outline:** 2px blue outline (#3B82F6)
- **Background:** Same as hover state

### 3.5. Accessibility Requirements

#### 3.5.1. ARIA Attributes
- `role="button"`: For screen reader identification
- `aria-label`: "Review insight: {insightType} for {affectedArea}"
- `aria-describedby`: Reference to hidden description with full details

#### 3.5.2. Keyboard Navigation
- **Tab Order:** Card receives focus in priority queue order
- **Enter/Space:** Activates click behavior
- **Arrow Keys:** Navigate between cards in queue

#### 3.5.3. Color Contrast
- Text meets WCAG AA standards (4.5:1 minimum)
- Color-coded elements have text labels as backup

#### 3.5.4. Screen Reader Support
- Card content announced as: "{Severity} {insightType} alert for {affectedArea}, confidence {confidence}%, created {timestamp}"
- Status changes announced dynamically

---

## 4. Mockup Development Plan

### 4.1. Development Approach
Mockups will be created using Figma to ensure high fidelity and easy handoff to developers. Each mockup will include:
- Desktop and mobile responsive views
- Interactive states (hover, focus, active)
- Realistic sample data based on the technical specification
- Annotations for spacing, typography, and interaction details

### 4.2. Screen Sequence

#### 4.2.1. Screen 1: Login Page
**Purpose:** First impression and authentication
**Key Elements:**
- LINGKOD branding and tagline
- Username/password form with validation
- "Remember me" checkbox
- Error states for invalid credentials
- Link to password reset (future feature)

#### 4.2.2. Screen 2: Operator Dashboard (Default State)
**Purpose:** Establish the main workspace layout
**Key Elements:**
- Sidebar navigation with user profile
- Empty interactive map (satellite view)
- Priority Queue with "No active insights" message
- Data panels showing "No data" or placeholder values
- LGU selector in top bar

#### 4.2.3. Screen 3: Operator Dashboard (Active Scenario - CamSur Flash Flood)
**Purpose:** Demonstrate the system in action during a crisis
**Key Elements:**
- Map centered on CamSur with:
  - Simulated rainfall overlay
  - Rising river level indicators
  - Active insight polygons (red for high severity)
  - Sensor locations with status indicators
- Priority Queue populated with 3-5 Insight Cards
- Real-time data panels showing live sensor readings
- Notification indicator for new insights

#### 4.2.4. Screen 4: Insight Detail View
**Purpose:** Showcase the evidence-based decision-making workflow
**Key Elements:**
- Insight header with ID, status, and timestamp
- Clear summary description
- Evidence Panel with:
  - Contributing signals (PAGASA warnings, sensor data)
  - Rule traces and confidence breakdown
- Recommendation preview (SMS, radio, official messages)
- Action buttons: Approve, Rescind, Edit Geometry, Add Notes

#### 4.2.5. Screen 5: Settings (Complementary Mode Configuration)
**Purpose:** Demonstrate dual-mode functionality
**Key Elements:**
- API endpoint configuration form
- Authentication token management
- Status indicators for API connectivity
- Test connection functionality
- Integration logs and error handling

### 4.3. Demo Scenario Integration
Mockups will incorporate the specific demo scenarios from the UX specification:
- **CamSur Flash Flood Scenario:** Heavy rainfall, rising river levels, barangay-specific alerts
- **Metro Manila Urban Hazard Scenario:** Urban flooding, CCTV alerts, multi-hazard display

---

## 5. Review and Handoff Process

### 5.1. Internal Review Process
1. **UX Expert Review:** Self-review against UX specification requirements
2. **Cross-functional Review:** Share with product manager and backend lead for alignment
3. **Developer Review:** Present to frontend team for technical feasibility assessment

### 5.2. Stakeholder Review Process
1. **Client Preview:** Share key mockups with potential clients (LGUs) for feedback
2. **Iterative Refinement:** Incorporate feedback and update mockups as needed
3. **Final Approval:** Obtain sign-off from project stakeholders

### 5.3. Developer Handoff Criteria
Mockups and specifications are "Ready for Development" when they include:
- ✅ Complete visual designs for all states and breakpoints
- ✅ Detailed interaction specifications
- ✅ Accessibility compliance documentation
- ✅ Sample data structures and API contracts
- ✅ Component naming conventions aligned with the design system
- ✅ Clear annotations for spacing, colors, and typography

### 5.4. Implementation Milestones
- **Week 1:** Complete atomic components and Insight Card specification
- **Week 2:** Finish all mockup screens and component specifications
- **Week 3:** Conduct internal reviews and incorporate feedback
- **Week 4:** Final stakeholder review and developer handoff

---

## 6. Success Metrics

### 6.1. Quality Metrics
- **Design Consistency:** 100% adherence to the approved design system
- **Accessibility Compliance:** WCAG AA standards met across all components
- **Technical Feasibility:** Zero blocking issues identified by development team

### 6.2. Process Metrics
- **Review Cycle Time:** Complete internal review within 3 business days
- **Feedback Incorporation:** Address 100% of valid stakeholder feedback
- **Handoff Efficiency:** Development team can begin implementation immediately

### 6.3. User Experience Metrics
- **Workflow Efficiency:** Operator can complete insight review in under 30 seconds
- **Error Prevention:** Clear visual hierarchy prevents misinterpretation of data
- **Accessibility:** Screen reader users can navigate all interactions independently

---

This implementation plan provides a clear, structured approach to creating the UX/UI assets needed for the Project LINGKOD MVP. By following this plan, we ensure that the final product delivers on the promise of clarity, credibility, and efficiency outlined in the UX specification.
