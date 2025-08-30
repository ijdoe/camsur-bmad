# Mockup Description: Main Dashboard Screen

## 1. Overview

This document describes the visual mockup for the main Admin/Operator Dashboard of Project LINGKOD. It is based on the UX Specification, Section 4.

## 2. Layout

- **Main Structure:** A three-column layout.
    - **Left Sidebar (280px):** For navigation.
    - **Main Content Area (Flexible Width):** For the interactive map.
    - **Right Sidebar (320px):** For real-time data panels and alert details.
- **Header:** A thin header bar across the top.

## 3. Components

### 3.1. Header

- **Logo:** Project LINGKOD logo on the far left.
- **LGU Selector:** A dropdown to switch between different LGUs (for demo purposes).
- **Notifications:** A bell icon with a badge for new alerts.
- **User Profile:** An avatar and username with a dropdown for "Settings" and "Logout".

### 3.2. Left Sidebar (Navigation)

- A list of navigation links with icons:
    - Dashboard (Home)
    - Alerts
    - Sensors
    - CCTV
    - Users (Admin only)
    - LGUs (Admin only)
    - Settings

### 3.3. Main Content Area (Interactive Map)

- **Map:** A full-height Mapbox GL JS map.
- **Map Layers:**
    - Base layers (satellite, street).
    - LGU boundaries.
    - Sensor locations (pins color-coded by status).
    - Active alert polygons (GeoJSON, color-coded by severity).
- **Map Controls:** Zoom, pan, layer toggle controls.
- **Interactivity:** Clicking on a sensor pin or alert polygon will open the details in the right sidebar.

### 3.4. Right Sidebar

- **Alert Summary Panel:**
    - A card at the top with stats:
        - "Pending Review": Count of new alerts.
        - "Active Alerts": Count of approved alerts.
        - "Disseminated": Count of alerts sent out.
- **Real-time Feeds:**
    - A tabbed component with:
        - **"Alerts" Tab:** A live-updating list of incoming system alerts. Each item shows severity, location, and time.
        - **"Sensor Data" Tab:** A feed of the latest critical sensor readings.
- **Alert Detail Panel (Conditional):**
    - This panel appears when an alert is selected from the map or the feed.
    - It replaces the summary and feeds panels.
    - **Header:** Alert ID, status, timestamp.
    - **Details:** Description, severity, affected area.
    - **Evidence:** A list of contributing sensor readings and CCTV events.
    - **Communication:** Previews of the generated SMS, radio, and barangay messages.
    - **Actions:** Primary "Approve" button, Danger "Rescind" button, secondary "Edit Geometry" and "Add Notes" buttons.

## 4. Visual Style & States

- Adheres to the Design System Specification.
- Active navigation links in the sidebar are highlighted.
- Map pins and polygons use the standard status colors (Success, Warning, Danger).
- The right sidebar panels are implemented using the Card component.
