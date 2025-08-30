# ADR-003: Frontend Framework Selection

**Date:** 2025-08-30
**Status:** Accepted

## Context

We need a frontend framework that can build a complex, data-intensive, and highly interactive dashboard. The framework must support TypeScript, have a strong ecosystem, and provide a great developer experience.

## Decision

We have decided to use **Next.js** with **React** and **TypeScript**.

## Rationale

- **React:** A mature and widely-adopted UI library with a vast ecosystem of tools and components. Its component-based architecture is a perfect fit for our design system approach.
- **Next.js:** A powerful React framework that provides a robust set of features out-of-the-box, including:
    - **Server-Side Rendering (SSR):** Important for the initial load performance of our dashboard and for the SEO of the public-facing portal.
    - **TypeScript Support:** First-class TypeScript support is built-in.
    - **File-based Routing:** Simplifies the creation and management of different pages.
    - **Strong Community & Vercel Backing:** Ensures the framework is well-maintained and continuously improving.
- **TypeScript:** As mentioned in ADR-001, using TypeScript improves code quality and developer productivity.

## Consequences

- **Learning Curve:** While React is popular, Next.js has its own conventions that the team will need to be familiar with.
- **Compatibility Issues:** We have already encountered and resolved compatibility issues between Next.js, React, and some of our key dependencies (`react-map-gl`). We will need to be mindful of this when upgrading packages in the future.
- **Performance:** While Next.js offers great performance features, we will still need to be careful about how we manage state and data fetching to ensure the dashboard remains responsive.
