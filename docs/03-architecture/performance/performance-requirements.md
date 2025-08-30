# Performance Requirements

## 1. Overview

This document outlines the performance requirements and Service Level Objectives (SLOs) for Project LINGKOD.

## 2. Key Performance Indicators (KPIs)

| KPI | Target | Description |
|---|---|---|
| **API Response Time (P95)** | < 200ms | 95% of API requests should complete in under 200ms. |
| **Data Ingestion Rate** | 1000 events/sec | The system must be able to ingest up to 1000 sensor or CCTV events per second. |
| **Alert Generation Latency** | < 5 seconds | The time from critical data ingestion to `system_alert` creation. |
| **Dashboard Load Time** | < 3 seconds | The time for the main dashboard to be fully loaded and interactive. |
| **Real-time Update Latency** | < 1 second | The time for a new alert to appear on the dashboard via WebSocket. |
| **System Availability** | 99.9% | The system should be available 99.9% of the time. |

## 3. Load Profile (MVP)

The performance tests for the MVP will simulate the following load:

- **Concurrent Users:** 50 operators
- **Data Ingestion:** 500 events/sec
- **API Requests:** 200 requests/sec

## 4. Performance Testing Strategy

- **Tools:** k6, JMeter
- **Environment:** A dedicated, production-like staging environment.
- **Schedule:** Performance tests will be run on a weekly basis and before major releases.
- **Monitoring:** Prometheus and Grafana will be used to monitor system performance during tests.

## 5. Scalability Requirements

- The architecture must be able to scale horizontally to support a 10x increase in load from the MVP profile.
- The database must be able to handle billions of time-series data points.
