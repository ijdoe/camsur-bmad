# ADR-002: Database Selection

**Date:** 2025-08-30
**Status:** Accepted

## Context

Project LINGKOD requires a robust data storage solution that can handle relational data (users, alerts), geospatial data (alert polygons, sensor locations), and high-volume time-series data (sensor readings). The solution must be reliable, scalable, and cost-effective.

## Decision

We have decided to use **PostgreSQL** as our primary database, augmented with the **PostGIS** and **TimescaleDB** extensions.

## Rationale

- **PostgreSQL:** A powerful, open-source, and highly-extensible object-relational database system with a strong reputation for reliability and performance. It provides a solid foundation for our core relational data.
- **PostGIS Extension:** The industry standard for geospatial data in open-source databases. It provides the functions and data types needed for our location-based queries and analysis, which are central to the project.
- **TimescaleDB Extension:** A leading open-source time-series database packaged as a PostgreSQL extension. It is highly optimized for ingesting and querying large volumes of time-series data, which is exactly what we need for our IoT sensor readings. Using it as an extension simplifies our stack, as we don't need to manage a separate time-series database.
- **Unified Stack:** By using PostgreSQL with extensions, we can manage all our primary data within a single database system, simplifying administration, backups, and development.

## Consequences

- **Operational Complexity:** Managing a PostgreSQL instance with multiple powerful extensions requires specialized knowledge.
- **Version Compatibility:** We must carefully manage the versions of PostgreSQL, PostGIS, and TimescaleDB to ensure they are compatible. This has already been identified as a known issue (PostgreSQL 14 vs. newer TimescaleDB versions).
- **Performance Tuning:** Each data type (relational, geospatial, time-series) will require different indexing and query optimization strategies.
