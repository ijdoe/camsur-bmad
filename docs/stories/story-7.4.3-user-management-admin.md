# Story 7.4.3: User Management (Admin)

## Epic
[Epic 7.4: Admin/Operator Dashboard](docs/epics/epic-7.4-admin-operator-dashboard.md)
[Epic 7.6: Security & Multi-Tenancy](docs/epics/epic-7.6-security-multi-tenancy.md)

## Description
As an administrator, I want to manage user accounts and roles (create, read, update, delete) so I can control access to the system and ensure proper authorization for different functionalities.

## Functional Requirements
- **FR 5.5.4:** The dashboard shall support user management (CRUD for Admin role).
- **FR 5.7.2:** The system shall implement Role-Based Access Control (RBAC) for different user roles (Admin, Operator, Viewer).

## Acceptance Criteria
- **GIVEN** an administrator is logged into the Admin/Operator Dashboard
- **WHEN** the administrator navigates to the User Management section
- **THEN** a list of all system users shall be displayed, including their roles and associated LGU.
- **AND** the administrator shall be able to create new user accounts, assign roles (Admin, Operator, Viewer), and link them to specific LGUs.
- **AND** the administrator shall be able to update existing user details (e.g., role, LGU, active status).
- **AND** the administrator shall be able to delete user accounts.
- **AND** user actions shall be restricted based on their assigned role (e.g., only Admin can manage users).

## Technical Notes
- Implement frontend components for user listing, creation, editing, and deletion.
- Integrate with the User & Authentication Service (`POST /auth/register`, `GET /users/:id`, `PUT /users/:id`) for backend operations.
- Ensure RBAC is enforced at both the API and UI levels.
- Implement robust input validation for user creation/update forms.
- Consider password reset functionality (out of scope for MVP, but good to note).
