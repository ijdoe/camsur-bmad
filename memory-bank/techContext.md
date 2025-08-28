# Tech Context: Project LINGKOD

## 1. Core Technologies & Platforms

*   **AI Video Analytics:** Coram.ai's platform for real-time monitoring of CCTV feeds.
*   **Emergency Management System (EMS):** Coram.ai's platform will serve as the central command dashboard.
*   **Internet of Things (IoT):** DMA-BD's network of environmental sensors (rain gauges, water level monitors, etc.).
*   **Geospatial Intelligence:** A commercial satellite imagery provider (e.g., Planet Labs, Maxar) for large-scale environmental analysis.
*   **Cloud Computing:** A major cloud provider (e.g., AWS, Azure, Google Cloud) for hosting the data fusion platform and ensuring scalability.

## 2. Development & Integration

*   **Internal Capabilities:** The Synthesiq Technologies team will be responsible for the integration of all partner platforms. This requires:
    *   **Agentic-Coding Skillset:** To develop the custom "Threat Analysis Engine" that fuses data from all sources.
    *   **API Integration:** Expertise in connecting to and managing data flows from the APIs of Coram.ai, the satellite provider, and the IoT network.
*   **Emergency Command Platform:** Further development of the existing MVP to build out its capabilities as the primary "last-mile" communication hub.

## 3. Communication Stack

*   **SMS Gateway:** Integration with a reliable, high-volume SMS provider (e.g., Twilio, Vonage) to ensure the delivery of text-based alerts.
*   **Radio Integration:** A system for generating and transmitting standardized, pre-formatted alert scripts to local radio stations.

## 4. Dependencies

*   **Partner APIs:** The project is highly dependent on the stability and performance of the APIs provided by Coram.ai and the satellite imagery partner.
*   **Network Connectivity:** Reliable internet connectivity is required at the PDRRMO and for the IoT sensors to transmit data. The use of Starlink as a backup, as mentioned in the original provincial documents, should be considered.
*   **CCTV Infrastructure:** The project relies on the existence and proper maintenance of CCTV cameras at critical locations.
