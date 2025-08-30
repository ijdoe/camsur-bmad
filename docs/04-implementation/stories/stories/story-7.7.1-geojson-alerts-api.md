# Story 7.7.1: GeoJSON Alerts API for External Command Centers

## Epic
[Epic 7.7: External Integration](docs/epics/epic-7.7-external-integration.md)

## Description
As a city command center operator, I want to retrieve active, approved alerts in GeoJSON format via a secure REST API so I can integrate them into my existing GIS software (e.g., ArcGIS) for enhanced situational awareness.

## Functional Requirements
- **FR 5.6.1:** The system shall expose a secure REST API endpoint (`/api/v1/alerts`) for external command centers to retrieve active, approved alerts in GeoJSON format.
- **FR 5.6.3:** The API endpoints shall implement JWT-based authentication and rate limiting.

## Non-Functional Requirements
- **NFR 6.3.2:** API endpoints shall be protected with rate limiting and input validation.
- **NFR 6.1.4:** API Response Time: P95 latency shall be less than 200ms for core API endpoints.

## Acceptance Criteria
- **GIVEN** an external system has a valid JWT for authentication
- **WHEN** a GET request is made to `/api/v1/alerts`
- **THEN** the API shall return a GeoJSON FeatureCollection containing all active, approved `system_alerts` relevant to the authenticated LGU.
- **AND** the API response time shall meet the specified performance requirements.
- **AND** requests without valid authentication or exceeding rate limits shall be rejected with appropriate error codes.

## Technical Notes
- Implement the `GET /api/v1/alerts` endpoint in the Alert Management Service (or a dedicated API Gateway service).
- Ensure the endpoint retrieves only `system_alerts` with `status = 'Approved'` and filters by the authenticated user's LGU.
- Convert `system_alerts.geometry` (PostGIS GEOMETRY) to standard GeoJSON format.
- Implement JWT authentication and rate limiting middleware for this endpoint.
- Optimize database queries to ensure performance requirements are met.
