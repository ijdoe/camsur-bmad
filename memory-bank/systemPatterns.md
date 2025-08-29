# System Patterns: Project LINGKOD

## 1. System Architecture: A Dual-Mode Intelligence Engine

The core architecture of Project LINGKOD is a **dual-mode intelligence engine**. It is designed to function both as a complete, standalone situational awareness platform and as a complementary "intelligence engine" that feeds critical, predictive alerts into existing command center systems.

The system is composed of three primary layers:

*   **Layer 1: Data Ingestion (The Sensors)**
    *   **Satellite Intelligence:** An API-based integration with a commercial satellite provider (e.g., Planet Labs) to pull daily, province-wide imagery for macro-level analysis.
    *   **On-the-Ground AI:** Integration with Coram.ai's platform to receive real-time alerts from AI-powered CCTV cameras at critical infrastructure points.
    *   **IoT Network:** A network of DMA-BD sensors that push real-time, hyper-local environmental data (rain, water levels) to a central data lake.

*   **Layer 2: Data Fusion & Analysis (The Brain)**
    *   **Threat Analysis Engine:** This is the core of the system, where data from all sources is correlated to generate predictive alerts (e.g., identifying a specific barangay at high risk of flooding within the next hour).
    *   **Dual-Mode Output:** The engine's output is twofold:
        1.  **Standalone Interface:** A rich visualization of all data streams and alerts is provided through the **Coram.ai Emergency Management System (EMS)**, allowing for direct analysis and command.
        2.  **Complementary Feed:** High-priority, actionable alerts are sent via a secure **API** to be ingested by existing city-level or third-party command center software, such as **ArcGIS**, for advanced geospatial visualization and response coordination.

*   **Layer 3: Communication & Dissemination (The Voice - Standalone Mode)**
    *   **Emergency Command Platform:** For standalone operation, this "last-mile" communication hub receives finalized alerts from the EMS.
    *   **Multi-Channel Gateway:** The platform is integrated with SMS gateways and has a system for generating pre-formatted scripts for radio broadcast, targeting specific communities at risk.

## 2. Key Technical Decisions

*   **Dual-Mode Architecture:** The system is explicitly designed to operate both as a self-contained platform and as an integrated intelligence provider for existing systems, ensuring maximum adaptability.
*   **Cloud-Native:** The entire platform will be hosted on a cloud infrastructure (e.g., AWS, Azure) to ensure scalability, reliability, and security.
*   **API-Driven:** All components communicate via well-defined APIs. A dedicated, secure API endpoint will be provided for third-party systems to receive alerts.
*   **Data-Agnostic Design:** The threat analysis engine will be designed to be flexible, allowing for the addition of new data providers without a complete system overhaul.
*   **Ecological Connectivity:** To mitigate the impact of flood control infrastructure on the natural river ecosystem, the design will incorporate **"Fish Passes and Regulators"** where appropriate.

## 3. Component Relationships

```mermaid
graph TD
    subgraph "Layer 1: Data Ingestion"
        A[Satellite Provider API] --> D;
        B[Coram.ai CCTV Alerts] --> D;
        C[DMA-BD IoT Sensors] --> D;
    end

    subgraph "Layer 2: Data Fusion & Analysis"
        D[Threat Analysis Engine] --> E[Coram.ai EMS Dashboard];
        D --> J[API to Existing Command Centers];
    end

    subgraph "Layer 3: Communication & Dissemination (Standalone)"
        E --> F[Emergency Command Platform];
        F --> G[SMS Gateway];
        F --> H[Radio Broadcast Scripts];
        F --> I[Barangay Official Alerts];
    end

    style A fill:#f9f,stroke:#333,stroke-width:2px
    style B fill:#f9f,stroke:#333,stroke-width:2px
    style C fill:#f9f,stroke:#333,stroke-width:2px
    style J fill:#9cf,stroke:#333,stroke-width:2px
    style G fill:#ccf,stroke:#333,stroke-width:2px
    style H fill:#ccf,stroke:#333,stroke-width:2px
    style I fill:#ccf,stroke:#333,stroke-width:2px
