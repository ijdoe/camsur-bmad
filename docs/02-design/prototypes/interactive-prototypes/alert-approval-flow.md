# Interactive Prototype Specification: Alert Approval Flow

## 1. Overview

This document specifies the user interactions and screen transitions for the "Alert Review and Approval" prototype. It follows the user journey from seeing a new alert to approving it for dissemination.

## 2. User Flow

1.  **Start:** User is on the Main Dashboard.
2.  A new high-severity alert appears on the map and in the real-time alert feed.
3.  User clicks on the alert polygon on the map.
4.  The Alert Detail Panel appears in the right sidebar.
5.  User reviews the alert details, evidence, and communication previews.
6.  User clicks the "Approve" button.
7.  A confirmation modal appears.
8.  User clicks "Confirm" in the modal.
9.  The alert status changes to "Approved" in the detail panel and on the map.
10. A success notification appears.

## 3. Screen States & Interactions

### Screen 1: Main Dashboard (Initial State)

- **Description:** The dashboard with a map and real-time feeds.
- **Interaction:** A new red polygon appears on the map, and a new item appears at the top of the "Alerts" feed in the right sidebar. A notification badge appears on the bell icon in the header.

### Screen 2: Main Dashboard (Alert Selected)

- **Trigger:** User clicks the new alert polygon on the map.
- **Change:**
    - The right sidebar transitions to show the Alert Detail Panel for the selected alert.
    - The panel is populated with the alert's data.
    - The "Approve" button is visible and active.

### Screen 3: Confirmation Modal

- **Trigger:** User clicks the "Approve" button in the Alert Detail Panel.
- **Change:**
    - A modal appears over the entire screen.
    - **Modal Title:** "Confirm Alert Approval"
    - **Modal Body:** "Are you sure you want to approve this alert for dissemination? This action will be logged."
    - **Modal Actions:** A primary "Confirm" button and a secondary "Cancel" button.

### Screen 4: Main Dashboard (Alert Approved)

- **Trigger:** User clicks the "Confirm" button in the modal.
- **Change:**
    - The modal disappears.
    - In the Alert Detail Panel, the status badge changes from "Pending Review" to "Approved".
    - The "Approve" button becomes disabled.
    - The color of the alert polygon on the map may change to indicate it has been approved.
    - A green success "Alert" component (toast notification) appears at the top right of the screen with the message "Alert [ID] has been successfully approved."
