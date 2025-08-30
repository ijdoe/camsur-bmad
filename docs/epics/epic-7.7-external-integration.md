# Epic 7.7: External Integration

## Description
Expose secure APIs for complementary integration with third-party command centers. This epic focuses on developing the public-facing API endpoints that allow external systems (like ArcGIS) to consume LINGKOD's generated alerts in standard formats.

## Functional Requirements (from PRD)
- **FR 5.6.1:** The system shall expose a secure REST API endpoint (`/api/v1/alerts`) for external command centers to retrieve active, approved alerts in GeoJSON format.
- **FR 5.6.2:** The system shall expose a secure REST API endpoint (`/api/v1/cap/{alertId}`) for retrieving Common Alerting Protocol (CAP 1.2) XML for specific alerts.
- **FR 5.6.3:** The API endpoints shall implement JWT-based authentication and rate limiting.

## Non-Functional Requirements (from PRD)
- **NFR 6.3.2:** API endpoints shall be protected with rate limiting and input validation.
- **NFR 6.1.4:** API Response Time: P95 latency shall be less than 200ms for core API endpoints.

## Technical Specifications (from Technical Specification)
- **API:** REST APIs (for standard integrations).
- **API Gateway:** REST API Gateway.
- **Integration Specifications Section:** External Command Center API (Complementary Mode)
    - **Endpoint:** `GET /api/v1/alerts`, `GET /api/v1/cap/{alertId}`
    - **Authentication:** Bearer Token (JWT).
    - **Output Format:** GeoJSON FeatureCollection, CAP 1.2 XML.
    - **Rate Limiting:** Configurable per client.

## User Stories (To be defined)
- As a city command center operator, I want to retrieve active, approved alerts in GeoJSON format via a secure API so I can integrate them into my existing GIS software.
- As a city command center operator, I want to retrieve specific alerts in CAP 1.2 XML format so I can use them in my emergency management systems.
- As a developer, I want to ensure the external API endpoints are secured with JWT authentication and rate limiting.
- As a developer, I want to ensure the external API endpoints have low latency and high reliability.
