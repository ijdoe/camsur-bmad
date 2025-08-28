# System Patterns: Project LINGKOD

## 1. System Architecture: A Multi-Layered Intelligence Model

The core architecture of Project LINGKOD is a **data-fusion and dissemination platform**. It is designed to ingest data from multiple, disparate sources, process it into actionable intelligence, and distribute it through targeted channels.

The system is composed of three primary layers:

*   **Layer 1: Data Ingestion (The Sensors)**
    *   **Satellite Intelligence:** An API-based integration with a commercial satellite provider (e.g., Planet Labs) to pull daily, province-wide imagery for macro-level analysis.
    *   **On-the-Ground AI:** Integration with Coram.ai's platform to receive real-time alerts from AI-powered CCTV cameras at critical infrastructure points.
    *   **IoT Network:** A network of DMA-BD sensors that push real-time, hyper-local environmental data (rain, water levels) to a central data lake.

*   **Layer 2: Data Fusion & Analysis (The Brain)**
    *   **Central Dashboard:** Coram.ai's Emergency Management System (EMS) will serve as the primary user interface for the PDRRMO.
    *   **Threat Analysis Engine:** This is the core of the system, where data from all sources is correlated. For example, a satellite flag for ground saturation, combined with a real-time IoT rainfall spike and a CCTV alert of a rising river, would automatically generate a high-priority flood warning.

*   **Layer 3: Communication & Dissemination (The Voice)**
    *   **Emergency Command Platform:** This is the "last-mile" communication hub. It receives finalized alerts from the EMS.
    *   **Multi-Channel Gateway:** The platform is integrated with SMS gateways and has a system for generating pre-formatted scripts for radio broadcast. It maintains a database of contacts for targeted alerting (e.g., barangay captains in specific municipalities).

## 2. Key Technical Decisions

*   **Cloud-Native:** The entire platform will be hosted on a cloud infrastructure (e.g., AWS, Azure) to ensure scalability, reliability, and security.
*   **API-Driven:** All components will communicate via well-defined APIs, allowing for modularity and the future integration of new data sources.
*   **Data-Agnostic Design:** The threat analysis engine will be designed to be flexible, allowing for the addition of new data providers without a complete system overhaul.

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
    end

    subgraph "Layer 3: Communication & Dissemination"
        E --> F[Emergency Command Platform];
        F --> G[SMS Gateway];
        F --> H[Radio Broadcast Scripts];
        F --> I[Barangay Official Alerts];
    end

    style A fill:#f9f,stroke:#333,stroke-width:2px
    style B fill:#f9f,stroke:#333,stroke-width:2px
    style C fill:#f9f,stroke:#333,stroke-width:2px
    style G fill:#ccf,stroke:#333,stroke-width:2px
    style H fill:#ccf,stroke:#333,stroke-width:2px
    style I fill:#ccf,stroke:#333,stroke-width:2px
