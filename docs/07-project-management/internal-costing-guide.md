# Project LINGKOD: Internal Costing & Pricing Guide

**CONFIDENTIAL - FOR INTERNAL USE ONLY**

## 1. Introduction & Philosophy

This document provides the methodology and rate card for calculating the cost of the Project LINGKOD provincial rollout. The goal is to establish a clear, consistent, and profitable pricing structure that also provides flexibility for negotiation and partner markups.

Our pricing philosophy is based on three tiers:
1.  **Blended Cost Rate:** Our internal cost for a resource, covering salary and overhead. This is our break-even point.
2.  **Base Sell Rate (Our Price):** The price we present to our direct partner. This includes a healthy profit margin (target ~40%) to ensure our company's profitability. This is the figure we will use in the proposal.
3.  **Target Client Rate:** A suggested final price that our partner might charge the end client (the provincial government). This includes their markup (e.g., 20-25%) on top of our Base Sell Rate. This gives them a clear path to their own profitability.

## 2. Recommended Weekly Rate Card (in PHP)

These rates are suggestions and should be reviewed and adjusted by management based on actual resource costs and strategic goals.

| Role | Blended Cost Rate (Internal Cost) | Base Sell Rate (Our Price, ~40% Margin) | Target Client Rate (Partner Price, ~25% Markup) |
| :--- | :--- | :--- | :--- |
| Project Manager | 60,000 | **84,000** | 105,000 |
| Lead Engineer (BE/FE) | 70,000 | **98,000** | 122,500 |
| Engineer (BE/FE) | 50,000 | **70,000** | 87,500 |
| QA Engineer | 45,000 | **63,000** | 78,750 |
| Implementation & Training Specialist | 40,000 | **56,000** | 70,000 |

---

## 3. Calculating the Project Investment

The total cost is calculated by multiplying the estimated effort (in person-weeks, from the implementation plan) by a blended average of the **Base Sell Rate**.

### 3.1. Blended Average Rate Calculation

The core team consists of 8 members (1 PM, 2 Leads, 4 Engineers, 1 QA).
- (1 x 84,000) + (2 x 98,000) + (4 x 70,000) + (1 x 63,000) = 623,000
- 623,000 / 8 members = **~78,000 PHP per week (Blended Average Sell Rate)**

This blended rate simplifies calculation and provides a buffer for variations in resource allocation during the project.

### 3.2. Phase 1: Pilot Program Cost

The total cost for the pilot program is composed of the labor cost plus a project overhead for development-phase expenses.

- **Internal Labor Cost Calculation:**
    - Blended Internal Cost Rate: **PHP 55,625 / week** (Calculated from the sum of all team members' weekly costs divided by 8)
    - Total Internal Labor Cost: 48 Person-Weeks * 55,625 = **PHP 2,670,000**

- **Project Overhead Calculation (11% of Labor Cost):**
    - Pre-Production Infrastructure (7%): PHP 186,900
    - AI Development Tooling (4%): PHP 106,800
    - Total Overhead Cost: **PHP 293,700**

- **Total Internal Cost Base (Labor + Overhead):**
    - PHP 2,670,000 + PHP 293,700 = **PHP 2,963,700**

- **Recommended Base Price (with ~40% Margin):**
    - Calculation: PHP 2,963,700 * 1.4 = PHP 4,149,180
    - **Recommended Rounded Price:** **PHP 4,150,000**

This is the core, all-inclusive price for your company to deliver Phase 1.

### 3.3. Phase 2: LGU Onboarding Fee

This fee is calculated based on the typical effort required to onboard one LGU or a small cluster.

- **Estimated Effort per LGU/Cluster:**
    - 1 Week Project Management
    - 2 Weeks Implementation & Training
    - 2 Weeks Backend Configuration
    - 1 Week Frontend Configuration
    - **Total: 6 Person-Weeks**
- **Calculation:**
    - (1 * 84,000) + (2 * 56,000) + (2 * 70,000) + (1 * 70,000) = 406,000
- **Recommended LGU Onboarding Fee:** **PHP 406,000 per LGU/Cluster**

### 3.4. Negotiation & Flexibility

- The **Base Sell Rate** is your target price.
- The **Blended Cost Rate** represents your floor during negotiations. Do not go below this without careful consideration of strategic value.
- The difference between the Base Sell Rate and the Blended Cost Rate is your negotiation margin.

This guide should provide your sales team with a solid, data-driven foundation for their pricing strategy.

---

## 4. Annual Service Tiers & Pricing Model (Non-Labor)

**CONFIDENTIAL - FOR INTERNAL USE ONLY**

This section provides the model for creating fixed-price annual service tiers, which are more suitable for government budgeting.

### 4.1. Calculating the Annual Cost Base

This calculation excludes partner-provided costs like Coram.ai's CCTV analytics.

| Service | Estimated Monthly Cost (PHP) | Annual Cost (PHP) | Notes |
| :--- | :--- | :--- | :--- |
| **Cloud Infrastructure** | 60,000 | 720,000 | A safe average for a pilot-scale deployment. |
| **SMS Gateway Allowance** | 10,000 | 120,000 | Covers a generous number of monthly alerts. |
| **Mapping Services** | 5,000 | 60,000 | Covers usage beyond the free tier. |
| **Total Annual Cost Base** | **75,000** | **900,000** | This is our estimated break-even point for our operational costs. |

### 4.2. Structuring the Annual Tiers

We will bundle these costs and add a management/profit margin (~20%).

**Example Tiers for Proposal (Phase 1 Pilot)**

| Feature | **Standard Tier** | **Professional Tier** |
| :--- | :--- | :--- |
| **Included Municipalities** | Up to 4 | Up to 4 |
| **Monthly SMS Alerts** | 10,000 messages | 25,000 messages |
| **Technical Support** | Standard Business Hours | 24/7 Critical Support |
| **Annual Cost Base** | ~900,000 | ~1,100,000 (higher SMS allowance) |
| **Recommended Annual Price** | **PHP 1,080,000** | **PHP 1,320,000** |

### 4.3. Rationale for the Proposal

*   **Standard Tier (PHP 1,080,000/year):** This is our recommended starting point. It covers our base costs and includes a 20% margin (900,000 * 1.2).
*   **Professional Tier (PHP 1,320,000/year):** This offers an upgrade path with more capacity and 24/7 support.
*   **Overage:** The final contract should specify pre-approved rates for usage beyond the tier limits (e.g., cost per 1,000 SMS).

---

## 5. Implementation Travel & Expenses Budget

This section provides a model for calculating a fixed budget for travel and accommodation, to be presented as a separate one-time cost in the proposal.

### 5.1. Assumptions (Pilot Phase)
*   **Team Size:** 4 members traveling per trip.
*   **Number of Trips:** 3 trips during the 5-month pilot phase.
*   **Duration per Trip:** 5 days (including travel days).

### 5.2. Estimated Cost Breakdown (Per Person, Per Trip)

| Item | Cost (PHP) | Notes |
| :--- | :--- | :--- |
| Round-trip Flights (MNL-WNP) | 8,000 | |
| Accommodation | 15,000 | 5 nights at ~3,000/night |
| Per Diem (Meals & Local Transport) | 10,000 | 5 days at 2,000/day |
| **Total Per Person Per Trip** | **33,000** | |

### 5.3. Total Recommended Travel Budget

*   **Calculation:** 4 team members * 3 trips * 33,000 PHP/trip
*   **Recommended Budget:** **PHP 396,000**
*   **Recommendation for Proposal:** Present a rounded, fixed budget of **PHP 400,000** for the pilot phase to cover all travel, accommodation, and expenses.
