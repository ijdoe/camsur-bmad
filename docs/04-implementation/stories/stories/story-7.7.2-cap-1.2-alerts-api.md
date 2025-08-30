# Story 7.7.2: CAP 1.2 Alerts API for External Command Centers

## Epic
[Epic 7.7: External Integration](docs/epics/epic-7.7-external-integration.md)

## Description
As a city command center operator, I want to retrieve specific alerts in Common Alerting Protocol (CAP 1.2) XML format via a secure REST API so I can use them in my emergency management systems that adhere to international standards.

## Functional Requirements
- **FR 5.6.2:** The system shall expose a secure REST API endpoint (`/api/v1/cap/{alertId}`) for retrieving Common Alerting Protocol (CAP 1.2) XML for specific alerts.
- **FR 5.6.3:** The API endpoints shall implement JWT-based authentication and rate limiting.

## Non-Functional Requirements
- **NFR 6.3.2:** API endpoints shall be protected with rate limiting and input validation.
- **NFR 6.1.4:** API Response Time: P95 latency shall be less than 200ms for core API endpoints.

## Acceptance Criteria
- **GIVEN** an external system has a valid JWT for authentication
- **WHEN** a GET request is made to `/api/v1/cap/{alertId}` with a valid alert ID
- **THEN** the API shall return the corresponding `system_alert` in CAP 1.2 XML format.
- **AND** the API response time shall meet the specified performance requirements.
- **AND** requests without valid authentication, for non-existent alert IDs, or exceeding rate limits shall be rejected with appropriate error codes.

## Technical Notes
- Implement the `GET /api/v1/cap/{alertId}` endpoint in the Alert Management Service (or a dedicated API Gateway service).
- Develop a utility to convert `system_alerts` data into CAP 1.2 XML format.
- Ensure the endpoint retrieves only `system_alerts` with `status = 'Approved'` and filters by the authenticated user's LGU.
- Implement JWT authentication and rate limiting middleware for this endpoint.
- Reference CAP 1.2 specification for accurate XML generation.
