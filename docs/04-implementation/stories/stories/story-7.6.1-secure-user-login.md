# Story 7.6.1: Secure User Login

## Epic
[Epic 7.6: Security & Multi-Tenancy](docs/epics/epic-7.6-security-multi-tenancy.md)

## Description
As a user, I want to securely log in to the system using my credentials so that I can access the Admin/Operator Dashboard and perform my assigned tasks.

## Functional Requirements
- **FR 5.7.1:** The system shall provide JWT-based user authentication (login/logout).

## Non-Functional Requirements
- **NFR 6.3.1:** Data shall be encrypted in transit (HTTPS/TLS) and at rest.
- **NFR 6.3.3:** The system shall protect against common web vulnerabilities (OWASP Top 10).

## Acceptance Criteria
- **GIVEN** a user has valid login credentials (username/email and password)
- **WHEN** the user enters their credentials on the login page and submits
- **THEN** the system shall authenticate the user using JWT.
- **AND** upon successful authentication, the user shall be redirected to the Admin/Operator Dashboard.
- **AND** an invalid login attempt shall result in an appropriate error message without revealing specific credential details.
- **AND** all login communication shall be encrypted via HTTPS/TLS.

## Technical Notes
- Implement the login endpoint (`POST /auth/login`) in the User & Authentication Service.
- Use password hashing (e.g., bcrypt) for storing user passwords securely.
- Generate and return a JWT upon successful login.
- Implement JWT validation middleware for protected routes.
- The frontend should provide a secure login form and handle token storage (e.g., HTTP-only cookies or local storage).
